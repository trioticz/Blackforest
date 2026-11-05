const { PageSection } = require('../models');
const { Op } = require('sequelize');
const { defaultPageSections } = require('../seeds/pageSectionsSeed');

const safeParseJSON = (data) => {
  if (data === null || data === undefined) return null;
  if (typeof data === 'object') return data;
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return typeof parsed === 'object' && parsed !== null ? parsed : data;
    } catch (_) {
      return data;
    }
  }
  return data;
};

const findSection = async (idOrKey) => {
  if (!idOrKey) return null;
  if (/^\d+$/.test(String(idOrKey))) {
    const byId = await PageSection.findByPk(idOrKey);
    if (byId) return byId;
  }
  return await PageSection.findOne({ where: { section_key: idOrKey } });
};

const findOrCreateSection = async (idOrKey, extraDefaults = {}) => {
  if (!idOrKey) return null;
  let sec = await findSection(idOrKey);
  if (!sec) {
    const def = (defaultPageSections || []).find((s) => s.section_key === idOrKey) || {};
    try {
      sec = await PageSection.create({
        page_slug: def.page_slug || (String(idOrKey).includes('.') ? String(idOrKey).split('.')[0] : 'global'),
        section_key: idOrKey,
        section_name: extraDefaults.section_name || def.section_name || String(idOrKey),
        order_index: def.order_index || 0,
        is_visible: def.is_visible !== undefined ? def.is_visible : true,
        content: extraDefaults.content !== undefined ? extraDefaults.content : (def.content || {}),
        original_content: def.content || extraDefaults.content || {},
        draft_content: null,
        publication_status: 'published',
        updated_by: 'System'
      });
    } catch (_) {
      sec = await findSection(idOrKey);
    }
  }
  return sec;
};

// GET /api/page-sections
exports.getAllSections = async (req, res) => {
  try {
    const { page_slug, preview } = req.query;
    const isPreview = preview === 'true' || preview === '1';

    const where = {};
    if (page_slug && page_slug !== 'all') {
      where.page_slug = page_slug;
    }

    const sections = await PageSection.findAll({
      where,
      order: [
        ['page_slug', 'ASC'],
        ['order_index', 'ASC'],
        ['id', 'ASC']
      ]
    });

    const pendingDraftCount = await PageSection.count({
      where: {
        draft_content: { [Op.ne]: null }
      }
    });

    const transformed = sections.map((sec) => {
      const plain = sec.get({ plain: true });
      const content = safeParseJSON(plain.content);
      const draftContent = safeParseJSON(plain.draft_content);
      const hasDraft = draftContent !== null && draftContent !== undefined;
      const activeContent = isPreview && hasDraft ? draftContent : content;

      return {
        ...plain,
        content,
        draft_content: draftContent,
        active_content: activeContent,
        has_draft: hasDraft
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        sections: transformed,
        total: transformed.length,
        pendingDraftCount,
        isPreviewMode: isPreview
      }
    });
  } catch (error) {
    console.error('Error fetching page sections:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve page sections',
      error: error.message
    });
  }
};

// GET /api/page-sections/:idOrKey
exports.getSection = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const { preview } = req.query;
    const isPreview = preview === 'true' || preview === '1';

    const sec = await findOrCreateSection(idOrKey);
    if (!sec) {
      return res.status(404).json({
        success: false,
        message: `Page section '${idOrKey}' not found`
      });
    }

    const plain = sec.get({ plain: true });
    const content = safeParseJSON(plain.content);
    const draftContent = safeParseJSON(plain.draft_content);
    const hasDraft = draftContent !== null;
    const activeContent = isPreview && hasDraft ? draftContent : content;

    return res.status(200).json({
      success: true,
      data: {
        ...plain,
        content,
        draft_content: draftContent,
        active_content: activeContent,
        has_draft: hasDraft
      }
    });
  } catch (error) {
    console.error('Error fetching section:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve section',
      error: error.message
    });
  }
};

// PUT /api/page-sections/:idOrKey/draft (Save Draft)
exports.saveDraft = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const { content, section_name, is_visible } = req.body;

    const sec = await findOrCreateSection(idOrKey, { section_name, content });
    if (!sec) {
      return res.status(500).json({
        success: false,
        message: `Failed to initialize page section '${idOrKey}'`
      });
    }

    const parsedContent = safeParseJSON(content);
    const updates = {
      draft_content: parsedContent !== undefined ? parsedContent : sec.draft_content || sec.content,
      publication_status: 'draft',
      updated_by: req.user?.name || req.body.updated_by || 'Admin'
    };

    if (section_name !== undefined) updates.section_name = section_name;
    if (is_visible !== undefined) updates.is_visible = is_visible;

    await sec.update(updates);

    const plain = sec.get({ plain: true });
    plain.content = safeParseJSON(plain.content);
    plain.draft_content = safeParseJSON(plain.draft_content);

    return res.status(200).json({
      success: true,
      message: 'Draft saved successfully',
      data: plain
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save section draft',
      error: error.message
    });
  }
};

// POST /api/page-sections/:idOrKey/publish (Publish single section)
exports.publishSection = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const { content, section_name, is_visible } = req.body || {};

    const sec = await findOrCreateSection(idOrKey, { section_name, content });
    if (!sec) {
      return res.status(500).json({
        success: false,
        message: `Failed to initialize page section '${idOrKey}'`
      });
    }

    const parsedContent = safeParseJSON(content);
    const secDraft = safeParseJSON(sec.draft_content);
    const secContent = safeParseJSON(sec.content);

    const newContent = parsedContent !== undefined && parsedContent !== null
      ? parsedContent
      : (secDraft !== null ? secDraft : secContent);

    // Append to version history (keep last 10 revisions)
    const history = Array.isArray(sec.version_history) ? [...sec.version_history] : [];
    history.unshift({
      timestamp: new Date().toISOString(),
      published_by: req.user?.name || 'Admin',
      content_snapshot: secContent
    });
    if (history.length > 10) history.pop();

    const updates = {
      content: newContent,
      draft_content: null,
      publication_status: 'published',
      version_history: history,
      updated_by: req.user?.name || 'Admin'
    };

    if (section_name !== undefined) updates.section_name = section_name;
    if (is_visible !== undefined) updates.is_visible = is_visible;

    await sec.update(updates);

    const plain = sec.get({ plain: true });
    plain.content = safeParseJSON(plain.content);
    plain.draft_content = null;

    return res.status(200).json({
      success: true,
      message: 'Section published successfully to live website',
      data: plain
    });
  } catch (error) {
    console.error('Error publishing section:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to publish section',
      error: error.message
    });
  }
};

// POST /api/page-sections/publish-all (Publish all pending drafts)
exports.publishAllDrafts = async (req, res) => {
  try {
    const draftSections = await PageSection.findAll({
      where: {
        draft_content: { [Op.ne]: null }
      }
    });

    let publishedCount = 0;
    for (const sec of draftSections) {
      const history = Array.isArray(sec.version_history) ? [...sec.version_history] : [];
      history.unshift({
        timestamp: new Date().toISOString(),
        published_by: req.user?.name || 'Admin',
        content_snapshot: sec.content
      });
      if (history.length > 10) history.pop();

      await sec.update({
        content: sec.draft_content,
        draft_content: null,
        publication_status: 'published',
        version_history: history,
        updated_by: req.user?.name || 'Admin'
      });
      publishedCount += 1;
    }

    return res.status(200).json({
      success: true,
      message: `Successfully published ${publishedCount} pending draft sections`,
      data: { publishedCount }
    });
  } catch (error) {
    console.error('Error publishing all drafts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to publish all drafts',
      error: error.message
    });
  }
};

// POST /api/page-sections/:idOrKey/discard-draft
exports.discardDraft = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const sec = await findSection(idOrKey);
    if (!sec) {
      return res.status(404).json({
        success: false,
        message: `Page section '${idOrKey}' not found`
      });
    }

    await sec.update({
      draft_content: null,
      publication_status: 'published'
    });

    return res.status(200).json({
      success: true,
      message: 'Draft discarded successfully',
      data: sec
    });
  } catch (error) {
    console.error('Error discarding draft:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to discard draft',
      error: error.message
    });
  }
};

// POST /api/page-sections/:idOrKey/restore-original
exports.restoreOriginal = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const sec = await findSection(idOrKey);
    if (!sec) {
      return res.status(404).json({
        success: false,
        message: `Page section '${idOrKey}' not found`
      });
    }

    if (!sec.original_content) {
      return res.status(400).json({
        success: false,
        message: 'No original content snapshot found for this section'
      });
    }

    await sec.update({
      content: sec.original_content,
      draft_content: null,
      publication_status: 'published',
      updated_by: req.user?.name || 'Admin'
    });

    return res.status(200).json({
      success: true,
      message: 'Section restored to original default content',
      data: sec
    });
  } catch (error) {
    console.error('Error restoring original content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to restore original content',
      error: error.message
    });
  }
};

// POST /api/page-sections/reorder
exports.reorderSections = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { section_key or id, order_index }
    if (!Array.isArray(orders)) {
      return res.status(400).json({
        success: false,
        message: 'Expected orders array'
      });
    }

    for (const item of orders) {
      const sec = await findSection(item.section_key || item.id);
      if (sec && typeof item.order_index === 'number') {
        await sec.update({ order_index: item.order_index });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Section order updated successfully'
    });
  } catch (error) {
    console.error('Error reordering sections:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update section order',
      error: error.message
    });
  }
};

// POST /api/page-sections/:idOrKey/toggle-visibility
exports.toggleVisibility = async (req, res) => {
  try {
    const { idOrKey } = req.params;
    const sec = await findSection(idOrKey);
    if (!sec) {
      return res.status(404).json({
        success: false,
        message: `Page section '${idOrKey}' not found`
      });
    }

    const nextState = req.body.is_visible !== undefined ? req.body.is_visible : !sec.is_visible;
    await sec.update({ is_visible: nextState });

    return res.status(200).json({
      success: true,
      message: `Section visibility set to ${nextState ? 'visible' : 'hidden'}`,
      data: sec
    });
  } catch (error) {
    console.error('Error toggling visibility:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to toggle section visibility',
      error: error.message
    });
  }
};
