//import base from '../core/base';
const base = require('../core/base');

function setPosition(opts) {

  let cssText = null,
    isFixed, zIndex,
    width, height, left, top, right, bottom;

  let doc = opts.doc,
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

  const convert = base.convert;
  const windowSize = base.getWindowSize();
  const wrapSize = opts.size;
  let horizStyle='', verticalStyle='', wrapSizeWidth='', wrapSizeHeight='', wrapSizeValue='';

  if (left && !right) {
    left = convert(left);
    horizStyle += `left:${left}px;`;
  } else if (right && !left) {
    right = convert(right);
    horizStyle += `right:${right}px;`;
  } else {
    wrapSizeWidth = convert(wrapSize[0]);
    left = parseInt((windowSize[0] - wrapSizeWidth) / 2, 10);
    horizStyle += `left:${left}px;`;
  }

  wrapSizeValue += `width:${wrapSizeWidth}px;`;

  if (top && !bottom) {
    top = convert(top);
    verticalStyle += `top:${top}px;`;
  } else if (bottom && !top) {
    bottom = convert(bottom);
    verticalStyle += `bottom:${bottom}px;`;
  } else {
    wrapSizeHeight = wrapSize[1] ? convert(wrapSize[1]) : wrapObj.offsetHeight;
    top = parseInt((windowSize[1] - wrapSizeHeight) / 2, 10);
    verticalStyle += `top:${top}px;`;
  }

  wrapSizeValue = !wrapSize[1] ? wrapSizeValue : wrapSizeValue + `;height:${wrapSizeHeight}px;`;

  cssText =
    `${wrapSizeValue}position:${isFixed};${horizStyle};${verticalStyle};`;

  if (!!wrapCssText) {
    wrapCssText += ';' + cssText;
    wrapStyle.cssText = wrapCssText;
  } else {
    wrapStyle.cssText = cssText;
  }
};

module.exports = setPosition;
