'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {
    // 通过egg curl 抓取接口返回数据
    const url = this.config.api + 'appapi.php?a=getPortalList&catid=20&page=1';

    const response = await this.ctx.curl(url);

    const data = JSON.parse(response.data);
    // console.log(response.data); // Buffer
    // console.log(data);
    return data;
  }

  async getNewsContent(aid) {
    const url = `${this.config.api}appapi.php?a=getPortalArticle&aid=${aid}`;
    const response = await this.ctx.curl(url);
    const data = JSON.parse(response.data);
    console.log(data);
    return data;
  }
}

module.exports = NewsService;
