const config = require('../core/config');
const base = require('../core/base');
const isArray = base.isType('Array');
const isBoolean = base.isType('Boolean');
const isNumber = base.isType('Number');
/**
 * 关闭单个或者所有弹窗
 * @param  {Array} list   所有弹窗口索引
 * @param  {Boolean} bool true为关闭所有弹窗口
 * @return {[type]}      [description]
 */
function close(list, bool) {
  const DOM = config.DOM;
  const wrap = DOM.wrap;
  const closeBtn = DOM.close;

  if (bool && isBoolean(bool)) {
    if (list && isArray(list)) {
      for (let i = 0, len = list.length; i < len; i++) {

        const wrapObj = document.getElementById(wrap + i);
        if (!wrapObj) {
          continue;
        }

        const objCloseBtn = wrapObj.querySelector('.' + closeBtn);
        if (objCloseBtn) {
          objCloseBtn.click();
        } else {
          let parentNode = wrapObj.parentNode ? wrapObj.parentNode : document.body;
          parentNode.removeChild(wrapObj);
        }
      }
      list.length = 0;
    }
  } else {

    let wrapObj = null;

    if (isArray(list) && list.pop()) {
      wrapObj = document.getElementById(wrap + pop);
    } else if (list && isNumber(list)) {
      wrapObj = document.getElementById(wrap + list);
    } else {
      return;
    }

    if (!wrapObj) {
      return;
    }

    const objCloseBtn = wrapObj.querySelector('.' + closeBtn);
    if (objCloseBtn) {
      objCloseBtn.click();
    } else {
      let parentNode = wrapObj.parentNode ? wrapObj.parentNode : document.body;
      parentNode.removeChild(wrapObj);
    }

  }

  return list;
}

module.exports = close;
