// 遮罩层处理
function shade(opts) {
  const doc = opts.doc;
  const DOM = opts.DOM;

  let shadeWrap = '',style = '';
  if (!opts.shade) {
    return;
  }
  style = `opacity:${opts.shade.opacity};z-index:${opts.zIndex-1};background-color:${opts.shade.background};`;
  shadeWrap = `<div id="${DOM.shade + opts.index}" class="${DOM.shade}" style="${style}"></div>`
  return shadeWrap;
}

module.exports = shade;
