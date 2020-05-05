'use strict';
const Service = require('egg').Service;
class ArticleService extends Service {

  // 创建
  async create(params) {
    const { ctx } = this;
    let transaction;
    try {
      // 这里需要注意，egg-sequelize会将sequelize实例作为app.model对象
      transaction = await ctx.model.transaction();
      const newArticle = await ctx.model.Article.create(params, {
        transaction,
      }); // 返回创建的Article对象
      const labels = await ctx.model.Label.findAll({ where: { id: params.label } }); // 找到对应的label_id对象
      const sorts = await ctx.model.Sort.findAll({ where: { id: params.sort } }); // 找到对应的label_id对象
      await newArticle.setLabels(labels, { transaction }); // 通过setLabels方法在Label表添加记录
      await newArticle.setSorts(sorts, { transaction });
      await transaction.commit();
      return true;
    } catch (err) {
      ctx.logger.error(err);
      await transaction.rollback();
    }
  }
  // 更新
  async update(id, params) {
    const { ctx } = this;
    let transaction;
    try {
      // 这里需要注意，egg-sequelize会将sequelize实例作为app.model对象
      transaction = await ctx.model.transaction();
      const labels = await ctx.model.Label.findAll({ where: { id: params.label } });
      const sorts = await ctx.model.Sort.findAll({ where: { id: params.sort } });
      const article = await ctx.model.Article.findByPk(id);
      await article.update(params, { transaction });
      await article.setLabels(labels, { transaction });
      await article.setSorts(sorts, { transaction });
      await transaction.commit();
      return true;
    } catch (err) {
      ctx.logger.error(err);
      await transaction.rollback();
    }
  }
  // 删除文章
  async destroy(id) {
    const { ctx } = this;
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      const article = await ctx.model.Article.findByPk(id, {
        include: [
          {
            model: ctx.model.Label,
            attributes: [ 'id', 'name' ],
            through: {
              // 指定中间表的属性，这里表示不需要任何中间表的属性
              attributes: [],
            },
          },
          {
            model: ctx.model.Sort,
            attributes: [ 'id', 'name' ],
            through: {
              // 指定中间表的属性，这里表示不需要任何中间表的属性
              attributes: [],
            },
          },
        ],
      });
      await article.setLabels([]);
      await article.setSorts([]);
      await article.destroy();
      await transaction.commit();
      return true;
    } catch (err) {
      ctx.logger.error(err);
      await transaction.rollback();
    }
  }
  // 设置文章标签
  async setArtitleLabel(params) {
    const result = await this.app.model.SetArtitleLabel.create(params);
    if (!result) {
      await result.update(params);
      return false;
    }
    return result;
  }
  // 设置文章分类
  async setArticleSort(params) {
    const result = await this.app.model.SetArtitleSort.create(params);
    if (!result) {
      await result.update(params);
      return false;
    }
    return result;
  }
  // 获取文章列表
  async getList(params) {
    const { ctx } = this;
    const { limit, offset, label_id, name } = params;
    const where = label_id && name ? {
      id: label_id,
      name,
    } : {};
    const result = await ctx.model.Article.findAndCountAll({
      offset: (offset - 1) * limit,
      limit: offset * limit,
      attributes: [ 'id', 'user_id', 'title', 'description', 'img_url', 'views', 'comment', 'date', 'like_count' ],
      distinct: true,
      include: [
        {
          model: ctx.model.Label,
          attributes: [ 'id', 'name' ],
          where,
          through: {
            // 指定中间表的属性，这里表示不需要任何中间表的属性
            attributes: [],
          },
        },
        {
          model: ctx.model.Sort,
          attributes: [ 'id', 'name' ],
          through: {
            // 指定中间表的属性，这里表示不需要任何中间表的属性
            attributes: [],
          },
        },
      ],
      includeIgnoreAttributes: true,
    });
    return result;
  }
  // 查询文章详情
  async getDetail(id) {
    const { ctx } = this;
    const result = await ctx.model.Article.findByPk(id, {
      include: [
        {
          model: ctx.model.Label,
          attributes: [ 'id', 'name' ],
          through: {
            // 指定中间表的属性，这里表示不需要任何中间表的属性
            attributes: [],
          },
        },
        {
          model: ctx.model.Sort,
          attributes: [ 'id', 'name' ],
          through: {
            // 指定中间表的属性，这里表示不需要任何中间表的属性
            attributes: [],
          },
        },
      ],
      includeIgnoreAttributes: true,
    });
    return result;
  }
}

module.exports = ArticleService;
