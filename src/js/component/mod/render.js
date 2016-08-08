/*
import base from '../core/base';
import button from './button';
import shade from './shade';
*/
const base = require('../core/base');
const button = require('./button');
const shade = require('./shade');

const isString = base.isType('String');

function renderDOM(opts){

  let title = opts.title,
      DOM = opts.DOM,
      doc = opts.doc,
      type = isString(opts.type) ? opts.type:'',
      _content = opts.content,
      content = isString(_content) ? _content:'',
      isContentObj = false,
      titleTemp, iconTemp, wrapDOM, html='';

  if (title && isString(title)) {
      titleTemp = function(){
        let titTemp = '';
        titTemp = `<div class="${DOM.title}"${opts.drag ? 'style="cursor:move"':''}>${title}</div>`;
        if (!opts.showClose) {
          return titTemp;
        }else{
          titTemp += `<div class="boxdialog-close-box"><a href="javascript:;" class="${DOM.close}">\xd7</a></div>`;
        }
        return titTemp;
    }();
  }
  //判断传入的DOM对象
  if (!content&&_content&&_content.nodeType === 1) {
      var oldDis = _content.style.display, prev = _content.previousSibling, next = _content.nextSibling, parent = _content.parentNode;

      opts.eleBack = function(){
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
  wrapDOM.id = DOM.wrap+opts.index;
  wrapDOM.style.zIndex = opts.zIndex-1;
  wrapDOM.setAttribute('data-index',opts.index);

  const btnsTemp = button.renderDOM(opts)||'';
  iconTemp = isString(opts.icon) && (function(){ return `<em class="${DOM.icon} ${opts.icon}"></em>`;}());

  let contentPadding = opts.padding ? base.convert(opts.padding):'';
  contentPadding = contentPadding ? `style="padding:${contentPadding}px;"`:'';
  switch(type){

    case 'loading':
    loadingImg = '<img src="skins/icons/loading.gif">';
    html += `<div class="${DOM.wrap} ${DOM.wrap}-loading">${titleTemp}
                <div class="${DOM.content}">${loadingImg}</div>
             </div>`;
    break;

    default:
    html += `<div class="${DOM.wrap}${opts.className ? ' '+opts.className:''}" style="z-index:${opts.zIndex};">
              ${titleTemp}
              <div class="${DOM.content}${isString(opts.icon) ? ' '+DOM.icon+'-true':''}"${contentPadding}>${iconTemp?iconTemp:''}${content}</div>
              ${btnsTemp}
            </div>`;
    break;
  }
  html += shade(opts);
  wrapDOM.innerHTML = html;
  doc.body.appendChild(wrapDOM);

  if (isContentObj) {
    wrapDOM.querySelector('.'+DOM.content).appendChild(_content);
    _content.style.display='block';
  }

}
module.exports = renderDOM;
