const { Op } = require('sequelize');
const { Article, User } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { makeUniqueSlug } = require('../utils/slugify');
const { logAudit } = require('../services/auditService');

const getArticles = async (req, res, next) => {
  try {
    const { category, status, featured, search, page = 1, limit = 50 } = req.query;
    const where = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (featured !== undefined) where.featured = featured === 'true';

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { excerpt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { rows: articles, count: total } = await Article.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      limit: parseInt(limit, 10),
      offset,
      order: [
        ['featured', 'DESC'],
        ['publishedAt', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });

    return sendSuccess(res, {
      articles,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

const getArticleBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({
      where: { slug },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'avatar']
        }
      ]
    });

    if (!article) {
      return sendError(res, 'Article not found', 404);
    }

    return sendSuccess(res, article);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const { title, slug: inputSlug, excerpt, content, coverImage, detailImage1, detailImage2, quote, quoteAuthor, category, tags, publishedAt, featured, status, seoTitle, seoDescription, seoKeywords } = req.body;

    if (!title) {
      return sendError(res, 'Article title is required', 400);
    }

    const slug = await makeUniqueSlug(Article, inputSlug || title);

    const article = await Article.create({
      title,
      slug,
      excerpt: excerpt || '',
      content: content || '',
      coverImage: coverImage || '',
      detailImage1: detailImage1 || '',
      detailImage2: detailImage2 || '',
      quote: quote || '',
      quoteAuthor: quoteAuthor || '',
      authorId: req.user?.id || null,
      category: category || 'Travel Guides',
      tags: Array.isArray(tags) ? tags : [],
      publishedAt: publishedAt || new Date(),
      featured: Boolean(featured),
      status: status || 'published',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || '',
      seoKeywords: seoKeywords || ''
    });

    await logAudit({
      userId: req.user?.id,
      action: 'CREATE_ARTICLE',
      entity: 'Article',
      entityId: article.id,
      ip: req.ip
    });

    return sendSuccess(res, article, 'Article created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return sendError(res, 'Article not found', 404);
    }

    const { title, slug: inputSlug, excerpt, content, coverImage, detailImage1, detailImage2, quote, quoteAuthor, category, tags, publishedAt, featured, status, seoTitle, seoDescription, seoKeywords } = req.body;

    if (title) article.title = title;
    if (inputSlug && inputSlug !== article.slug) {
      article.slug = await makeUniqueSlug(Article, inputSlug, article.id);
    }
    if (excerpt !== undefined) article.excerpt = excerpt;
    if (content !== undefined) article.content = content;
    if (coverImage !== undefined) article.coverImage = coverImage;
    if (detailImage1 !== undefined) article.detailImage1 = detailImage1;
    if (detailImage2 !== undefined) article.detailImage2 = detailImage2;
    if (quote !== undefined) article.quote = quote;
    if (quoteAuthor !== undefined) article.quoteAuthor = quoteAuthor;
    if (category !== undefined) article.category = category;
    if (tags !== undefined) article.tags = Array.isArray(tags) ? tags : [];
    if (publishedAt !== undefined) article.publishedAt = publishedAt;
    if (featured !== undefined) article.featured = Boolean(featured);
    if (status) article.status = status;
    if (seoTitle !== undefined) article.seoTitle = seoTitle;
    if (seoDescription !== undefined) article.seoDescription = seoDescription;
    if (seoKeywords !== undefined) article.seoKeywords = seoKeywords;

    await article.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_ARTICLE',
      entity: 'Article',
      entityId: article.id,
      ip: req.ip
    });

    return sendSuccess(res, article, 'Article updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return sendError(res, 'Article not found', 404);
    }

    await article.destroy();

    await logAudit({
      userId: req.user?.id,
      action: 'DELETE_ARTICLE',
      entity: 'Article',
      entityId: id,
      ip: req.ip
    });

    return sendSuccess(res, {}, 'Article deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle
};
