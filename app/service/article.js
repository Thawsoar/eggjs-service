'use strict';
const Service = require('egg').Service;
class ArticleService extends Service {

  // 创建
  async create(params) {
    // console.log('---------------', params)
    const { ctx } = this;
    let transaction;

    try {
      // 这里需要注意，egg-sequelize会将sequelize实例作为app.model对象
      transaction = await ctx.model.transaction();

      // 创建文章
      const article = await ctx.model.Article.create({
        params,
      }, {
        transaction,
      });

      // 创建默认标签
      const label = await ctx.model.Label.create({
        name: 'note',
      }, {
        transaction,
      });

      const articleId = article && article.getDataValue('id');
      const labelId = label && label.getDataValue('id');

      if (!articleId || !labelId) {
        throw new Error('创建文章失败');
      }
      // 创建文章和标签之间的关联
      await ctx.model.SetArtitleLabel.create({
        article_id: articleId,
        label_id: labelId,
      }, {
        transaction,
      });
      await transaction.commit();
      return articleId;
    } catch (err) {
      ctx.logger.error(err);
      await transaction.rollback();
    }
    // const result = await this.app.model.Article.create(params);

    // if (!result) {
    //   this.ctx.throw(404, 'role is not found');
    // }
    // return result;
  }
  // 创建
  async update(id, params) {
    const label = await this.app.model.Article.findByPk(id);
    if (!label) {
      return false;
    }
    await label.update(params);
    return label;
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
  // 查询文章详情
  async getArticle(id) {
    const label = await this.app.model.Article.findOne({
      where: {
        id,
      },
    });
    if (!label) {
      this.ctx.throw(404, 'Label is not found');
    }
    return label;
  }
}

module.exports = ArticleService;
