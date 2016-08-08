/*
import base from '../core/base';
import button from './button';
import remove from './remove';
import drag from './drag';
import resize from './resize';
*/
const base = require('../core/base');
const button = require('./button');
const remove = require('./remove');
const drag = require('./drag');
const resize = require('./resize');

const isFunction = base.isType('Function');
const isArray = base.isType('Array');
let handlerResize = null;
let listeners = {};

function addListeners(opts) {
  const wrap = opts.wrap,
    doc = opts.doc,
    wrapObj = doc.getElementById(wrap),
    DOM = opts.DOM,
    index = opts.index;

  const that = this;
  const handlerEvent = function(e) {
    const target = base.getTarget(e),
      targetNode = target.nodeName.toLowerCase(),
      dataTitle = target.getAttribute('data-title');

    if (opts.showClose) {
      if (targetNode == 'a' && target.className == DOM.close) {
        remove.call(that, opts);
      }
    }
    if (dataTitle && targetNode == 'button') {
      const cb = button.listeners[dataTitle];
      if (cb && isFunction(cb)) {
        cb.call(that, index)===false ? that : remove.call(that, opts);
      } else {
        remove.call(that, opts);
      }
    }

  };

  base.addEvent(wrapObj, 'click', handlerEvent);

  //初始化成功，回调存在就执行
  isFunction(opts.init) && opts.init.call(that, index);

  //拖拽参数为 true 时执行
  opts.drag && drag(opts);

  //参数为 true, 窗口改变时执行
  if (opts.resize) {
    const left = wrapObj.offsetLeft,
          top = wrapObj.offsetTop;
    opts.oldOffset = [left,top];
    opts.oldWindowSize = base.getWindowSize()||[];
    handlerResize = function() {
      resize(opts);
    };
    base.addEvent(window, 'resize', handlerResize);
  }

};

listeners = {
  addListeners: addListeners,
  handlerResize: handlerResize
};


module.exports = listeners;
