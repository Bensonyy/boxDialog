//import base from '../core/base';
const base = require('../core/base');

/**
 * 窗口重置
 * @param  {Object} opts          参数
 * @param  {Array} oldWindowSize  窗口改变前 window 宽、高
 * @param  {Array} oldOffset      窗口改变前 offsetLeft、 offsetTop
 */
function resize(opts) {
  let index = opts.index,
    doc = opts.doc,
    wrap = opts.wrap,
    wrapObj = doc.getElementById(wrap),
    wrapStyle = wrapObj && wrapObj.style,
    oldWindowSize = opts.oldWindowSize, oldOffset = opts.oldOffset,
    newWindowSize = base.getWindowSize(),
    _reset, _timer;

  if (!wrapObj || !wrapStyle) {
    return;
  }

  _timer && clearTimeout(_timer);

  _timer = setTimeout(function() {
    _reset();
  }, 100);

  _reset = function() {
    let lX, tY, newOffsetLeft, newOffsetTop;

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
      wrapStyle.left = newOffsetLeft+'px';
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
