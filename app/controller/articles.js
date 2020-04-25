'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  title: {
    required: true,
    type: 'string',
  },
  content: {
    required: true,
    type: 'string',
  },
};

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ArticlesController extends Controller {
  async index() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.service.article.getList();
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

  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.request.body,
    };
    ctx.validate(createRule, params);
    const result = await ctx.service.article.create(params);
    if (result) {
      ctx.helper.success(ctx, { msg: '创建文章成功', res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '创建文章失败', res: result });
    }
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.article.update(ctx.params.id, ctx.request.body);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '更新文章失败', res: result });
      return;
    }
    ctx.helper.success(ctx, { msg: '更新文章成功', res: result });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.article.destroy(id);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '删除文章失败', res: result });
      return;
    }
    ctx.helper.success(ctx, { msg: '删除文章成功', res: result });
  }
}

module.exports = ArticlesController;
