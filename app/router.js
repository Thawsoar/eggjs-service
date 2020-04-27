'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // 登录
  router.post('/login', controller.login.login);
  // 登出
  router.post('/logout', controller.login.logout);
  // github 登录获取登录用户信息
  router.post('/api/github/userInfo', controller.login.getGithubUserInfo);
  // 挂载鉴权路由
  // Authorization callback URL: http://127.0.0.1:7001/passport/github/callback
  // app.passport.mount('github');
  // console.log('-----------------------------------', app.passport);
  // 上面的 mount 是语法糖，等价于
  // const github = app.passport.authenticate('github', {});
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);


  // 获取用户信息
  router.get('/getUserInfo', jwt, controller.login.getUserInfo);
  // 用户管理
  router.resources('users', '/api/v1/users', jwt, controller.users);
  // 分类管理
  router.resources('sorts', '/api/v1/sorts', jwt, controller.sorts);
  // 标签管理
  router.resources('labels', '/api/v1/labels', jwt, controller.labels);
  // 文章管理
  router.resources('articles', '/api/v1/articles', controller.articles);
};
