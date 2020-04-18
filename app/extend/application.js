'use strict';

module.exports = {
  // this就是app对象 可以调用app上的其他方法或访问属性
  getConfig() {
    console.log(this);
    return this.config;
  },
};
