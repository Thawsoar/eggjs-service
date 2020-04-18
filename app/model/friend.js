'use strict';

const db = require('../db');
module.exports = app => {
  const { UUID, STRING } = app.Sequelize;
  const Friend = db.defineModel(app, 'friend', {
    user_id: {
      type: UUID,
      allowNull: false,
      comment: '用户ID',
    },
    user_friend_id: {
      type: UUID,
      allowNull: false,
      comment: '好友ID',
    },
    user_note: {
      type: STRING(20),
      comment: '好友备注',
    },
    user_status: {
      type: STRING(20),
      comment: '好友状态',
    },
  });

  return Friend;
};
