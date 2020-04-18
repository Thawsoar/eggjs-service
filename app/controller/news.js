'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    // console.log(this.app.getConfig());
    console.log(this.ctx.getIp());
    console.log(this.ctx.getHost());
    console.log(this.ctx.request.getRequest());
    const list = await this.service.news.getNewsList();
    this.ctx.body = list;
  }

  async content() {
    const { aid } = this.ctx.query;
    console.log(aid);
    const content = await this.service.news.getNewsContent(aid);
    this.ctx.body = content;
  }
}

module.exports = NewsController;
