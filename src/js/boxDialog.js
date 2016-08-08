/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	/*!
	 * @author   yongbingzhang@Ctrip
	 * boxDialog 通用弹窗组件
	 * @param    {object} root
	 * @param    {function}       立即执行的函数
	 * @return   {object}         boxDialog 对象
	*/
	
	;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return factory(root);
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    factory(root);
	  }
	})(typeof window !== "undefined" ? window : undefined, function (root) {
	
	  var version = '2.0';
	  var boxDialog = boxDialog || {};
	  var list = list || []; //存储所有弹窗索引
	
	  var config = __webpack_require__(1);
	  var base = __webpack_require__(2);
	  var Dialog = __webpack_require__(3);
	  var closeMixin = __webpack_require__(12);
	
	  var isString = base.isType('String');
	  var isNumber = base.isType('Number');
	  var isFunction = base.isType('Function');
	  var configs = config.config;
	  var DOM = config.DOM;
	
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
	    var d = new Dialog(options, list);
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
	    $.boxDialog = function (options) {
	      dialog(options);
	    };
	    if ($.fn) {
	      $.fn.boxDialog = $.boxDialog;
	    }
	  }
	
	  root.boxDialog = boxDialog;
	
	  return boxDialog;
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	//可使用的 boxDialog 参数
	var config = {
	  type: 'dialog', //默认普通对话框
	  title: '消息', // 标题, 默认'消息'.
	  content: '欢迎使用boxDialog弹窗组件！', // 弹窗主内容.
	  size: ['20px', '10px'], // 内容宽、高
	  showClose: true, // 弹窗的右上角关闭按钮是否显示，默认显示.
	  className: null, // {string}     自定义弹窗最外层class.
	  padding: '20px', //主内容区默认内边距
	  icon: null, // 图标名称,字符串,如: icon:'success'.
	  time: null, // 自动关闭时间, 单位秒.
	  fixed: true, // 是否固定位置, 默认true固定位置.
	  zIndex: 20150326, // 弹窗的堆叠顺序.
	  drag: false, // 拖拽开关, 默认关闭.
	  resize: true, // 窗口改变, 调整弹窗位置.
	  position: null, // X,Y轴坐标,不设置默认居中，设置如：{left:'100px',top:'100px'}，4个参数分别表示位置：左，上，右，下，原理取于css语法的left、top、right、bottom.
	  shade: { // 遮罩层默认显示, 设置shade:false, 不显示遮罩.
	    background: '#000', // 遮罩层背景色, 默认黑色.
	    opacity: 0.8 },
	  // 遮罩层透明度, 默认0.8.
	  button: {
	    ok: {
	      text: '确定', // 按钮文本 '确定', 默认
	      className: 'active',
	      callback: null // {function}   点击确定按钮执行的回调函数.
	    },
	    cancel: {
	      text: '取消', // 按钮文本 '取消', 默认
	      className: null,
	      callback: null // {function}   点击取消按钮执行的回调函数.
	    } /*,
	      varBtn3: {
	       text: '按钮3', // 自定义 button
	       className: null,
	       callback: null
	      }*/
	  },
	  init: null, // {function}   初始化成功执行的回调函数.
	  close: null // {function}   弹窗关闭执行的回调函数.
	};
	
	//缓存 DOM 节点
	var DOM = {
	  wrap: 'box-dialog',
	  title: 'boxdialog-title',
	  content: 'boxdialog-content',
	  close: 'boxdialog-close',
	  btns: 'boxdialog-btns',
	  button: 'boxdialog-btn',
	  buttonActive: 'active',
	  shade: 'box-dialog-shade',
	  icon: 'boxdialog-icon',
	  topActive: 'box-dialog-active',
	  iframe: 'boxdialog-iframe'
	};
	/*
	export {
	  config, DOM
	};
	*/
	module.exports = {
	  config: config,
	  DOM: DOM
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var base = {};
	
	base = {
	  /**
	   * 数据类型检测
	   * @param  {string}  type  类型如：Function,String,Number 等
	   * @return {function}      [description]
	   */
	  isType: function isType(type) {
	    return function (obj) {
	      return {}.toString.call(obj) === '[object ' + type + ']';
	    };
	  },
	
	  /**
	   * 深、浅拷贝对象
	   * @param  {object} a 覆盖对象
	   * @param  {object} b 目标对象
	   * @return {object}   新对象
	   */
	  extend: function extend() {
	    var arr = [].slice.call(arguments);
	    var arrLen = arr.length;
	    var isBoolean = base.isType('Boolean');
	    var arr0 = arr[0];
	
	    //arr[0]==true 为深拷贝
	    if (!arrLen) {
	      return {};
	    }
	
	    var ret = {};
	    var isObject = base.isType('Object');
	
	    var _i = isBoolean(arr0) ? 1 : 0;
	    for (var i = arrLen - 1; i >= _i; i--) {
	      if (isObject(arr[i])) {
	        _extend(arr[i], ret);
	      }
	    }
	
	    function _extend(a, b) {
	      for (var key in a) {
	        if (!b.hasOwnProperty(key)) {
	          b[key] = a[key];
	        }
	        if (isBoolean(arr0) && arr0 && isObject(a[key])) {
	          _extend(a[key], b[key]);
	        }
	      }
	    };
	
	    return ret;
	  },
	
	  /**
	   * 单位换算
	   * @param  {string} value 要处理的单位值，如:'10px' 或者 '10%'
	   * @param  {number} max 	 最大值，如: window 宽或高
	   * @return {number} value 处理后的 value 值
	   */
	  convert: function convert(value, max) {
	    var reg = /^\d+%$/;
	    var isNumber = base.isType('Number');
	    if (!value) {
	      return;
	    }
	
	    if (isNumber(max) && reg.test(value)) {
	      value = max * value.split('%')[0] / 100;
	    }
	    value = parseInt(value, 10);
	    return value;
	  },
	  /**
	   * 获取浏览器窗口的宽高
	   * @return {array} 宽、高
	   */
	  getWindowSize: function getWindowSize() {
	
	    var width = void 0,
	        height = void 0;
	    //宽
	    if (window.innerWidth) {
	      //兼容火狐, 谷歌, safari等浏览器
	      width = window.innerWidth;
	    } else if (document.documentElement && document.documentElement.clientWidth) {
	      //兼容IE浏览器
	      width = document.documentElement.clientWidth;
	    } else {
	      width = document.body.clientWidth;
	    }
	
	    //高
	    if (window.innerHeight) {
	      height = window.innerHeight;
	    } else if (document.documentElement && document.documentElement.clientHeight) {
	      height = document.documentElement.clientHeight;
	    } else {
	      height = document.body.clientHeight;
	    }
	
	    return [width, height];
	  },
	  /**
	   * 绑定事件
	   * @param  {object}   element dom
	   * @param  {string}   type    事件名
	   * @param  {function} fn      回调函数
	   */
	  addEvent: function addEvent(element, type, fn) {
	    var _addEvent = null;
	    if (element.addEventListener) {
	      _addEvent = function _addEvent(element, type, fn) {
	        element.addEventListener(type, fn, false);
	      };
	    } else {
	      if (element.attachEvent) {
	        _addEvent = function _addEvent(element, type, fn) {
	          element.attachEvent('on' + type, fn);
	        };
	      } else {
	        _addEvent = function _addEvent(element, type, fn) {
	          element['on' + type] = fn;
	        };
	      }
	    }
	    _addEvent(element, type, fn);
	    this.addEvent = _addEvent;
	  },
	  /**
	   * 移除绑定的事件
	   * @param  {object}   element dom
	   * @param  {string}   type    事件名
	   * @param  {function} fn      回调函数
	   */
	  removeEvent: function removeEvent(element, type, fn) {
	    var _removeEvent = null;
	    if (element.removeEventListener) {
	      _removeEvent = function _removeEvent(element, type, fn) {
	        element.removeEventListener(type, fn, false);
	      };
	    } else {
	      if (element.detachEvent) {
	        _removeEvent = function _removeEvent(element, type, fn) {
	          element.detachEvent('on' + type, fn);
	        };
	      } else {
	        _removeEvent = function _removeEvent(element, type, fn) {
	          element['on' + type] = null;
	        };
	      }
	    }
	    _removeEvent(element, type, fn);
	    this.removeEvent = _removeEvent;
	  },
	  /**
	   * 事件对象
	   * @param  {object} e 事件对象
	   * @return {e}   兼容性的
	   */
	  getEvent: function getEvent(e) {
	    return e ? e : window.event;
	  },
	  getTarget: function getTarget(e) {
	    return e.target || e.srcElement;
	  },
	  preventDefault: function preventDefault(e) {
	    e.preventDefault ? e.preventDefault() : e.returnValue = false;
	    return e;
	  },
	  stopPropagation: function stopPropagation(e) {
	    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	    return e;
	  }
	
	};
	module.exports = base;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*import {
	  config, DOM
	}
	from '../core/config';
	import base from '../core/base';
	import renderDOM from './render';
	import position from './position';
	import listeners from './listeners';
	*/
	
	var config = __webpack_require__(1);
	var base = __webpack_require__(2);
	var renderDOM = __webpack_require__(4);
	var position = __webpack_require__(7);
	var listeners = __webpack_require__(8);
	var remove = __webpack_require__(9);
	
	var index = 0; //弹窗索引
	
	var isString = base.isType('String');
	var isObject = base.isType('Object');
	var isNumber = base.isType('Number');
	
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
	
	Dialog.prototype.init = function () {
	  var that = this,
	      opts = that.opts;
	  that.render();
	  that.setPosition();
	  that.addEvent();
	  that.opts.list.push(that.opts.index);
	
	  var time = opts.time;
	  if (time && isNumber(time)) {
	    that.autoClose(time);
	  }
	};
	
	Dialog.prototype.render = function () {
	  var opts = this.opts;
	  renderDOM(opts);
	  return this;
	};
	
	Dialog.prototype.setPosition = function () {
	  position(this.opts);
	  return this;
	};
	
	Dialog.prototype.addEvent = function () {
	  listeners.addListeners.call(this, this.opts);
	  return this;
	};
	
	Dialog.prototype.close = function () {
	  remove(this.opts);
	  return this;
	};
	
	//定时自动关闭
	Dialog.prototype.autoClose = function (sec) {
	  var that = this;
	  setTimeout(function () {
	    that.close();
	  }, 1000 * sec);
	  return that;
	};
	
	module.exports = Dialog;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	import base from '../core/base';
	import button from './button';
	import shade from './shade';
	*/
	var base = __webpack_require__(2);
	var button = __webpack_require__(5);
	var shade = __webpack_require__(6);
	
	var isString = base.isType('String');
	
	function renderDOM(opts) {
	
	  var title = opts.title,
	      DOM = opts.DOM,
	      doc = opts.doc,
	      type = isString(opts.type) ? opts.type : '',
	      _content = opts.content,
	      content = isString(_content) ? _content : '',
	      isContentObj = false,
	      titleTemp = void 0,
	      iconTemp = void 0,
	      wrapDOM = void 0,
	      html = '';
	
	  if (title && isString(title)) {
	    titleTemp = function () {
	      var titTemp = '';
	      titTemp = '<div class="' + DOM.title + '"' + (opts.drag ? 'style="cursor:move"' : '') + '>' + title + '</div>';
	      if (!opts.showClose) {
	        return titTemp;
	      } else {
	        titTemp += '<div class="boxdialog-close-box"><a href="javascript:;" class="' + DOM.close + '">×</a></div>';
	      }
	      return titTemp;
	    }();
	  }
	  //判断传入的DOM对象
	  if (!content && _content && _content.nodeType === 1) {
	    var oldDis = _content.style.display,
	        prev = _content.previousSibling,
	        next = _content.nextSibling,
	        parent = _content.parentNode;
	
	    opts.eleBack = function () {
	      if (prev && prev.parentNode) {
	        prev.parentNode.insertBefore(_content, prev.nextSibling);
	      } else if (next && next.parentNode) {
	        next.parentNode.insertBefore(_content, next);
	      } else if (parent) {
	        parent.appendChild(_content);
	      }
	      _content.style.display = oldDis;
	    };
	    isContentObj = true;
	    opts.isContentObj = isContentObj;
	  }
	
	  //创建 DOM
	  wrapDOM = doc.createElement('div');
	  wrapDOM.id = DOM.wrap + opts.index;
	  wrapDOM.style.zIndex = opts.zIndex - 1;
	  wrapDOM.setAttribute('data-index', opts.index);
	
	  var btnsTemp = button.renderDOM(opts) || '';
	  iconTemp = isString(opts.icon) && function () {
	    return '<em class="' + DOM.icon + ' ' + opts.icon + '"></em>';
	  }();
	
	  var contentPadding = opts.padding ? base.convert(opts.padding) : '';
	  contentPadding = contentPadding ? 'style="padding:' + contentPadding + 'px;"' : '';
	  switch (type) {
	
	    case 'loading':
	      loadingImg = '<img src="skins/icons/loading.gif">';
	      html += '<div class="' + DOM.wrap + ' ' + DOM.wrap + '-loading">' + titleTemp + '\n                <div class="' + DOM.content + '">' + loadingImg + '</div>\n             </div>';
	      break;
	
	    default:
	      html += '<div class="' + DOM.wrap + (opts.className ? ' ' + opts.className : '') + '" style="z-index:' + opts.zIndex + ';">\n              ' + titleTemp + '\n              <div class="' + DOM.content + (isString(opts.icon) ? ' ' + DOM.icon + '-true' : '') + '"' + contentPadding + '>' + (iconTemp ? iconTemp : '') + content + '</div>\n              ' + btnsTemp + '\n            </div>';
	      break;
	  }
	  html += shade(opts);
	  wrapDOM.innerHTML = html;
	  doc.body.appendChild(wrapDOM);
	
	  if (isContentObj) {
	    wrapDOM.querySelector('.' + DOM.content).appendChild(_content);
	    _content.style.display = 'block';
	  }
	}
	module.exports = renderDOM;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//import base from '../core/base';
	var base = __webpack_require__(2);
	
	var isArray = base.isType('Array');
	var isObject = base.isType('Object');
	
	var listeners = {};
	var button = {};
	
	var renderDOM = function renderDOM(opts) {
	  var btns = opts.button && isObject(opts.button) ? opts.button : null;
	  var doc = document,
	      DOM = opts.DOM;
	
	  if (!btns) {
	    return;
	  }
	
	  var btnsTemp = '';
	
	  for (var i in btns) {
	    if (!isObject(btns[i])) {
	      return;
	    }
	    var className = DOM.button;
	    var iButton = btns[i];
	    var text = iButton.text;
	    if (!text) {
	      return;
	    }
	    var _button = '<button class="' + className + (iButton.className ? ' ' + iButton.className : '') + '" data-title="' + (text + '_' + i) + '" ' + (iButton.disabled ? disabled = "disabled" : '') + '>' + text + '</button>';
	    listeners[text + '_' + i] = iButton.callback;
	    btnsTemp += _button;
	  }
	
	  return '<div class="' + DOM.btns + '">' + btnsTemp + '</div>';
	};
	
	button.listeners = listeners;
	button.renderDOM = renderDOM;
	
	module.exports = button;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// 遮罩层处理
	function shade(opts) {
	  var doc = opts.doc;
	  var DOM = opts.DOM;
	
	  var shadeWrap = '',
	      style = '';
	  if (!opts.shade) {
	    return;
	  }
	  style = 'opacity:' + opts.shade.opacity + ';z-index:' + (opts.zIndex - 1) + ';background-color:' + opts.shade.background + ';';
	  shadeWrap = '<div id="' + (DOM.shade + opts.index) + '" class="' + DOM.shade + '" style="' + style + '"></div>';
	  return shadeWrap;
	}
	
	module.exports = shade;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//import base from '../core/base';
	var base = __webpack_require__(2);
	
	function setPosition(opts) {
	
	  var cssText = null,
	      isFixed = void 0,
	      zIndex = void 0,
	      width = void 0,
	      height = void 0,
	      left = void 0,
	      top = void 0,
	      right = void 0,
	      bottom = void 0;
	
	  var doc = opts.doc,
	      wrap = opts.wrap,
	      DOM = opts.DOM,
	      wrapObj = doc.getElementById(wrap),
	      wrapStyle = wrapObj.style,
	      wrapCssText = wrapStyle.cssText,
	      pos = opts.position;
	
	  isFixed = opts.fixed ? 'fixed' : 'absolute';
	
	  zIndex = opts.zIndex;
	
	  if (pos && isObject(pos)) {
	    left = pos.left ? pos.left : '';
	    top = pos.top ? pos.top : '';
	    right = pos.right ? pos.right : '';
	    bottom = pos.bottom ? pos.bottom : '';
	  }
	
	  var convert = base.convert;
	  var windowSize = base.getWindowSize();
	  var wrapSize = opts.size;
	  var horizStyle = '',
	      verticalStyle = '',
	      wrapSizeWidth = '',
	      wrapSizeHeight = '',
	      wrapSizeValue = '';
	
	  if (left && !right) {
	    left = convert(left);
	    horizStyle += 'left:' + left + 'px;';
	  } else if (right && !left) {
	    right = convert(right);
	    horizStyle += 'right:' + right + 'px;';
	  } else {
	    wrapSizeWidth = convert(wrapSize[0]);
	    left = parseInt((windowSize[0] - wrapSizeWidth) / 2, 10);
	    horizStyle += 'left:' + left + 'px;';
	  }
	
	  wrapSizeValue += 'width:' + wrapSizeWidth + 'px;';
	
	  if (top && !bottom) {
	    top = convert(top);
	    verticalStyle += 'top:' + top + 'px;';
	  } else if (bottom && !top) {
	    bottom = convert(bottom);
	    verticalStyle += 'bottom:' + bottom + 'px;';
	  } else {
	    wrapSizeHeight = wrapSize[1] ? convert(wrapSize[1]) : wrapObj.offsetHeight;
	    top = parseInt((windowSize[1] - wrapSizeHeight) / 2, 10);
	    verticalStyle += 'top:' + top + 'px;';
	  }
	
	  wrapSizeValue = !wrapSize[1] ? wrapSizeValue : wrapSizeValue + (';height:' + wrapSizeHeight + 'px;');
	
	  cssText = wrapSizeValue + 'position:' + isFixed + ';' + horizStyle + ';' + verticalStyle + ';';
	
	  if (!!wrapCssText) {
	    wrapCssText += ';' + cssText;
	    wrapStyle.cssText = wrapCssText;
	  } else {
	    wrapStyle.cssText = cssText;
	  }
	};
	
	module.exports = setPosition;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	import base from '../core/base';
	import button from './button';
	import remove from './remove';
	import drag from './drag';
	import resize from './resize';
	*/
	var base = __webpack_require__(2);
	var button = __webpack_require__(5);
	var remove = __webpack_require__(9);
	var drag = __webpack_require__(10);
	var resize = __webpack_require__(11);
	
	var isFunction = base.isType('Function');
	var isArray = base.isType('Array');
	var handlerResize = null;
	var listeners = {};
	
	function addListeners(opts) {
	  var wrap = opts.wrap,
	      doc = opts.doc,
	      wrapObj = doc.getElementById(wrap),
	      DOM = opts.DOM,
	      index = opts.index;
	
	  var that = this;
	  var handlerEvent = function handlerEvent(e) {
	    var target = base.getTarget(e),
	        targetNode = target.nodeName.toLowerCase(),
	        dataTitle = target.getAttribute('data-title');
	
	    if (opts.showClose) {
	      if (targetNode == 'a' && target.className == DOM.close) {
	        remove.call(that, opts);
	      }
	    }
	    if (dataTitle && targetNode == 'button') {
	      var cb = button.listeners[dataTitle];
	      if (cb && isFunction(cb)) {
	        cb.call(that, index) === false ? that : remove.call(that, opts);
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
	    var left = wrapObj.offsetLeft,
	        top = wrapObj.offsetTop;
	    opts.oldOffset = [left, top];
	    opts.oldWindowSize = base.getWindowSize() || [];
	    handlerResize = function handlerResize() {
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*import {
	  config, DOM
	}
	from '../core/config';
	import base  from '../core/base';
	import listeners from './listeners';
	*/
	
	var config = __webpack_require__(1);
	var base = __webpack_require__(2);
	var listeners = __webpack_require__(8);
	
	var isFunction = base.isType('Function');
	
	function remove(opts) {
	  var index = opts.index,
	      wrap = opts.wrap,
	      doc = opts.doc,
	      list = opts.list,
	      isArray = base.isType('Array'),
	      wrapObj = doc.getElementById(wrap);
	
	  if (!wrapObj) {
	    return;
	  }
	  var parentNode = null;
	  parentNode = wrapObj.parentNode ? wrapObj.parentNode : doc.body;
	  parentNode.removeChild(wrapObj);
	
	  if (opts.close && isFunction(opts.close)) {
	    opts.close.call(this, index);
	  }
	
	  if (list && isArray(list)) {
	    for (var l = list.length - 1; l >= 0; l--) {
	      if (list[l] == index) {
	        list.splice(l, 1);
	        break;
	      }
	    }
	  }
	
	  //如果是DOM对象，关闭窗口要复原
	  if (opts.isContentObj && opts.eleBack) {
	    opts.eleBack();
	  }
	
	  opts = null;
	
	  listeners.handlerResize && base.removeEvent(window, 'resize', listeners.handlerResize);
	};
	
	module.exports = remove;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//import base from '../core/base';
	var base = __webpack_require__(2);
	
	//拖拽
	function drag(opts) {
	  var index = opts.index,
	      DOM = opts.DOM,
	      doc = opts.doc,
	      wrap = opts.wrap,
	      wrapObj = doc.getElementById(wrap);
	
	  if (!wrapObj) {
	    return;
	  }
	  var titleObj = wrapObj.querySelector('.' + DOM.title);
	  var wrapStyle = wrapObj.style;
	
	  var windowSize = base.getWindowSize();
	  var offsetW = void 0,
	      offsetH = void 0,
	      disClientW = void 0,
	      disClientH = void 0;
	  offsetW = wrapObj.offsetWidth;
	  offsetH = wrapObj.offsetHeight;
	  disClientW = windowSize[0] - offsetW;
	  disClientH = windowSize[1] - offsetH;
	
	  titleObj.onmousedown = function (e) {
	    e = base.getEvent(e);
	    base.preventDefault(e);
	
	    var disX = 0,
	        disY = 0;
	
	    disX = e.clientX - wrapObj.offsetLeft;
	    disY = e.clientY - wrapObj.offsetTop;
	
	    doc.onmousemove = function (e) {
	      e = base.getEvent(e);
	      base.preventDefault(e);
	
	      var X = void 0,
	          Y = void 0;
	      X = e.clientX - disX;
	      Y = e.clientY - disY;
	      X = X > 0 ? X : 0;
	      X = X > disClientW ? disClientW : X;
	      Y = Y > 0 ? Y : 0;
	      Y = Y > disClientH ? disClientH : Y;
	      wrapStyle.left = X + 'px';
	      wrapStyle.top = Y + 'px';
	    };
	
	    doc.onmouseup = function () {
	      base.preventDefault(e);
	      doc.onmousemove = null;
	      doc.onmouseup = null;
	    };
	  };
	};
	
	module.exports = drag;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//import base from '../core/base';
	var base = __webpack_require__(2);
	
	/**
	 * 窗口重置
	 * @param  {Object} opts          参数
	 * @param  {Array} oldWindowSize  窗口改变前 window 宽、高
	 * @param  {Array} oldOffset      窗口改变前 offsetLeft、 offsetTop
	 */
	function resize(opts) {
	  var index = opts.index,
	      doc = opts.doc,
	      wrap = opts.wrap,
	      wrapObj = doc.getElementById(wrap),
	      wrapStyle = wrapObj && wrapObj.style,
	      oldWindowSize = opts.oldWindowSize,
	      oldOffset = opts.oldOffset,
	      newWindowSize = base.getWindowSize(),
	      _reset = void 0,
	      _timer = void 0;
	
	  if (!wrapObj || !wrapStyle) {
	    return;
	  }
	
	  _timer && clearTimeout(_timer);
	
	  _timer = setTimeout(function () {
	    _reset();
	  }, 100);
	
	  _reset = function _reset() {
	    var lX = void 0,
	        tY = void 0,
	        newOffsetLeft = void 0,
	        newOffsetTop = void 0;
	
	    lX = parseInt((oldWindowSize[0] - newWindowSize[0]) / 2, 10);
	    tY = parseInt((oldWindowSize[1] - newWindowSize[1]) / 2, 10);
	
	    if (lX) {
	      if (lX < 0) {
	        newOffsetLeft = Math.abs(lX) + oldOffset[0];
	      } else {
	        if (wrapObj.offsetWidth > newWindowSize[0]) {
	          newOffsetLeft = 0;
	        } else {
	          newOffsetLeft = oldOffset[0] - lX;
	        }
	      }
	      wrapStyle.left = newOffsetLeft + 'px';
	    }
	    if (tY) {
	      if (tY < 0) {
	        newOffsetTop = Math.abs(tY) + oldOffset[1];
	      } else {
	        if (wrapObj.offsetHeight > newWindowSize[1]) {
	          newOffsetTop = 0;
	        } else {
	          newOffsetTop = oldOffset[1] - tY;
	        }
	      }
	      wrapStyle.top = newOffsetTop + 'px';
	    }
	
	    opts.oldWindowSize = newWindowSize;
	    opts.oldOffset = [newOffsetLeft, newOffsetTop];
	  };
	};
	
	//export default resize;
	module.exports = resize;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var config = __webpack_require__(1);
	var base = __webpack_require__(2);
	var isArray = base.isType('Array');
	var isBoolean = base.isType('Boolean');
	var isNumber = base.isType('Number');
	/**
	 * 关闭单个或者所有弹窗
	 * @param  {Array} list   所有弹窗口索引
	 * @param  {Boolean} bool true为关闭所有弹窗口
	 * @return {[type]}      [description]
	 */
	function close(list, bool) {
	  var DOM = config.DOM;
	  var wrap = DOM.wrap;
	  var closeBtn = DOM.close;
	
	  if (bool && isBoolean(bool)) {
	    if (list && isArray(list)) {
	      for (var i = 0, len = list.length; i < len; i++) {
	
	        var wrapObj = document.getElementById(wrap + i);
	        if (!wrapObj) {
	          continue;
	        }
	
	        var objCloseBtn = wrapObj.querySelector('.' + closeBtn);
	        if (objCloseBtn) {
	          objCloseBtn.click();
	        } else {
	          var parentNode = wrapObj.parentNode ? wrapObj.parentNode : document.body;
	          parentNode.removeChild(wrapObj);
	        }
	      }
	      list.length = 0;
	    }
	  } else {
	
	    var _wrapObj = null;
	
	    if (isArray(list) && list.pop()) {
	      _wrapObj = document.getElementById(wrap + pop);
	    } else if (list && isNumber(list)) {
	      _wrapObj = document.getElementById(wrap + list);
	    } else {
	      return;
	    }
	
	    if (!_wrapObj) {
	      return;
	    }
	
	    var _objCloseBtn = _wrapObj.querySelector('.' + closeBtn);
	    if (_objCloseBtn) {
	      _objCloseBtn.click();
	    } else {
	      var _parentNode = _wrapObj.parentNode ? _wrapObj.parentNode : document.body;
	      _parentNode.removeChild(_wrapObj);
	    }
	  }
	
	  return list;
	}
	
	module.exports = close;

/***/ }
/******/ ]);
//# sourceMappingURL=boxDialog.js.map