'use strict';
const Service = require('egg').Service;
class CommentService extends Service {

  // 创建
  async create(params) {
    // console.log('---------------', params)
    const result = await this.app.model.Comment.create(params);
    if (!result) {
      this.ctx.throw(404, 'role is not found');
    }
    return result;
  }
  // 创建
  async update(id, params) {
    const label = await this.app.model.Comment.findByPk(id);
    if (!label) {
      return false;
    }
    await label.update(params);
    return label;
  }
  // 查询标签详情
  async getComment(id) {
    const label = await this.app.model.Comment.findOne({
      where: {
        id,
      },
    });
    if (!label) {
      this.ctx.throw(404, 'Comment is not found');
    }
    return label;
  }
  // 获取评论列表
  async getList(params) {
    const { limit, offset } = params;
    const sql = `
      SELECT c.id, c.user_nickname, c.user_email, c.user_url, c.like_count, c.content, a.title
      from comment c, article a
      WHERE c.article_id = a.id
      LIMIT ? , ?
    `;
    const sql1 = `
      SELECT count(*) as count FROM comment
    `;
    const rows = await this.app.mysql.query(sql, [ (offset - 1) * limit, offset * limit ]);
    const count = await this.app.mysql.query(sql1);
    // const result = await ctx.model.Comment.findAndCountAll({
    //   offset:,
    //   limit:,
    // });
    return {
      rows,
      count: count[0].count,
    };
  }
}

module.exports = CommentService;
