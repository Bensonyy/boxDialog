//import base from '../core/base';
const base = require('../core/base');

const isArray = base.isType('Array');
const isObject = base.isType('Object');

let listeners = {};
let button = {};

let renderDOM = function(opts) {
  const btns = opts.button && isObject(opts.button) ? opts.button : null;
  const doc = document, DOM = opts.DOM;

  if (!btns) {
    return;
  }

  let btnsTemp = '';

  for (let i in btns) {
    if (!isObject(btns[i])) {
      return;
    }
    let className = DOM.button;
    const iButton = btns[i];
    const text = iButton.text;
    if (!text) {
      return;
    }
    const button =
      `<button class="${className}${iButton.className ? ' '+iButton.className:''}" data-title="${text+'_'+i}" ${iButton.disabled ? disabled="disabled":''}>${text}</button>`;
    listeners[text + '_' + i] = iButton.callback;
    btnsTemp += button;
  }

  return `<div class="${DOM.btns}">${btnsTemp}</div>`;
};

button.listeners = listeners;
button.renderDOM = renderDOM;

module.exports = button;
