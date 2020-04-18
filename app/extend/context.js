'use strict';

module.exports = {
  //  this 就是ctx对象，在其中可以调用ctx上的其他方法，或访问属性
  getIp() {
    return this.request.ip;
  },
  getHost() {
    return this.request.host;
  },
};
