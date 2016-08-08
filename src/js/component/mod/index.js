/*import {
  config, DOM
}
from '../core/config';
import base from '../core/base';
import renderDOM from './render';
import position from './position';
import listeners from './listeners';
*/

const config = require('../core/config');
const base = require('../core/base');
const renderDOM = require('./render');
const position = require('./position');
const listeners = require('./listeners');
const remove = require('./remove');


let index = 0; //弹窗索引

const isString = base.isType('String');
const isObject = base.isType('Object');
const isNumber = base.isType('Number');

/*
// es6 新特性打包后不兼容 ie8
class Dialog {

  constructor(options) {
    if (isString(options) || options.nodeType === 1) {
      options = {
        content: options
      };
    }

    this.optsOrigin = base.extend(true, config.config, options);
    this.opts = base.extend(this.optsOrigin);

    this.opts.index = ++index;
    this.active = false;
    this.opts.DOM = config.DOM;
    this.opts.wrap = config.DOM.wrap + this.opts.index;
    this.opts.shadeWrap = config.DOM.shade + this.opts.index;
    this.opts.doc = document;
    this.opts.zIndex += this.opts.index;

    this.init();
  }

  init() {
    this.render();
    this.setPosition();
    this.addEvent();
    list.push(this.opts.index);
  }

  render() {
    const opts = this.opts;
    renderDOM(opts);
    return this;
  }

  setPosition() {
    position(this.opts);
    return this;
  }

  addEvent() {
    listeners.addListeners.call(this, this.opts);
    return this;
  }
}
*/

function Dialog(options, list) {
  if (isString(options) || options.nodeType === 1) {
    options = {
      content: options
    };
  }

  this.optsOrigin = base.extend(true, config.config, options);
  this.opts = base.extend(this.optsOrigin);

  this.opts.index = ++index;
  this.opts.DOM = config.DOM;
  this.opts.wrap = config.DOM.wrap + this.opts.index;
  this.opts.shadeWrap = config.DOM.shade + this.opts.index;
  this.opts.doc = document;
  this.opts.zIndex += this.opts.index;
  this.opts.list = list;

  this.init();

}

Dialog.prototype.init = function() {
  const that = this,
    opts = that.opts;
  that.render();
  that.setPosition();
  that.addEvent();
  that.opts.list.push(that.opts.index);

  const time = opts.time;
  if (time && isNumber(time)) {
    that.autoClose(time);
  }
};

Dialog.prototype.render = function() {
  const opts = this.opts;
  renderDOM(opts);
  return this;
};

Dialog.prototype.setPosition = function() {
  position(this.opts);
  return this;
};

Dialog.prototype.addEvent = function() {
  listeners.addListeners.call(this, this.opts);
  return this;
};

Dialog.prototype.close = function() {
  remove(this.opts);
  return this;
};

//定时自动关闭
Dialog.prototype.autoClose = function(sec) {
  const that = this;
  setTimeout(function() {
    that.close();
  }, 1000 * sec);
  return that;
}


module.exports = Dialog;
