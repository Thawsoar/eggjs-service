'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 friend 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, UUID, BOOLEAN } = Sequelize;
    try {
      await queryInterface.createTable('friend_link', {
        id: {
          type: UUID,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: STRING,
        },
        url: {
          type: STRING,
        },
        img_url: {
          type: STRING,
        },
        desc: {
          type: STRING,
        },
        state: {
          type: BOOLEAN,
        },
        created_at: {
          type: DATE,
        },
        updated_at: {
          type: DATE,
        },
        version: {
          type: INTEGER(11),
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  // 在执行数据库降级时调用的函数，删除 friend_link 表
  down: async queryInterface => {
    await queryInterface.dropTable('friend_link');
  },
};
