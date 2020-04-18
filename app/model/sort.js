'use strict';

const db = require('../db');
module.exports = app => {
  const { UUID, TEXT, STRING } = app.Sequelize;
  const Sort = db.defineModel(app, 'sort', {
    name: {
      type: STRING(20),
      comment: '分类名称',
    },
    alias: {
      type: STRING(15),
      comment: '分类别名',
    },
    description: {
      type: TEXT,
      comment: '分类描述',
    },
    parent_id: {
      type: UUID,
      allowNull: false,
      comment: '父分类ID',
    },
  });

  return Sort;
};
