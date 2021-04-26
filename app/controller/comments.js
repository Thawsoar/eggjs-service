'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  name: {
    required: true,
    type: 'string',
  },
};

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CommentsController extends Controller {
  async index() {
    const ctx = this.ctx;
    const limit = toInt(ctx.query.limit) || 10;
    const offset = toInt(ctx.query.offset) || 1;
    const id = toInt(ctx.query.id);
    const query = { limit, offset, id };
    const result = await ctx.service.comment.getList(query);
    ctx.helper.success(ctx, { msg: '评论列表查询成功', code: 200, res: result });
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.model.Comment.findByPk(ctx.params.id);
    ctx.helper.success(ctx, { msg: '查询评论详情成功', res: result });
  }

  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.request.body,
    };
    ctx.validate(createRule, params);
    const result = await ctx.service.comment.create(params);
    await ctx.service.article.setArticleComments(params.article_id);
    ctx.helper.success(ctx, { msg: '创建评论成功', res: result });
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.comment.update(ctx.params.id, ctx.request.body);
    await ctx.service.article.setArticleComments(ctx.params.article_id);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '更新评论失败', res: result });
      return;
    }
    ctx.helper.success(ctx, { msg: '更新评论成功', res: result });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.model.Comment.findByPk(id);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '删除评论失败', res: result });
      return;
    }
    await result.destroy();
    await ctx.service.article.setArticleComments(result.toJSON().article_id);
    ctx.helper.success(ctx, { msg: '删除评论成功', res: result });
  }
}

module.exports = CommentsController;
