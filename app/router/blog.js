'use strict';

module.exports = app => {
  const { router, controller } = app;
  // // 登录
  // router.post('/login', controller.login.login);
  // // 登出
  // router.post('/logout', controller.login.logout);
  // github 登录获取登录用户信息
  router.get('/article/list', controller.blog.index);
  router.get('/article/detail', controller.blog.show);

};
