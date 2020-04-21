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

      // 创建文章
      const article = await ctx.model.Article.create(params, {
        transaction,
      });
      const articleId = article && article.getDataValue('id');
      const labelId = params.label;
      const sortId = params.sort;
      if (articleId && labelId) {
        // 创建文章和标签之间的关联
        await ctx.model.SetArtitleLabel.create({
          article_id: articleId,
          label_id: labelId,
        }, {
          transaction,
        });
        await transaction.commit();
      }
      if (articleId && sortId) {
        // 创建文章和分类之间的关联
        await ctx.model.SetArtitleLabel.create({
          article_id: articleId,
          sort_id: sortId,
        }, {
          transaction,
        });
        await transaction.commit();
      }
      return article;
    } catch (err) {
      ctx.logger.error(err);
      await transaction.rollback();
    }
  }
  // 更新
  async update(id, params) {
    const article = await this.app.model.Article.findByPk(id);
    // const label = await this.app.model.Label.findByPk(id);
    if (!article) {
      return false;
    }
    // const { ctx } = this;
    // let transaction;
    // try {
    //   // 这里需要注意，egg-sequelize会将sequelize实例作为app.model对象
    //   transaction = await ctx.model.transaction();

    //   // 修改文章
    //   const updateArticle = await article.update(params, {
    //     transaction,
    //   });
    //   const articleId = updateArticle && updateArticle.getDataValue('id');
    //   const labelId = params.label;
    //   const sortId = params.sort;
      
    //   if (articleId && labelId) {
    //     // 创建文章和标签之间的关联
    //     await ctx.model.SetArtitleLabel.update({
    //       article_id: articleId,
    //       label_id: labelId,
    //     }, {
    //       transaction,
    //     });
    //     await transaction.commit();
    //   }
    //   if (articleId && sortId) {
    //     // 创建文章和分类之间的关联
    //     await ctx.model.SetArtitleLabel.create({
    //       article_id: articleId,
    //       sort_id: sortId,
    //     }, {
    //       transaction,
    //     });
    //     await transaction.commit();
    //   }
    //   return article;
    // } catch (err) {
    //   ctx.logger.error(err);
    //   await transaction.rollback();
    // }
    await article.update(params);
    return article;
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
