//可使用的 boxDialog 参数
const config = {
  type: 'dialog', //默认普通对话框
  title: '\u6d88\u606f', // 标题, 默认'消息'.
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
    opacity: 0.8, // 遮罩层透明度, 默认0.8.
  },
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
    }/*,
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
const DOM = {
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
}
/*
export {
  config, DOM
};
*/
module.exports = {
  config: config,
  DOM: DOM
};
