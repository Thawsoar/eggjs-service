'use strict';

const db = require('../db');

module.exports = app => {
  const { UUID, TEXT, INTEGER, DATE } = app.Sequelize;
  const Article = db.defineModel(app, 'article', {
    user_id: {
      type: UUID,
      comment: '用户ID',
    },
    title: {
      type: TEXT,
      comment: '文章标题',
    },
    description: {
      type: TEXT,
      comment: '文章简介',
    },
    content: {
      type: TEXT,
      comment: '文章内容',
    },
    views: {
      type: INTEGER(20),
      comment: '浏览量',
    },
    comment: {
      type: INTEGER(20),
      comment: '评论总数',
    },
    date: {
      type: DATE,
      comment: '发表时间',
    },
    like_count: {
      type: INTEGER(20),
      comment: '点赞数量',
    },
  });

  Article.associate = () => {
    // 定义多对多关联
    Article.belongsToMany(app.model.Label, {
      // 中间表的model
      through: app.model.SetArtitleLabel,
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'setArtitleLabel',
      // 是否采用外键进行物理关联
      constraints: false,
    });
    // 这里如果一个模型和多个模型都有关联关系的话，关联关系需要统一定义在这里
  };
  return Article;
};
