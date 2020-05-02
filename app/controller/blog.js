'use strict';
const Controller = require('egg').Controller;
const qs = require('qs')
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class BlogController extends Controller {
  /**
   * 文章列表
   * limit 每页文章数量
   * offset 页数
   * @memberof BlogController
   */
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
  /**
   * 文章详情
   *
   * @memberof BlogController
   */
  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.article.getDetail(ctx.params.id);
    if (result) {
      ctx.helper.success(ctx, { msg: '文章详情查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '文章详情查询失败', res: result });
    }
  }
  // B站404页面 漫画
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

  /**
   * B站追番列表
   *
   * type 1 2 对应追番 追剧
   * follow_status 否 默认为0，1，2，3，对应 全部 想看 在看 看过
   * pn 是 默认为1，页数
   * ps 否 默认为10，每页番剧数量
   * vmid 是 b站uid
   * @memberof BlogController
   */
  async getFollowList() {
    const ctx = this.ctx;
    const { type = 1, follow_status = 2, pn = 1, ps = 100, vmid } = ctx.query;
    const params = {
      type,
      follow_status,
      pn,
      ps,
      vmid,
      ts: new Date().valueOf(),
    };
    const result = await ctx.curl(`https://api.bilibili.com/x/space/bangumi/follow/list?${qs.stringify(params)}`, {
      dataType: 'json',
      headers: {
        Cookie: "'buvid3=39826382-27BA-4B12-8FA4-5AC09286C61040775infoc; LIVE_BUVID=AUTO5315624722253497; sid=6whl84gl; CURRENT_FNVAL=16; stardustvideo=1; rpdid=|(JYYk)kYk)m0J'ulYk)uY)k|; _uuid=69BCF80E-AEF3-B690-A5B8-19CBCE37B1FA01370infoc; im_notify_type_126384053=0; INTVER=1; laboratory=1-1; LNG=zh-CN; DedeUserID=126384053; DedeUserID__ckMd5=b4b9e1bf05217193; SESSDATA=16a7763b%2C1602213331%2C89bb0*41; bili_jct=566a00896d1a93b70da44ffdc38cc6f9; PVID=1; bsource=seo_baidu; CURRENT_QUALITY=120; bp_t_offset_126384053=384660767133765690; bfe_id=1bad38f44e358ca77469025e0405c4a6'",
      },
    });
    if (result.status === 200) {
      console.log(result.status, result.data.data)
      ctx.helper.success(ctx, { msg: '获取成功', code: 200, res: result.data.data });
    } else {
      ctx.helper.fail(ctx, { msg: '获取失败', res: null });
    }
  }
}

module.exports = BlogController;
