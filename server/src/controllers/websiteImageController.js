const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const { WebsiteImage, Media } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

// @desc    Get all website images (filtered, searched)
// @route   GET /api/website-images
// @access  Public
const getAllImages = async (req, res, next) => {
  try {
    const { category, page, search, status, preview } = req.query;
    const isPreview = preview === 'true' || preview === '1';

    const where = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (page && page !== 'All') {
      where.page_name = page;
    }

    if (status === 'draft') {
      where.draft_image_url = { [Op.ne]: null };
    } else if (status === 'published') {
      where.draft_image_url = null;
    }

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      where[Op.or] = [
        { image_key: { [Op.like]: q } },
        { image_name: { [Op.like]: q } },
        { section_name: { [Op.like]: q } },
        { page_name: { [Op.like]: q } },
        { category: { [Op.like]: q } }
      ];
    }

    const images = await WebsiteImage.findAll({
      where,
      order: [
        ['category', 'ASC'],
        ['page_name', 'ASC'],
        ['section_name', 'ASC'],
        ['id', 'ASC']
      ]
    });

    // Compute active URL (if preview is true, prefer draft_image_url; otherwise live image_url)
    const formatted = images.map((img) => {
      const data = img.toJSON();
      data.active_url = isPreview && data.draft_image_url ? data.draft_image_url : data.image_url;
      data.has_pending_draft = Boolean(data.draft_image_url && data.draft_image_url !== data.image_url);
      return data;
    });

    const pendingDraftCount = await WebsiteImage.count({
      where: {
        draft_image_url: { [Op.ne]: null }
      }
    });

    return sendSuccess(res, {
      total: formatted.length,
      pendingDraftCount,
      images: formatted
    }, 'Website images retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get single website image by key or ID
// @route   GET /api/website-images/:key
// @access  Public
const getImageByKey = async (req, res, next) => {
  try {
    const { key } = req.params;
    const isPreview = req.query.preview === 'true';

    let image = await WebsiteImage.findOne({ where: { image_key: key } });
    if (!image && !isNaN(key)) {
      image = await WebsiteImage.findByPk(parseInt(key, 10));
    }

    if (!image) {
      return sendError(res, `Website image with key '${key}' not found`, 404);
    }

    const data = image.toJSON();
    data.active_url = isPreview && data.draft_image_url ? data.draft_image_url : data.image_url;
    data.has_pending_draft = Boolean(data.draft_image_url && data.draft_image_url !== data.image_url);

    return sendSuccess(res, data, 'Website image retrieved');
  } catch (error) {
    next(error);
  }
};

// @desc    Upload an image for Website Image Manager
// @route   POST /api/website-images/upload
// @access  Private (Admin)
const uploadWebsiteImage = async (req, res, next) => {
  try {
    let filename;
    let mimeType = 'image/jpeg';
    let size = 0;
    let base64Data = null;
    let altText = req.body?.alt || '';

    if (req.file) {
      const file = req.file;
      filename = file.filename;
      mimeType = file.mimetype;
      size = file.size;
      altText = altText || path.parse(file.originalname).name;

      try {
        const fileBuffer = fs.readFileSync(file.path);
        base64Data = `data:${file.mimetype};base64,${fileBuffer.toString('base64')}`;
      } catch (err) {
        console.warn('Failed to read file buffer for DB storage:', err.message);
      }
    } else if (req.body?.data || req.body?.base64) {
      base64Data = req.body.data || req.body.base64;
      const matches = base64Data.match(/^data:([A-Za-z0-9\-+\/.]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        size = buffer.length;
        const ext = mimeType.split('/')[1] || 'jpg';
        filename = `webimg-${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;

        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, filename), buffer);
      } else {
        return sendError(res, 'Invalid image data format', 400);
      }
    } else {
      return sendError(res, 'No file or image data provided', 400);
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${filename}`;

    // Store in Media table with MySQL persistence fallback
    try {
      await Media.create({
        filename,
        url: fileUrl,
        mimeType,
        size,
        altText,
        data: base64Data,
        uploadedById: req.user?.id || null
      });
    } catch (dbErr) {
      console.warn('Failed to register in Media table:', dbErr.message);
    }

    return sendSuccess(res, {
      url: fileUrl,
      filename,
      size,
      mimeType
    }, 'Image uploaded successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an image draft / metadata
// @route   PATCH /api/website-images/:id
// @access  Private (Admin)
const updateImageDraft = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      draft_image_url,
      alt_text,
      image_name,
      dimensions,
      aspect_ratio,
      category,
      section_name,
      page_name
    } = req.body;

    const image = await WebsiteImage.findByPk(id);
    if (!image) {
      return sendError(res, 'Website image not found', 404);
    }

    const updates = {};
    if (draft_image_url !== undefined) {
      updates.draft_image_url = draft_image_url;
      // Mark as draft if draft URL differs from live image URL
      if (draft_image_url && draft_image_url !== image.image_url) {
        updates.publication_status = 'draft';
      } else if (!draft_image_url) {
        updates.publication_status = 'published';
      }
    }

    if (alt_text !== undefined) updates.alt_text = alt_text;
    if (image_name !== undefined) updates.image_name = image_name;
    if (dimensions !== undefined) updates.dimensions = dimensions;
    if (aspect_ratio !== undefined) updates.aspect_ratio = aspect_ratio;
    if (category !== undefined) updates.category = category;
    if (section_name !== undefined) updates.section_name = section_name;
    if (page_name !== undefined) updates.page_name = page_name;

    updates.updated_by = req.user?.name || req.user?.email || 'Admin';

    await image.update(updates);

    if (req.user) {
      await logAudit(
        req.user.id,
        'UPDATE_DRAFT',
        'WebsiteImage',
        image.id,
        { image_key: image.image_key, draft_image_url }
      );
    }

    const result = image.toJSON();
    result.has_pending_draft = Boolean(result.draft_image_url && result.draft_image_url !== result.image_url);

    return sendSuccess(res, result, 'Image draft updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Publish a single draft image
// @route   POST /api/website-images/:id/publish
// @access  Private (Admin)
const publishImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await WebsiteImage.findByPk(id);
    if (!image) {
      return sendError(res, 'Website image not found', 404);
    }

    if (!image.draft_image_url) {
      return sendSuccess(res, image, 'Image is already published');
    }

    // Append current live URL to version history
    const history = Array.isArray(image.version_history) ? [...image.version_history] : [];
    history.push({
      url: image.image_url,
      updated_at: new Date().toISOString(),
      updated_by: image.updated_by || 'Admin',
      status: 'archived'
    });

    const newUrl = image.draft_image_url;
    await image.update({
      image_url: newUrl,
      draft_image_url: null,
      publication_status: 'published',
      updated_by: req.user?.name || req.user?.email || 'Admin',
      version_history: history.slice(-20) // Keep latest 20 versions
    });

    if (req.user) {
      await logAudit(
        req.user.id,
        'PUBLISH_IMAGE',
        'WebsiteImage',
        image.id,
        { image_key: image.image_key, published_url: newUrl }
      );
    }

    const result = image.toJSON();
    result.has_pending_draft = false;

    return sendSuccess(res, result, 'Image published successfully to live website');
  } catch (error) {
    next(error);
  }
};

// @desc    Publish all pending draft images in bulk
// @route   POST /api/website-images/publish-all
// @access  Private (Admin)
const publishAllDrafts = async (req, res, next) => {
  try {
    const draftImages = await WebsiteImage.findAll({
      where: {
        draft_image_url: { [Op.ne]: null }
      }
    });

    if (draftImages.length === 0) {
      return sendSuccess(res, { publishedCount: 0 }, 'No pending drafts to publish');
    }

    const updatedBy = req.user?.name || req.user?.email || 'Admin';

    for (const image of draftImages) {
      const history = Array.isArray(image.version_history) ? [...image.version_history] : [];
      history.push({
        url: image.image_url,
        updated_at: new Date().toISOString(),
        updated_by: image.updated_by || 'Admin',
        status: 'archived'
      });

      await image.update({
        image_url: image.draft_image_url,
        draft_image_url: null,
        publication_status: 'published',
        updated_by: updatedBy,
        version_history: history.slice(-20)
      });
    }

    if (req.user) {
      await logAudit(
        req.user.id,
        'PUBLISH_ALL_IMAGES',
        'WebsiteImage',
        null,
        { publishedCount: draftImages.length }
      );
    }

    return sendSuccess(res, {
      publishedCount: draftImages.length
    }, `Successfully published ${draftImages.length} images to live website`);
  } catch (error) {
    next(error);
  }
};

// @desc    Discard pending draft
// @route   POST /api/website-images/:id/discard-draft
// @access  Private (Admin)
const discardDraft = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await WebsiteImage.findByPk(id);
    if (!image) {
      return sendError(res, 'Website image not found', 404);
    }

    await image.update({
      draft_image_url: null,
      publication_status: 'published'
    });

    const result = image.toJSON();
    result.has_pending_draft = false;

    return sendSuccess(res, result, 'Pending draft changes discarded');
  } catch (error) {
    next(error);
  }
};

// @desc    Restore original factory image
// @route   POST /api/website-images/:id/restore-original
// @access  Private (Admin)
const restoreOriginal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await WebsiteImage.findByPk(id);
    if (!image) {
      return sendError(res, 'Website image not found', 404);
    }

    const history = Array.isArray(image.version_history) ? [...image.version_history] : [];
    history.push({
      url: image.image_url,
      updated_at: new Date().toISOString(),
      updated_by: req.user?.name || req.user?.email || 'Admin',
      status: 'reverted_to_original'
    });

    await image.update({
      image_url: image.original_image_url,
      draft_image_url: null,
      publication_status: 'published',
      updated_by: req.user?.name || req.user?.email || 'Admin',
      version_history: history.slice(-20)
    });

    if (req.user) {
      await logAudit(
        req.user.id,
        'RESTORE_ORIGINAL_IMAGE',
        'WebsiteImage',
        image.id,
        { image_key: image.image_key, original_url: image.original_image_url }
      );
    }

    const result = image.toJSON();
    result.has_pending_draft = false;

    return sendSuccess(res, result, 'Original image restored successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new managed website image key
// @route   POST /api/website-images
// @access  Private (Admin)
const createImage = async (req, res, next) => {
  try {
    const {
      image_key,
      image_name,
      category,
      page_name,
      section_name,
      image_url,
      alt_text,
      dimensions,
      aspect_ratio
    } = req.body;

    if (!image_key || !image_name || !image_url) {
      return sendError(res, 'image_key, image_name, and image_url are required', 400);
    }

    const existing = await WebsiteImage.findOne({ where: { image_key } });
    if (existing) {
      return sendError(res, `Image with key '${image_key}' already exists`, 409);
    }

    const newImage = await WebsiteImage.create({
      image_key,
      image_name,
      category: category || 'Homepage',
      page_name: page_name || 'Home',
      section_name: section_name || 'General',
      image_url,
      original_image_url: image_url,
      alt_text,
      dimensions: dimensions || 'Responsive',
      aspect_ratio: aspect_ratio || '16:9',
      publication_status: 'published',
      updated_by: req.user?.name || req.user?.email || 'Admin'
    });

    return sendSuccess(res, newImage, 'Website image created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an image from active management
// @route   DELETE /api/website-images/:id
// @access  Private (Admin)
const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await WebsiteImage.findByPk(id);
    if (!image) {
      return sendError(res, 'Website image not found', 404);
    }

    await image.destroy();

    return sendSuccess(res, {}, 'Website image deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllImages,
  getImageByKey,
  uploadWebsiteImage,
  updateImageDraft,
  publishImage,
  publishAllDrafts,
  discardDraft,
  restoreOriginal,
  createImage,
  deleteImage
};
