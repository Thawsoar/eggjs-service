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
    const result = await ctx.service.article.getDetail(ctx.params.id);
    if (result) {
      ctx.helper.success(ctx, { msg: '文章详情查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '文章详情查询失败', res: result });
    }
  }
  async getErrorData() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://www.bilibili.com/activity/web/view/data/31', {
      dataType: 'json',
    });
    if (result.status === 200) {
      const data = result.data.data.list.map(item => {
        return item.data.img;
      });
      ctx.helper.success(ctx, { msg: '获取成功', code: 200, res: data });
    } else {
      ctx.helper.fail(ctx, { msg: '获取失败', res: null });
    }
  }
}

module.exports = BlogController;
