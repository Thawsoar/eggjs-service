'use strict';
const Service = require('egg').Service;
class BlogService extends Service {

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
      attributes: [ 'id', 'user_id', 'title', 'description', 'img_url', 'views', 'comment', 'date' ],
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
    await this.app.mysql.query('update article set views = (views + ?) where id = ?', [ 1, id ]);
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

module.exports = BlogService;
