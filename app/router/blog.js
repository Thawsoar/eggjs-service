'use strict';

module.exports = app => {
  const { router, controller } = app;
  // // 登录
  // router.post('/login', controller.login.login);
  // // 登出
  // router.post('/logout', controller.login.logout);
  // github 登录获取登录用户信息
  router.get('/blog/article/list', controller.blog.index);
  router.get('/blog/article/detail/:id', controller.blog.show);
  router.get('/blog/getErrorData', controller.blog.getErrorData);

};
