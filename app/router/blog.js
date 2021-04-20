'use strict';

module.exports = app => {
  const { router, controller } = app;
  // // 登录
  // router.post('/login', controller.login.login);
  // // 登出
  // router.post('/logout', controller.login.logout);
  // github 登录获取登录用户信息

  // 获取文章列表
  router.get('/blog/article/list', controller.blog.index);

  // 获取文章详情
  router.get('/blog/article/detail/:id', controller.blog.show);

  // 获取错误页面
  router.get('/blog/getErrorData', controller.blog.getErrorData);

  // 获取一言数据
  router.get('/blog/getHitokoto', controller.blog.getHitokoto);

  // 获取番剧列表
  router.get('/blog/getFollowList', controller.blog.getFollowList);
  // 获取标签列表
  router.get('/blog/getTagsList', controller.blog.getTagsList);

  // 获取菜单列表
  router.get('/blog/getMenusList', controller.blog.getMenusList);

  // 获取归档数据
  router.get('/blog/getArchiveList', controller.blog.getArchiveList);

  // 获取归档数据 月份
  router.get('/blog/getArchiveListByMonth', controller.blog.getArchiveListByMonth);

  // 获取最新文章 热点文章 随机文章
  router.get('/blog/getArticleTabs', controller.blog.getArticleTabs);

  // 获取友链
  router.get('/blog/getFriendLinks', controller.blog.getFriendLinks);

  // 文章点赞
  router.post('/blog/article/like/:id', controller.blog.setArticleLike);

  // 创建评论
  router.post('/blog/comment/create', controller.blog.createComment);

  // 查询评论列表
  router.get('/blog/comment/getList', controller.blog.getComment);
  router.post('/wxmini/openid', controller.wxmini.openid);
  router.get('/wxmini/getAccessToken', controller.wxmini.getAccessToken);

};
