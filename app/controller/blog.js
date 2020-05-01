'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class BlogController extends Controller {
  async index() {
    const ctx = this.ctx;
    const limit = toInt(ctx.query.limit) || 10;
    const offset = toInt(ctx.query.offset) || 1;
    const query = { limit, offset };
    const result = await ctx.service.article.getList(query);
    if (result) {
      ctx.helper.success(ctx, { msg: '文章列表查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '文章列表查询失败', res: result });
    }
  }

  async show() {
    const ctx = this.ctx;
    console.log('========================', ctx)
    const result = await ctx.service.article.getDetail(ctx.params.id);
    if (result) {
      ctx.helper.success(ctx, { msg: '文章详情查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '文章详情查询失败', res: result });
    }
  }
}

module.exports = BlogController;