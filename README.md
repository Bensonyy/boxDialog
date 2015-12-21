# boxDialog
boxDialog 是一款轻量级的弹窗通用组件，包括弹出字符串内容、自定义 DOM 结构、iframe 页面等以及快捷操作等功能，具有高度的可定制性。


### 1. 基本使用方法：
调用主函数 `boxDialog.open()`, 传入相关参数.

```js
  boxDialog.open({
	  content: '（成功）success',
	  icon:'success'	
  	});
```

### 2. 弹出自定义 DOM 结构:

```js
    boxDialog.open({
		content: document.getElementById('demo_dom_content'),   // or jQuery： $('#demo_dom_content')[0]
		size:['400px']
	});
```
##### 注意：size参数为弹窗的宽高，如：size:['400px','300px']，只设置一个为宽度。支持 px 和 % 两种单位。

### 3. 弹出 iframe 页面:
```js
      boxDialog.open({
		title: '弹出了一个 iframe 嵌套页面',
		content: {
			iframe: true,
			url: 'demo_iframe.html'
		},
		size:['400px','200px']
	});
```

### 4. 可使用的 boxDialog 参数：

```js
//可使用的参数
configs = {
	title: '\u6d88\u606f',		       // 标题，默认'消息'.
	content: '欢迎使用boxDialog!',     // 弹窗主内容.
	ok: true,					       // 是否显示确定按钮，默认显示.
	cancel: true,				       // 是否显示取消按钮，默认显示.
	okText: '\u786e\u5b9a',		       // 确定按钮文本，默认为：确定. 
	cancelText: '\u53d6\u6d88',	       // 取消按钮文本, 默认为：取消.
	size: ['auto','auto'],             // 内容宽，高, 默认auto.
	padding: '20px',		           // 内容与边界填充padding,格式css语法.
	icon: null,					       // 图标名称,字符串,如: icon:'success'.
	time: null,					       // 自动关闭时间，单位秒.
	shade: {						   // 遮罩层默认显示，设置shade:false, 不显示遮罩.
		background: '#000',			   // 遮罩层背景色，默认黑色.
		opacity: 0.8,                  // 遮罩层透明度, 默认0.8.
		duration: 200                  // 遮罩层动画速度, 单位毫秒，默认200.
	},				       
	fixed: true,				       // 是否固定位置，默认true固定位置.
	zIndex: 2010,				       // 弹窗的堆叠顺序.
	drag: false,				       // 拖拽开关，默认关闭.
	esc: true,					       // 是否支持Esc键关闭.
	position: null,	       	           // X,Y轴坐标,不设置默认居中，设置如：{left:'100px',top:'100px'}.
	closeBtn: true,                    // 弹窗的关闭按钮是否显示，默认显示.
	varBtns: null,				   	   // 自定义按钮, 格式如:[{text:'按钮3',className:null,callback:null},{text:'按钮4',className:null,callback:null}].
	className: null,				   // {string}     自定义弹窗最外层class.
	initCallback: null,			       // {function}   初始化成功执行的回调函数.
	okCallback: null,				   // {function}   点击确定按钮执行的回调函数.
	cancelCallback: null,			   // {function}   点击取消按钮执行的回调函数.
	closeCallback: null			       // {function}   弹窗关闭执行的回调函数.
};
```
#### 注意：以上是可设置的参数，可根据自己需求灵活运用。

#### 回调函数使用：
okCallback, cancelCallback, initCallback, closeCallback 用于不同场景下的回调函数， 参数分别为点击确定按钮、点击取消按钮、弹窗初始化成功后和关闭弹窗（如：2秒后自动关闭）执行的回调函数，可以在回调函数中执行ajax等操作DOM，
回调函数中可用 this 关键字，指向弹窗实体，可调用内部方法。

#### 回调函数接受一个参数返回弹窗索引，如：
```js
okCallback: function(index){
				//index就是该弹窗索引
			}

```


### 5. 外部可用方法:

```js
open: dialog,
close: close,
closeAll: closeAll,
msg: msg,
alert: alert
```

###### open: dialog	主方法，即弹出窗口实体，使用方法：boxDialog.open(), 传入参数;
###### close: close	接受一个index参数，关闭指定索引的弹窗，使用方法：boxDialog.close(2), 表示关闭索引为 2 的弹窗；若不传参数默认关闭最上层的弹窗;
###### closeAll: closeAll	关闭页面中所有弹窗，使用方法：boxDialog.closeAll();
###### msg: msg	弹出快捷信息提示，使用方法：boxDialog.msg(title,content,icon,sec), 参数都可选; 如：boxDialog.msg( '提交成功','提交成功 1s 后消失','success',1 );
###### alert: alert 模拟原生的alert效果，使用方法：boxDialog.alert(content,callback,w), 参数都可选; 如: boxDialog.alert('提交成功');


### 6. 模块化使用boxDialog, 以 seajs 为例:
#### 假如调用页面是 index.html, 包含以下代码：
```js
seajs.config({
        base: './js/',
        alias: {
          'jquery': 'modules/jquery.min',
          'boxDialog':'../../lib/dist/boxDialog'
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
boxDialog 已成功被多家公司使用以及某大型上市公司的多套系统、网站都在使用。 boxDialog 将持续更新，优化其性能和体验，谢谢关注。

## Release History
V1.0

## License
Copyright (c) 2015 xia bing, @Blog:http://ddbing.com/. Licensed under the MIT license.
