'use strict';

/** @type Egg.EggPlugin */

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};


exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

// 配置 egg-passport-github 插件
exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};
