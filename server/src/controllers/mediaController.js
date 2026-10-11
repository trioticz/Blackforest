const path = require('path');
const fs = require('fs');
const { Media } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

// @desc    Upload media file (stores in database + file system)
// @route   POST /api/media/upload
// @access  Private (Admin/Superadmin/Editor)
const uploadMedia = async (req, res, next) => {
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
      // Direct base64 upload support
      base64Data = req.body.data || req.body.base64;
      const matches = base64Data.match(/^data:([A-Za-z0-9\-+\/.]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        size = buffer.length;
        const ext = mimeType.split('/')[1] || 'jpg';
        filename = `upload-${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
        
        // Write to uploads folder if available
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, filename), buffer);
      } else {
        return sendError(res, 'Invalid base64 image data', 400);
      }
    } else {
      return sendError(res, 'No file or image data provided', 400);
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${filename}`;

    const media = await Media.create({
      filename,
      url: fileUrl,
      data: base64Data, // Persisted directly into database!
      alt: altText,
      size,
      mimeType,
      uploadedById: req.user?.id || null
    });

    await logAudit({
      userId: req.user?.id,
      action: 'UPLOAD_MEDIA',
      entity: 'Media',
      entityId: media.id,
      ip: req.ip
    });

    return sendSuccess(res, media, 'File uploaded and stored in database successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Serve media file from database or disk (Public)
// @route   GET /api/media/file/:filename
// @access  Public
const serveMediaByFilename = async (req, res, next) => {
  try {
    const { filename } = req.params;

    // 1. Try serving from physical disk first
    const diskPath = path.join(__dirname, '../../uploads', filename);
    if (fs.existsSync(diskPath)) {
      return res.sendFile(diskPath);
    }

    // 2. Fallback to database
    const media = await Media.findOne({ where: { filename } });
    if (media && media.data) {
      const matches = media.data.match(/^data:([A-Za-z0-9\-+\/.]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        res.set('Content-Type', mimeType);
        res.set('Cache-Control', 'public, max-age=31536000');
        return res.send(buffer);
      }
    }

    return res.status(404).send('Image not found');
  } catch (error) {
    next(error);
  }
};

// @desc    Get media files
// @route   GET /api/media
// @access  Private (Admin/Superadmin/Editor)
const getMediaList = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    const where = {};

    if (search) {
      const { Op } = require('sequelize');
      where.filename = { [Op.like]: `%${search}%` };
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { rows: media, count: total } = await Media.findAndCountAll({
      where,
      limit: parseInt(limit, 10),
      offset,
      order: [['createdAt', 'DESC']]
    });

    return sendSuccess(res, {
      media,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private (Admin/Superadmin)
const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id);
    if (!media) {
      return sendError(res, 'Media not found', 404);
    }

    const filePath = path.join(__dirname, '../../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn('Could not delete physical file:', e.message);
      }
    }

    await media.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_MEDIA',
      entity: 'Media',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Media deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMedia,
  getMediaList,
  deleteMedia,
  serveMediaByFilename
};
