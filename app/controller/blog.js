'use strict';
const Controller = require('egg').Controller;
const qs = require('qs');
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
    const { name, label_id } = ctx.query;
    const query = { limit, offset, name, label_id };
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
    const data = await ctx.service.blog.getDetail(ctx.params.id);
    const lastsql = `
      select id from article where id=(select max(id) from article where id < '${ctx.params.id}') 
    `;
    const nextsql = `
      select id from article where id=(select min(id) from article where id > '${ctx.params.id}')
    `;
    // 当前id 的上一条id和下一条id
    const last_result = await ctx.app.model.query(lastsql, { type: 'SELECT' });
    const next_result = await ctx.app.model.query(nextsql, { type: 'SELECT' });
    const result = data.toJSON();
    result.last_id = last_result && last_result.length ? last_result[0].id : null;
    result.next_id = next_result && next_result.length ? next_result[0].id : null;
    if (result) {
      ctx.helper.success(ctx, { msg: '文章详情查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '文章详情查询失败', res: result });
    }
  }
  /**
   * 标签列表
   * limit 每页文章数量
   * offset 页数
   * @memberof BlogController
   */
  async getTagsList() {
    const ctx = this.ctx;
    const sql = `
      SELECT l.name, l.id, s.count
      FROM label l
      INNER JOIN
      (SELECT label_id, COUNT(*) as count FROM set_artitle_label GROUP BY label_id) s
      ON l.id = s.label_id;
    `;
    const result = await ctx.app.model.query(sql, { type: 'SELECT' });
    if (result) {
      ctx.helper.success(ctx, { msg: '文章列表查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '文章列表查询失败', res: result });
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
      ctx.helper.success(ctx, { msg: '获取成功', code: 200, res: result.data.data });
    } else {
      ctx.helper.fail(ctx, { msg: '获取失败', res: null });
    }
  }
  /**
   * 菜单
   * @memberof BlogController
   */
  async getMenusList() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.model.Sort.findAll(query);
    ctx.helper.success(ctx, { msg: '分类列表查询成功', code: 200, res: result });
  }
  /**
   * 归档数据
   * @memberof BlogController
   */
  async getArchiveList() {
    const ctx = this.ctx;
    const result = await this.app.mysql.query('SELECT id, title, date, version, created_at, updated_at FROM article ORDER BY created_at DESC');
    if (result) {
      ctx.helper.success(ctx, { msg: '归档列表查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '获取失败', res: null });
    }
  }
  /**
   * 归档数据 月份
   * @memberof BlogController
   */
  async getArchiveListByMonth() {
    const ctx = this.ctx;
    const result = await this.app.mysql.query("SELECT DATE_FORMAT(created_at, '%Y-%m') AS month , COUNT(*) AS sum FROM article GROUP BY month ORDER BY month DESC");
    if (result) {
      ctx.helper.success(ctx, { msg: '归档列表查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '获取失败', res: null });
    }
  }
  /**
   * 获取最新文章 热点文章 随机文章
   * @memberof BlogController
   */
  async getArticleTabs() {
    const ctx = this.ctx;
    const result = [];
    const result1 = await this.app.mysql.query('SELECT id, title FROM article ORDER BY date DESC LIMIT 5');
    const result2 = await this.app.mysql.query('SELECT id, title FROM article ORDER BY  `comment` DESC, like_count DESC, views DESC LIMIT 5');
    const result3 = await this.app.mysql.query('SELECT id, title FROM article  ORDER BY  RAND() LIMIT 5');
    result.push(result1, result2, result3);
    if (result.length) {
      ctx.helper.success(ctx, { msg: '归档列表查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '获取失败', res: null });
    }
  }
  /**
   * 获取友链
   * @memberof BlogController
   */
  async getFriendLinks() {
    const ctx = this.ctx;
    const result = await ctx.model.FriendLink.findAll({
      where: {
        state: true,
      },
    });
    if (result.length) {
      ctx.helper.success(ctx, { msg: '归档列表查询成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '获取失败', res: null });
    }
  }
  /**
   * 文章点赞 +1
   * @memberof BlogController
   */
  async setArticleLike() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const result = await this.app.mysql.query('update article set like_count = (like_count + ?) where id = ?', [ 1, id ]);
    if (result) {
      ctx.helper.success(ctx, { msg: '点赞成功', code: 200, res: null });
    } else {
      ctx.helper.fail(ctx, { msg: '点赞失败', res: null });
    }
  }
  /**
   * 评论
   * @memberof BlogController
   */
  async createComment() {
    const ctx = this.ctx;
    const params = {
      ...ctx.request.body,
    };

    // 定义创建接口的请求参数规则
    const createRule = {
      user_email: {
        required: true,
        type: 'string',
      },
      user_nickname: {
        required: true,
        type: 'string',
      },
      content: {
        required: true,
        type: 'string',
      },
      article_id: {
        required: true,
        type: 'string',
      },
    };

    ctx.validate(createRule, params);
    const result = await ctx.service.blog.createComment(params);
    if (result) {
      await ctx.service.article.setArticleComments(params.article_id);
      ctx.helper.success(ctx, { msg: '创建评论成功', code: 200, res: null });
    } else {
      ctx.helper.fail(ctx, { msg: '创建评论失败', res: null });
    }
  }
  /**
   *  查询评论列表
   * @memberof BlogController
   */
  async getComment() {
    const ctx = this.ctx;
    const { articleId } = ctx.query;
    const result = await ctx.service.blog.getComment(articleId);
    if (result) {
      ctx.helper.success(ctx, { msg: '查询评论成功', code: 200, res: result });
    } else {
      ctx.helper.fail(ctx, { msg: '查询评论失败', res: null });
    }
  }
}


module.exports = BlogController;
