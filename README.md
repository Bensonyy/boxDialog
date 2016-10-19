# boxDialog
boxDialog 是一款轻量级的弹窗通用组件，包括弹出字符串内容、自定义 DOM 结构等以及快捷操作等功能，具有高度的可定制性。

该弹窗组件不依赖于任何第三方库，原生JS ES6 语法编写，支持到IE8+。


### 1. 基本使用方法：
调用主函数 `boxDialog.open()`, 传入相关参数.

```js
  boxDialog.open({
		title:'成功icon',
		content:'提交成功',
		shade: {
			opacity: 0.9
		},
		size:['450px'],
		button: {
			ok: {
				callback:function(){}
			}
		},
		icon: 'success'
	});
```

### 2. 弹出自定义 DOM 结构:

```js
    boxDialog.open({
		title:'自定义内容1',
		content: document.getElementById('content1'),
		size:['400px']
	});
```
##### 注意：size参数为弹窗的宽高，如：size:['400px','300px']，只设置一个为宽度。支持 px 和 % 两种单位。

### 3. 自定义 button:
```js
      boxDialog.open({
		title:'成功icon',
		content:'提交成功',
		shade: {
			opacity: 0.9
		},
		size:['450px','300px'],
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
		icon: 'success'
	});
```

### 4. 可使用的 boxDialog 参数：

```js
//可使用的参数
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
```
#### 注意：以上是可设置的参数，可根据自己需求灵活运用。

#### 回调函数接受一个参数返回弹窗索引，如：
```js
callback: function(index){
				//index就是该弹窗索引
			}

```


### 5. 外部可用方法:

```js
boxDialog = {
    open: dialog,
    close: close,
    closeAll: closeAll,
    msg: msg,
    alert: alert,
    list: list,
    version: version
 };
```

##### open: dialog	主方法，即弹出窗口实体，使用方法：boxDialog.open(), 传入参数;
##### close: close	接受一个index参数，关闭指定索引的弹窗，使用方法：boxDialog.close(2), 表示关闭索引为 2 的弹窗；若不传参数默认关闭最上层的弹窗;
##### closeAll: closeAll	关闭页面中所有弹窗，使用方法：boxDialog.closeAll();
##### msg: msg	弹出快捷信息提示，使用方法：boxDialog.msg(title,content,icon,sec), 参数都可选; 如：boxDialog.msg( '提交成功','提交成功 1s 后消失','success',1 );
##### alert: alert 模拟原生的alert效果，使用方法：boxDialog.alert(content,callback,w), 参数都可选; 如: boxDialog.alert('提交成功');
##### list: 所有弹窗索引的集合;
##### version: 弹窗组件的版本号;


### 6. 模块化使用boxDialog, 以 seajs 为例:
#### 假如调用页面是 index.html, 包含以下代码：
```js
seajs.config({
        base: './js/',
        alias: {
          'boxDialog':'../../lib/dist/boxDialog.min'
      	}
    });
seajs.use(['jquery', 'modules/main'], function($,ex){
	$('#abc').on('click', function(){
		ex.boxDialog.alert('abc');
	});
});
```
#### main.js 是调用的模块, 包含以下代码：
```js
define(function(require,exports,module){
	var boxDialog = require('boxDialog');
	exports.boxDialog = boxDialog;
})
```
#### 以上代码可正确使用 boxDialog 弹窗组件.

## 结语：
boxDialog 将持续更新，优化其性能和体验，谢谢关注。

## Release History
V1.0

## License
Copyright (c) 2015 Licensed under the MIT license.
