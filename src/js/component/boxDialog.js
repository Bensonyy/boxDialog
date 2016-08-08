/*!
 * @author   yongbingzhang@Ctrip
 * boxDialog 通用弹窗组件
 * @param    {object} root
 * @param    {function}       立即执行的函数
 * @return   {object}         boxDialog 对象
*/

;(function(root, factory) {
  if (typeof define === "function") {
    define(function() {
      return factory(root);
    });
  } else {
    factory(root);
  }
}(typeof window !== "undefined" ? window : this, function(root) {

  const version = '2.0';
  let boxDialog = boxDialog || {};
  let list = list || []; //存储所有弹窗索引

  const config = require('./core/config');
  const base = require('./core/base');
  const Dialog = require('./mod/index');
  const closeMixin = require('./mod/close');

  const isString = base.isType('String');
  const isNumber = base.isType('Number');
  const isFunction = base.isType('Function');
  const configs = config.config;
  const DOM = config.DOM;

  /******************************************各种快捷操作**************************************/

  // 脱离实例的关闭单个弹窗
  function close(index) {
    if (!arguments.length) {
      closeMixin(list);
      return;
    }
    if (index && isNumber(index)) {
      closeMixin(index);
    }
  };

  // 脱离实例的关闭全部弹窗
  function closeAll() {
    closeMixin(list, true);
  }

  /**
   * 信息提示，如: 成功 or 失败，2秒后自动关闭
   * @param {String}   title 	  提示标题
   * @param {String}   content   提示标题
   * @param {Number}   sec   	  几秒后消失
   */
  function msg(title, content, icon, sec) {
    sec = isNumber(sec) ? sec : 2;
    title = isString(title) ? title : configs.title;
    content = isString(content) ? content : configs.content;

    switch (icon) {
      case 'success':
        icon = 'success';
        break;

      case 'failure':
        icon = 'failure';
        break;

      case 'warning':
        icon = 'warning';
        break;

      case 'question':
        icon = 'question';
        break;

      default:
        icon = null;
        break;
    }

    dialog({
      title: title,
      content: content,
      icon: icon,
      time: sec,
      button: false
    });

  };

  /**
   * 模拟原生 alert 效果
   * @param {String}    content   提示信息
   * @param {callback}  callback  确定按钮回调函数
   * @param {String}    w         alert 宽
   */
  function alert(content, callback, w) {
    w = w ? w : '198px';
    content = isString(content) ? content : configs.content;
    callback = isFunction(callback) ? callback : null;
    dialog({
      content: content,
      okCallback: callback,
      size: [w],
      button: {
        ok: {
          callback: callback
        },
        cancel: false
      }
    });
  };

  /******************************************end 各种快捷操作**************************************/

  // dialog入口
  function dialog(options) {
    const d = new Dialog(options, list);
    return d;
  };

  //对外暴露
  boxDialog = {
    version: version,
    open: dialog,
    close: close,
    closeAll: closeAll,
    msg: msg,
    alert: alert,
    list: list
  };

  // jquery 方法调用
  if (root.$) {
    $.boxDialog = function(options) {
      dialog(options);
    }
    if ($.fn) {
      $.fn.boxDialog = $.boxDialog;
    }
  }

  root.boxDialog = boxDialog;

  return boxDialog;
}));
