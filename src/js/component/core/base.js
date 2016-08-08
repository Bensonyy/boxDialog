let base = {};

base = {
  /**
   * 数据类型检测
   * @param  {string}  type  类型如：Function,String,Number 等
   * @return {function}      [description]
   */
  isType: function(type) {
    return function(obj) {
      return {}.toString.call(obj) === '[object ' + type + ']';
    }
  },

  /**
   * 深、浅拷贝对象
   * @param  {object} a 覆盖对象
   * @param  {object} b 目标对象
   * @return {object}   新对象
   */
  extend: function() {
    const arr = [].slice.call(arguments);
    const arrLen = arr.length;
    const isBoolean = base.isType('Boolean');
    const arr0 = arr[0];

    //arr[0]==true 为深拷贝
    if (!arrLen) {
      return {};
    }

    let ret = {};
    const isObject = base.isType('Object');

    let _i = isBoolean(arr0) ? 1 : 0;
    for (let i = arrLen-1; i >= _i; i--) {
      if (isObject(arr[i])) {
        _extend(arr[i], ret);
      }
    }

    function _extend(a, b) {
      for (let key in a) {
        if (!b.hasOwnProperty(key)) {
          b[key] = a[key];
        }
        if ( isBoolean(arr0)&&arr0 && isObject(a[key])) {
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
  convert: function(value, max) {
    const reg = /^\d+%$/;
    const isNumber = base.isType('Number');
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
  getWindowSize: function() {

    let width, height;
    //宽
    if (window.innerWidth) { //兼容火狐, 谷歌, safari等浏览器
      width = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) { //兼容IE浏览器
      width = document.documentElement.clientWidth;
    }else {
      width = document.body.clientWidth;
    }

    //高
    if (window.innerHeight) {
      height = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
      height = document.documentElement.clientHeight;
    }else {
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
  addEvent: function(element, type, fn) {
    var _addEvent = null;
    if (element.addEventListener) {
        _addEvent = function(element, type, fn){
        element.addEventListener(type, fn, false);
      }
    } else {
      if (element.attachEvent) {
        _addEvent = function(element, type, fn){
          element.attachEvent('on' + type, fn);
        }
      } else {
        _addEvent = function(element, type, fn){
          element['on' + type] = fn;
        }
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
  removeEvent: function(element, type, fn) {
    var _removeEvent = null;
    if (element.removeEventListener) {
      _removeEvent = function(element, type, fn){
        element.removeEventListener(type, fn, false);
      }
    } else {
      if (element.detachEvent) {
        _removeEvent = function(element, type, fn){
          element.detachEvent('on' + type, fn);
        }
      } else {
        _removeEvent = function(element, type, fn){
          element['on' + type] = null;
        }
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
  getEvent: function(e) {
    return e ? e : window.event;
  },
  getTarget: function(e) {
    return e.target || e.srcElement;
  },
  preventDefault: function(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return e;
  },
  stopPropagation: function(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    return e;
  }

}
module.exports = base;
