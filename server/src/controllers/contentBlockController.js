const { ContentBlock } = require('../models');
const { Op } = require('sequelize');

const findBlock = async (idOrKey) => {
  if (!idOrKey) return null;
  if (/^\d+$/.test(String(idOrKey))) {
    const byId = await ContentBlock.findByPk(idOrKey);
    if (byId) return byId;
  }
  return await ContentBlock.findOne({ where: { block_key: idOrKey } });
};

// GET /api/content-blocks
exports.getAllBlocks = async (req, res) => {
  try {
    const { category, preview } = req.query;
    const isPreview = preview === 'true' || preview === '1';

    const where = {};
    if (category) where.category = category;

    const blocks = await ContentBlock.findAll({
      where,
      order: [['category', 'ASC'], ['block_name', 'ASC']]
    });

    const pendingDraftCount = await ContentBlock.count({
      where: {
        draft_content: { [Op.ne]: null }
      }
    });

    const transformed = blocks.map((b) => {
      const plain = b.get({ plain: true });
      const hasDraft = plain.draft_content !== null;
      const activeContent = isPreview && hasDraft ? plain.draft_content : plain.content;

      return {
        ...plain,
        active_content: activeContent,
        has_draft: hasDraft
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        blocks: transformed,
        total: transformed.length,
        pendingDraftCount,
        isPreviewMode: isPreview
      }
    });
  } catch (error) {
    console.error('Error fetching content blocks:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve content blocks',
      error: error.message
    });
  }
};

// GET /api/content-blocks/:idOrKey
exports.getBlock = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const { preview } = req.query;
    const isPreview = preview === 'true' || preview === '1';

    const b = await findBlock(idOrKey);
    if (!b) {
      return res.status(404).json({
        success: false,
        message: `Content block '${idOrKey}' not found`
      });
    }

    const plain = b.get({ plain: true });
    const hasDraft = plain.draft_content !== null;
    const activeContent = isPreview && hasDraft ? plain.draft_content : plain.content;

    return res.status(200).json({
      success: true,
      data: {
        ...plain,
        active_content: activeContent,
        has_draft: hasDraft
      }
    });
  } catch (error) {
    console.error('Error fetching content block:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve content block',
      error: error.message
    });
  }
};

// PUT /api/content-blocks/:idOrKey/draft
exports.saveDraft = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const { content, block_name, category, is_active } = req.body;

    const b = await findBlock(idOrKey);
    if (!b) {
      return res.status(404).json({
        success: false,
        message: `Content block '${idOrKey}' not found`
      });
    }

    const updates = {
      draft_content: content !== undefined ? content : b.draft_content || b.content,
      publication_status: 'draft',
      updated_by: req.user?.name || req.body.updated_by || 'Admin'
    };

    if (block_name !== undefined) updates.block_name = block_name;
    if (category !== undefined) updates.category = category;
    if (is_active !== undefined) updates.is_active = is_active;

    await b.update(updates);

    return res.status(200).json({
      success: true,
      message: 'Content block draft saved successfully',
      data: b
    });
  } catch (error) {
    console.error('Error saving content block draft:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save content block draft',
      error: error.message
    });
  }
};

// POST /api/content-blocks/:idOrKey/publish
exports.publishBlock = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const { content, block_name, category, is_active } = req.body || {};

    const b = await findBlock(idOrKey);
    if (!b) {
      return res.status(404).json({
        success: false,
        message: `Content block '${idOrKey}' not found`
      });
    }

    const newContent = content !== undefined ? content : (b.draft_content !== null ? b.draft_content : b.content);

    const history = Array.isArray(b.version_history) ? [...b.version_history] : [];
    history.unshift({
      timestamp: new Date().toISOString(),
      published_by: req.user?.name || 'Admin',
      content_snapshot: b.content
    });
    if (history.length > 10) history.pop();

    const updates = {
      content: newContent,
      draft_content: null,
      publication_status: 'published',
      version_history: history,
      updated_by: req.user?.name || 'Admin'
    };

    if (block_name !== undefined) updates.block_name = block_name;
    if (category !== undefined) updates.category = category;
    if (is_active !== undefined) updates.is_active = is_active;

    await b.update(updates);

    return res.status(200).json({
      success: true,
      message: 'Content block published successfully',
      data: b
    });
  } catch (error) {
    console.error('Error publishing content block:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to publish content block',
      error: error.message
    });
  }
};

// POST /api/content-blocks/publish-all
exports.publishAllDrafts = async (req, res) => {
  try {
    const drafts = await ContentBlock.findAll({
      where: {
        draft_content: { [Op.ne]: null }
      }
    });

    let publishedCount = 0;
    for (const b of drafts) {
      const history = Array.isArray(b.version_history) ? [...b.version_history] : [];
      history.unshift({
        timestamp: new Date().toISOString(),
        published_by: req.user?.name || 'Admin',
        content_snapshot: b.content
      });
      if (history.length > 10) history.pop();

      await b.update({
        content: b.draft_content,
        draft_content: null,
        publication_status: 'published',
        version_history: history,
        updated_by: req.user?.name || 'Admin'
      });
      publishedCount += 1;
    }

    return res.status(200).json({
      success: true,
      message: `Successfully published ${publishedCount} pending draft blocks`,
      data: { publishedCount }
    });
  } catch (error) {
    console.error('Error publishing all blocks:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to publish all blocks',
      error: error.message
    });
  }
};

// POST /api/content-blocks/:idOrKey/discard-draft
exports.discardDraft = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const b = await findBlock(idOrKey);
    if (!b) {
      return res.status(404).json({
        success: false,
        message: `Content block '${idOrKey}' not found`
      });
    }

    await b.update({
      draft_content: null,
      publication_status: 'published'
    });

    return res.status(200).json({
      success: true,
      message: 'Draft discarded successfully',
      data: b
    });
  } catch (error) {
    console.error('Error discarding block draft:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to discard block draft',
      error: error.message
    });
  }
};
