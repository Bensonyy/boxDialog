//import base from '../core/base';
const base = require('../core/base');

//拖拽
function drag(opts) {
  const index = opts.index,
    DOM = opts.DOM,
    doc = opts.doc,
    wrap = opts.wrap,
    wrapObj = doc.getElementById(wrap);

  if (!wrapObj) {
    return;
  }
  const titleObj = wrapObj.querySelector('.' + DOM.title)
  const wrapStyle = wrapObj.style;


  const windowSize = base.getWindowSize();
  let offsetW, offsetH, disClientW, disClientH;
  offsetW = wrapObj.offsetWidth;
  offsetH = wrapObj.offsetHeight;
  disClientW = windowSize[0] - offsetW;
  disClientH = windowSize[1] - offsetH;


  titleObj.onmousedown = function(e) {
    e = base.getEvent(e);
    base.preventDefault(e);

    let disX = 0,
      disY = 0;

    disX = e.clientX - wrapObj.offsetLeft;
    disY = e.clientY - wrapObj.offsetTop;

    doc.onmousemove = function(e) {
      e = base.getEvent(e);
      base.preventDefault(e);

      let X, Y;
      X = e.clientX - disX;
      Y = e.clientY - disY;
      X = (X > 0) ? X : 0;
      X = (X > disClientW) ? disClientW : X;
      Y = (Y > 0) ? Y : 0;
      Y = (Y > disClientH) ? disClientH : Y;
      wrapStyle.left = X + 'px';
      wrapStyle.top = Y + 'px';

    };

    doc.onmouseup = function() {
      base.preventDefault(e);
      doc.onmousemove = null;
      doc.onmouseup = null;
    };

  };

};



module.exports = drag;
