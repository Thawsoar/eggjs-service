'use strict';

const db = require('../db');
module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize;
  try {
    const FriendLink = db.defineModel(app, 'friend_link', {
      name: {
        type: STRING(36),
        comment: '友链名称',
      },
      url: {
        type: STRING(255),
        comment: '友链地址',
      },
      img_url: {
        type: STRING(255),
        comment: '友链图片地址',
      },
      desc: {
        type: STRING(255),
        comment: '友链描述',
      },
      state: {
        type: BOOLEAN,
        comment: '状态',
      },
    });
    return FriendLink;

  } catch (error) {
    console.log(error);
  }
};
