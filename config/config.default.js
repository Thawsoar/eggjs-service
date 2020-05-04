/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583682818464_4268';

  // add your middleware config here
  config.middleware = [
    'robot', 'errorHandler',
  ];

  config.robot = {
    ua: [ /Baiduspider/i ],
  };

  config.errorHandler = {
    match: '/',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    api: 'http://www.phonegap100.com/',
    multipart: {
      mode: 'file',
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: [ '*' ],
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      credentials: true,
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: 3306,
        // 用户名
        user: 'root',
        // 密码
        password: 'password',
        // 数据库名
        database: 'egg-server',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'egg-server',
      username: 'root',
      password: 'password',
      operatorsAliases: false,
    },
    jwt: {
      enable: true,
      secret: 'taoxiang',
      match: '/jwt',
    },
    passportGithub: {
      user_info_url: 'https://api.github.com/user',
      access_token_url: 'https://github.com/login/oauth/access_token',
      key: 'fcbd10e83056c315fe90', // GitHub 分配的客户端 id
      secret: 'c13343ded612c7561d07e360dcdc70fcade98ecf', // GitHub 分配的客户端密钥
      callbackURL: '/passport/github/callback',
      // proxy: false, // 应用部署在 Nginx/HAProxy 之后，需设置插件 proxy 选项为 true
    },
    onerror: {
      // all(err, ctx) {
      //   // 在此处定义针对所有响应类型的错误处理方法
      //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      //   ctx.body = 'error';
      //   ctx.status = 500;
      // },
      // html(err, ctx) {
      //   // html hander
      //   ctx.body = '<h3>error</h3>';
      //   ctx.status = 500;
      // },
      // json(err, ctx) {
      //   // json hander
      //   ctx.body = { message: 'error' };
      //   ctx.status = 500;
      // },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
