/*import {
  config, DOM
}
from '../core/config';
import base  from '../core/base';
import listeners from './listeners';
*/

const config = require('../core/config');
const base = require('../core/base');
const listeners = require('./listeners');

const isFunction = base.isType('Function');

function remove(opts) {
  const index = opts.index,
    wrap = opts.wrap,
    doc = opts.doc,
    list = opts.list,
    isArray = base.isType('Array'),
    wrapObj = doc.getElementById(wrap);

  if (!wrapObj) {
    return;
  }
  let parentNode = null;
  parentNode = wrapObj.parentNode ? wrapObj.parentNode : doc.body;
  parentNode.removeChild(wrapObj);

  if (opts.close && isFunction(opts.close)) {
    opts.close.call(this, index);
  }

  if (list && isArray(list)) {
    for (let l = list.length-1; l >= 0; l--) {
      if (list[l] == index) {
        list.splice(l, 1);
        break;
      }
    }
  }

  //如果是DOM对象，关闭窗口要复原
  if (opts.isContentObj&&opts.eleBack) {
      opts.eleBack();
  }

  opts = null;

  listeners.handlerResize && base.removeEvent(window, 'resize', listeners.handlerResize);
};

module.exports = remove;
