'use strict';

const path = require('path');

// Sync model to db
// We strongly recommend you to use Sequelize - Migrations to create or migrate database.
// This code should only be used in development.
// {app_root}/app.js
module.exports = app => {
  // if (app.config.env === 'local' || app.config.env === 'unittest') {
  //   app.beforeStart(async () => {
  //     await app.model.sync({ force: true });
  //   });
  // }
  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');

  app.passport.verify(async (ctx, user) => {
    console.log('----------------------------------------',user)
    // 检查用户
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');

    // 从数据库中查找用户信息
    //
    // Authorization Table
    // column   | desc
    // ---      | --
    // provider | provider name, like github, twitter, facebook, weibo and so on
    // uid      | provider unique id
    // user_id  | current application user id
    // const auth = await ctx.model.Authorization.findOne({
    //   uid: user.id,
    //   provider: user.provider,
    // });
    // const existsUser = await ctx.model.User.findOne({ id: auth.user_id });
    // if (existsUser) {
    //   return existsUser;
    // }
    // // 调用 service 注册新用户
    // const newUser = await ctx.service.user.register(user);
    // return newUser;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
  // 处理 user
  // ...
  // return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
  // 处理 user
  // ...
  // return user;
  });
};

