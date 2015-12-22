/*!
* @name：  boxDialog v1.0
* @author：虾兵 @Blog：http://ddbing.com/
* @email： Binson.Zhang@qq.com
* @date:   2015-12-07
*/
;(function(global, factory ) {
	if ( typeof define === "function") {
		define(function(){
			return factory( global );
		});
	} else {
		factory( global );
	}
}(typeof window !== "undefined" ? window : this, function( global ) {

var boxDialog = boxDialog || {}, $ = global.jQuery
	,version = '1.0'
	,getPath = null
	,$win = $(global)
	,$doc = $(document)
	,$body = $(document.body)
	,root = document.documentElement
	,index = 0
	,hasActive = false
	,list = []
	,isFunction = isType('Function')
	,isString = isType('String')
	,isNumber = isType('Number')
	,isUndefined = isType('Undefined')
	,isArray = isType('Array')
	,isObject = isType('Object')
	,isBoolean = isType('Boolean');


//定义构造函数
var BoxClass = function(options){
	var that = this;
	if ( isString(options) || options.nodeType === 1 ) {
		options = {content: options};
	}
	that.index = ++index;
	that.Doms = Doms;
	that.opts = $.extend({},configs,getPath,options);
	that.init();
};

BoxClass.prototype = {
	constructor:BoxClass,
	version: version,
	init: function(){
		var that = this, opts = that.opts, index = that.index, content = opts.content;
		that.winW = $win.width();
		that.winH = $win.height();
		that.getDoms()
			.setPosition()
			.topIndex()
			.addEvent();

			if (isFunction(opts.initCallback)) {
				opts.initCallback.call(that,index);
			}

			if ( opts.time && isNumber(opts.time) ) {
				that.time();
			}

			if (content && content.nodeType === 1) {
				that.varDom(index,content);
			}

			if (!opts.esc) {
				that.removeEvent(index,'esc');
			}

			if (opts.content&&opts.content.iframe&&!isNumber(that.initSize().h)) {
				that.setIframe();
			}
		return that;
	},

	//初始化Doms节点
	getDoms: function(){
		var that = this, opts = that.opts,Doms = that.Doms,index=that.index, path = getPath ? getPath:''
			,temp = '', iconTemp ='', btnsTemp, isTitle, padding
			,icon = opts.icon, loadingImg
			,content = that.content(),arrBtns = that.getBtns(), btnsLen = arrBtns.length
			,btnListens = btnListens || {}
			,varTemp = opts.varTemp
			,initSize = that.initSize(), contentS, wrapS, isIframe = that.isIframe
			,wrapW = isNumber(initSize.w) ? initSize.w+'px':initSize.w
			,h = isNumber(initSize.h) ? initSize.h+'px':initSize.h;
		iconTemp = icon && (function(){ return '<em class="boxdialog-icon '+ opts.icon +'"></em>';}());
		padding = !isIframe ? 'padding:'+ opts.padding+';':'';
		contentS = 'style="'+ padding +( h?'height:'+h+';':'' )+ (isString(content)&&!isIframe&&!icon ? 'text-align:center;':'') +'"';
		wrapS = 'style="width:'+ wrapW +';"';

		//btns: '+ ( isIframe&&opts.content.btnsPaddingTop ? ' style="padding-top:'+ opts.content.btnsPaddingTop +';"':'') +'

		if (opts.title) {
			isTitle = function(){
				var titTemp = '';
				titTemp = '<div class="boxdialog-title"'+ (opts.drag ? 'style="cursor:move"': '') +'>'+ (isString(opts.title) ? opts.title:'') +'</div>';
				if (!opts.closeBtn) {
					return titTemp;
				}else{
					titTemp += '<div class="boxdialog-close-box"><a href="javascript:;" class="boxdialog-close">\xd7</a></div>';
				}
				return titTemp;
			}();
		}

		//创建btn
		if ( btnsLen > 0 ) {
			btnsTemp = function(){
				var bntsHtml = '';
				$.each(arrBtns, function(i,val){
					var text = val.text, btnActive = false;

					btnListens[text] = btnListens[text] || {};
					btnListens[text].callback = val.callback;

					if (opts.okText === text) {
						btnActive = Doms.btnActive;
					}

					bntsHtml += '<button class="boxbtn'+ (btnActive ? ' '+btnActive:'') +''+ (val.className ? ' '+val.className:'') +'"'+ (val.disabled ? ' disabled="'+ val.disabled +'"':'') +' data-title="'+ val.text +'">'+ val.text +'</button>';
			    });
			    that.btnListens = btnListens;
				return bntsHtml;
			}();
		}

		switch(varTemp){

			case 'loading':
			loadingImg = '<img src="'+ path +'skins/icons/loading.gif">';
			temp += '<div class="box-dialog box-dialog-loading" id="box-dialog'+ index +'" data-index ="'+ index +'" '+ wrapS +'>'+ (isTitle ? isTitle:'') +
						'<div class="boxdialog-content" '+ contentS +'>'+ loadingImg +'</div>'+
					'</div>';
			break;

			default:
			temp += '<div class="box-dialog'+ (opts.className ? ' '+opts.className:'') +'" id="box-dialog'+ index +'" data-index ="'+ index +'" '+ wrapS +'>'+ (isTitle ? isTitle:'') +
						'<div class="boxdialog-content'+ (icon ? ' boxdialog-icon-true':'') +'" '+ contentS +'>'+ (iconTemp ? iconTemp:'') + (content ? content:'') +'</div>'+
						( btnsLen ? '<div class="boxdialog-btns">'+ btnsTemp +'</div>':'' )+
					'</div>';
			break;

		}

		$body.append(temp);
		list.push(index);
		return that;
	},
	
	//内容
	content: function(){
		var that = this, opts = that.opts, index = that.index, Doms = that.Doms
		    ,_content = opts.content;
		
		if ( isUndefined(_content) ) { return;}
	
		if (_content && _content.nodeType === 1) {

			//content 为 document.getElementById(id)
			var oldDis = _content.style.display, prev = _content.previousSibling, next = _content.nextSibling, parent = _content.parentNode;
			
			that.eleBack = function(){
				if (prev && prev.parentNode) {
						prev.parentNode.insertBefore(_content, prev.nextSibling);
					} else if (next && next.parentNode) {
						next.parentNode.insertBefore(_content, next);
					} else if (parent) {
						parent.appendChild(_content);
					}
				_content.style.display = oldDis;
			};
			return;
		}else if ( isObject(_content) && _content.iframe ) {
			that.isIframe = true;
			return that.iframe();
		}else{
			return _content;
		}

		return that;
	},

	// iframe 处理
	iframe: function(){
		var that = this, opts = that.opts, index = that.index, Doms = that.Doms
			,temp = '', iframe = opts.content
			,url,frameborder,border,marginwidth,marginheight,scrolling,allowtransparency,className
			,initSize = that.initSize(),h = isNumber(initSize.h) ? initSize.h:'';

		url = iframe.url;
		frameborder = iframe.frameborder ? iframe.frameborder : 'no';
		border = iframe.border ? iframe.border : 0;
		scrolling = iframe.scrolling ? iframe.scrolling : 'auto';
		allowtransparency = iframe.allowtransparency ? iframe.allowtransparency : 'yes';
		className = iframe.className ? 'class="'+ iframe.className +'"': '';

		temp = '<iframe id="'+ Doms.iframe + index +'" name="'+ Doms.iframe + index +'"'+ (h ? ' height="'+h+'"':'') +' class="'+ Doms.iframe +'" src="'+ url +'" frameborder="'+ frameborder +'" border="'+ border +'" scrolling="'+ scrolling +'" allowtransparency="'+ allowtransparency +'"'+ className
				+'></iframe>';

		return temp;
	},

	setIframe: function(){
		var that = this, opts = that.opts, index = that.index, Doms = that.Doms
			,$iframe = $('#'+Doms.iframe+index)
			,$wrap = $('#'+Doms.wrap+index), $title = $wrap.children('.'+ Doms.title), $btns = $wrap.children('.'+ Doms.btns)
			,titleH = $title.outerHeight()
			,btnsH = $btns.outerHeight();
		
		$('#'+Doms.iframe+index).on('load',function(){
			var t = $(this), h = t.contents().find('body').outerHeight();
			t.height(h);
			//$wrap.height(h+titleH+btnsH);
			that.setPosition();
		});

		return that;
	},

	//内容为Dom对象
	varDom: function(idx,objDom){
		var that = this, opts = that.opts, index = idx||that.index, Doms = that.Doms,
		    $wrap = $('#'+Doms.wrap+index), $content = $wrap.children('.'+ Doms.content);
		objDom.style.display = 'block';
		$content[0].appendChild(objDom);
		return that;
	},

	//button处理
	getBtns: function(idx){
		var that = this, opts = that.opts, index = idx||that.index
			,ok = opts.ok, cancel = opts.cancel
			,arrBtns = isArray(opts.varBtns) ? opts.varBtns : []; 
		if (ok) {
			arrBtns.push({
				text: opts.okText,
				callback: opts.okCallback
			});
		}
		if (cancel) {
			arrBtns.push({
				text: opts.cancelText,
				callback: opts.cancelCallback
			});
		}

		that.btns = arrBtns;
		return arrBtns;
	},
    
    /*
    * 初始化宽高
    * @return {object} content 的宽高和 wrap 的宽高
    */
	initSize: function(){
		var that = this, opts = that.opts, optsSize = opts.size, w, h
			,winW = that.winW, winH = that.winH
			,padding = $.trim(opts.padding).split(' ')
			,paddingL = that.toNumber(padding[0]), paddingT = that.toNumber(padding[1]);
		w = optsSize[0];
		h = optsSize[1];
		if ($.trim(w) != 'auto') {
			w = that.toNumber( optsSize[0], winW);
		}
		if ($.trim(h) != 'auto') {
			h = that.toNumber( optsSize[1], winH);
		};

		return { w:w, h:h };
	},

	/**
	* 重置宽高, 用于复杂操作初始化后设置 Dom 宽高
	* @param {string} w 设置的宽，如: '10px' 或者 '10%'
	* @param {string} w 设置的高
	*/
	setSize: function(w,h){
		var that = this, opts = that.opts, index = that.index, Doms = that.Doms
			,$wrap = $('#'+Doms.wrap+index), $content = $wrap.children('.'+ Doms.content), $title = $wrap.children('.'+ Doms.title)
			,$btn = $wrap.children('.'+Doms.btns)
			,contentW = w || opts.size[0]
			,contentH = h || opts.size[1]
			,titleH = $title.outerHeight()
			,btnH = $btn.outerHeight()
			,winW = that.winW
			,winH = that.winH

		if (contentW) {
			if (contentW.indexOf('px') > -1) {
				$content.css('width',contentW);
			}else{
				contentW = that.toNumber(contentW,winW);
				$content.width( contentW );
			};
			$wrap.width( $content.outerWidth() ); 
		}

		if (contentH) {
			if (contentH.indexOf('px') > -1) {
				$content.css('height', contentH);
			}else{
				contentH = that.toNumber(contentW,winH);
				$content.height( contentH );
			};
			$wrap.height( $content.outerHeight() + titleH + btnH ); 
		}
		return that;
	},

	/**
	* 设置位置
	*/
	setPosition: function(){
		var that = this, opts = that.opts, index = that.index, Doms = that.Doms
			,$wrap = $('#'+Doms.wrap+index), $content = $wrap.children('.'+ Doms.content)
			,isFixed,wrapS = $wrap[0].style
			,winW = that.winW, winH = that.winH
			,wrapW = $wrap.outerWidth(),wrapH = $wrap.outerHeight()
			,pos = opts.position, left, top, right, bottom;
			//,style, left, top, marginL, marginT, isFixed;

		isFixed = opts.fixed ? 'fixed':'absolute';
		wrapS.position = isFixed;

		if ( isObject( pos ) ) {
			left = pos.left;
			top = pos.top;
			right = pos.right;
			bottom = pos.bottom;
		}

		if (left && !right) {
			left = that.toNumber(left);
			wrapS.left = left + 'px';
		}else if (right && !left) {
			right = that.toNumber(right);
			wrapS.right = right + 'px';
		}else{
			wrapS.left = parseInt( (winW-wrapW)/2 ) + 'px';
		}

		if (top && !bottom) {
			top = that.toNumber(top);
			wrapS.top = top + 'px';
		}else if (bottom && !top) {
			bottom = that.toNumber(bottom);
			wrapS.bottom =  bottom + 'px';
		}else{
			wrapS.top = parseInt( (winH-wrapH)/2,10) + 'px';
		}

		that.left = wrapS.left;
		that.top = wrapS.top;
		return that;
	},

	/**
	* 统一处理单位
	* @param {string} value 要处理的单位值，如:'10px' 或者'10%'
	* @param {number} max 	最大值，如: window 宽或高
	* return {number} value 处理后的 value 值
	*/
	toNumber: function(value,max){
		var reg = /^\d+%$/;
		if (!value) { return ;}

		if ( isNumber(max) && reg.test(value) ) {
  			value = max * value.split('%')[0]/100;
		}
		value = parseInt(value,10);

		return value;
	},

	//定时自动关闭
	time: function(sec){
		var that = this, opts = that.opts, sec = sec||opts.time;
		if ( sec && isNumber(sec) ) {
			setTimeout(function(){
				that.close();
			}, 1000 * sec);
		}
		return that;
	},

	//置顶
	topIndex: function(idx){
		var that = this, opts = that.opts, index = idx||that.index, Doms = that.Doms
			,zIndex = opts.zIndex
			,wrap = Doms.wrap, topActive = Doms.topActive, shade = opts.shade;

		zIndex += index;

		//设置叠加高度
		if (!hasActive) {
			$('#'+ wrap + index).css('zIndex', zIndex).addClass(topActive);
			hasActive = true;
		}else{
			$('.'+Doms.wrap).removeClass(topActive);
			$('#'+wrap + index).css('zIndex', zIndex).addClass(topActive);
		}
		shade && that.shade().css('zIndex',zIndex-1);
		return that;
	},

	// 遮罩层处理
	shade: function(){
		var that = this, opts = that.opts, index = that.index, Doms = that.Doms
			,shadeOpts = opts.shade
			,shadeBg = shadeOpts.background
			,opacity = shadeOpts.opacity
			,duration = shadeOpts.duration
			,$wrap = $('#'+Doms.wrap+index)
		    ,shadeW;

		shadeW = $('<div></div>');
		shadeW.attr({'id':'box-dialog-shade'+index,'data-index':index})
			  .addClass(Doms.shade)
			  .css({'background':shadeBg});

		if (duration) {
			shadeW.css({'opacity':0}).animate({'opacity':opacity},duration);
		}else{
			shadeW.css({'opacity':opacity});
		}
		//$wrap.insertAfter('');
		$body.append(shadeW);
		return shadeW;
	},
	
	//绑定事件
	addEvent: function(){
		var that = this, opts = that.opts, index = that.index, Doms = that.Doms
		    ,$wrap = $('#'+Doms.wrap+index)
		    ,closeBtn = $wrap.children().children('.'+Doms.close)
		    ,btns = $wrap.children('.'+Doms.btns);

		//事件监听
		closeBtn.on('click', function(){
			that.click();
			return false;
		});
        
        //button 及自定义 button 处理
		btns.on('click', function(e){
			var btns = that.btns, target = e.target || e.srcElement, btnText;
			if (target.disabled){ return false; }
			btnText = $(target).attr('data-title');
			btnText && that.click(btnText);
		});

		//窗口改变事件
		$win.on('resize', function(){
			that.reset();
		});

		//拖拽事件
		opts.drag && that.drag(index);

		return that;
	},

	//卸载事件
	removeEvent: function(idx,name){
		var that = this;
		switch(name){

			case 'esc':
			$doc.off('keydown');
			break;

			default:
			if ( list.length < 1 ) {
				$win.off('resize');
				$doc.off('keydown');
			}
			break;
		}
		return that;
	},

	//button 单击事件处理
	click: function(text){
		var that = this, btns = that.btns, btnListens = that.btnListens, callback, index = that.index;
		if (!text) {
			that.close();
			return;
		}

		if ( isString(text) && btns.length > 0 ) {
			callback = btnListens[text] && btnListens[text].callback;
		}

		if (!callback) {
			that.close();
		}
		return isFunction(callback)&&callback.call(that,index) !== false ? that.close() : that;
	},

	//关闭
	close: function(idx){
		var that = this, opts = that.opts, index = idx||that.index, Doms = that.Doms, closeCallback = opts.closeCallback
			,$wrap = $('#'+Doms.wrap+index),$shade = $('#'+Doms.shade+index),topActive = Doms.topActive
			,duration = opts.shade.duration,len = list.length

		// 如果内容是页面中的dom结构
		that.eleBack && that.eleBack();

		$wrap.remove();
		$shade && $shade.animate({'opacity':0},duration,function(){ $(this).remove(); });
		if (len > 1) {
			$.each(list,function(i,val){
				if (val == index) {
					list.splice(i,1);
				}
			});
			$('#'+Doms.wrap+list[len-1]).addClass(topActive);
		}else{
			list.length = 0;
			hasActive = false;
		}

		isFunction(closeCallback)&&closeCallback.call(that,index);

		return that;
	},

	//窗口重置
	reset: function(idx){
		var that = this, opts = that.opts, index = idx || that.index, Doms = that.Doms
			,$wrap = $('#'+Doms.wrap+index)
			,oldWinW = that.winW, oldWinH = that.winH, oldLeft = that.left, oldTop = that.top
			,newWinW = $win.width(),newWinH = $win.height()
			,wrapS,lX,tY,_reset,_timer;

		if (!$wrap[0]) { return; }
		wrapS = $wrap[0].style;
		_timer && clearTimeout(_timer);
		_timer = setTimeout( function(){ _reset(); }, 100 );
		_reset = function(){
			lX = oldLeft.split('px')[0] - parseInt( (oldWinW-newWinW)/2 );
			tY = oldTop.split('px')[0] - parseInt( (oldWinH-newWinH)/2 );
			if (lX < 0) {
				wrapS.left = 0;
			}else{
				wrapS.left = lX + 'px';
			}
			if (tY < 0) {
				wrapS.top = 0;
			}else{
				wrapS.top = tY + 'px';
			}
		};
	},

	//拖拽
	drag: function(idx){
		var that = this, opts = that.opts, index = idx || that.index, Doms = that.Doms
			,$wrap = $('#'+Doms.wrap+index), title = $wrap.children('.'+Doms.title)
			,doc = $doc[0], wrap = $wrap[0]
			,wrapS = wrap.style;

		title[0].onmousedown = function(ev){
			var ev = ev || window.event,disX=0,disY=0;
			$wrap.fadeTo('fast',0.6);
			disX = ev.clientX - wrap.offsetLeft;
			disY = ev.clientY - wrap.offsetTop;
			doc.onmousemove = function(ev){
				var ev = ev || window.event,X,Y,winW,winH;
				X = ev.clientX - disX;
				Y = ev.clientY - disY;
				winW = root.clientWidth - wrap.offsetWidth;
				winH = root.clientHeight - wrap.offsetHeight;
				X = ( X > 0 ) ? X : 0;
				X = ( X > winW ) ? winW : X;
				Y = ( Y > 0 ) ? Y : 0;
				Y = ( Y > winH ) ? winH : Y;
				wrapS.left = X + 'px';
				wrapS.top = Y + 'px';
				ev.preventDefault();
			};
			doc.onmouseup = function(){
				$wrap.fadeTo('fast',1);
				doc.onmousemove = null;
				doc.onmouseup = null; 
				ev.preventDefault();
			};
			ev.preventDefault();
		};
		return that;
	}

};

//类型判断
function isType(type){
	return function(obj){
		return {}.toString.call(obj) === '[object '+ type +']';
	}
};

//缓存Doms节点
var Doms = {wrap:'box-dialog',title:'boxdialog-title',close:'boxdialog-close',content:'boxdialog-content',btns:'boxdialog-btns',icon:'boxdialog-icon',shade:'box-dialog-shade',topActive:'box-dialog-active',btnActive:'boxbtn-active'
			,iframe:'boxdialog-iframe'}
	,config, configs;


//全局配置
config = function(options){
	if (isObject(options)) {
		getPath = options;
		return getPath;
	};
};

//可使用的 boxDialog 参数
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
	position: null,	       	           // X,Y轴坐标,不设置默认居中，设置如：{left:'100px',top:'100px'}，4个参数分别表示位置：左，上，右，下，原理取于css语法的left、top、right、bottom.
	closeBtn: true,                    // 弹窗的关闭按钮是否显示，默认显示.
	varBtns: null,				   	   // 自定义按钮, 格式如:[{text:'按钮3',className:null,callback:null},{text:'按钮4',className:null,callback:null}].
	className: null,				   // {string}     自定义弹窗最外层class.
	initCallback: null,			       // {function}   初始化成功执行的回调函数.
	okCallback: null,				   // {function}   点击确定按钮执行的回调函数.
	cancelCallback: null,			   // {function}   点击取消按钮执行的回调函数.
	closeCallback: null			       // {function}   弹窗关闭执行的回调函数.
};
/**
* content: {                           // {object}     iframe 支持, 注意: 不要忘记 size 参数设置 iframe 宽高
		iframe: true,
		url: null,
		frameborder: 'no',
		border: 0,
		scrolling: 'no',
		allowtransparency:'yes',
		btnsPaddingTop:'20px'
	}
	varTemp: null,			       	  // {object}     自定义显示模板接口，如: varTemp:'loading' 将只显示loading中的图标	
*/


/******************************************各种快捷操作**************************************/
/**
* @return index boxDialog 索引
*/
function toIndex(){
	var len = list.length, index;
	if (len == 1) {
		index = list[0];
	}else{
		index = list[len-1];
	}
	return index;
};

// esc 快捷键
$doc.on('keydown',function(ev){
	var ev = ev || $win.event, flag = true, len = list.length, index;
	if (!len) { return ;}
	if (flag) {
		if (ev.keyCode == 27) {
			index = toIndex();
			close(index);
			flag = false;
		}
	}
});

/**
* close
* @param {number} idx boxDialog 索引
*/

//close
function close(idx){
	var i = idx, len = list.length, close;
	if ( isUndefined(i)&&len ) {
		i = list[len-1];
	}
	close = $( '#'+Doms.wrap+ i ).children().children('.'+Doms.close);
	if (close.length) {
		close.trigger('click');
	}else{
		$( '#'+Doms.wrap+ i ).remove();
		if ( $( '#'+Doms.shade+ (i) ).length ) {
			$( '#'+Doms.shade+ (i) ).remove();
		}
	}
};

//关闭所有弹窗
function closeAll(){
	if (!list.length) { return; }
	$.each(list,function(i){
		close(i);
	});
	list.length = 0;
};

/**
* 信息提示，如: 成功 or 失败，2秒后自动关闭 
* @param {string}   title 	  提示标题
* @param {string}   content   提示标题
* @param {number}   sec   	  几秒后消失
*/
function msg(title,content,icon,sec){
	sec = isNumber(sec) ? sec:2;
	title = isString(title) ? title:configs.title;
	content = isString(content) ? content:configs.content;

	switch(icon){
		case 'success':
		icon = 'success';
		break;

		case 'failure':
		icon = 'failure';
		break;

		case 'warning':
		icon = 'warning';
		break;

		case 'question':
		icon = 'question';
		break;

		default:
		icon = null;
		break;
	}

	dialog({
		title: title,
		content: content,
		icon: icon,
		time: sec,
		ok: false,
		cancel: false
	});

};

/**
* 模拟原生alert效果
* @param {string}   content   提示信息
*/
function alert(content,callback,w){
	w = w ? w:'198px';
	content = isString(content ) ? content:configs.content;
	callback = isFunction(callback ) ? callback:configs.okCallback;
	if (isString(content)) {
		dialog({
			cancel: false,
			content: content,
			okCallback: callback,
			size: [w]
		});
	}
};

/**
* 显示 loading 图标
* @param {boolean} arg false 关闭loading图标
*/
function loading(arg){
 	if (isBoolean(arg)&&!arg) {
 		var index = $('.box-dialog-loading').attr('data-index');
 		index&&close(index);
 		return;
 	}
	dialog({
		title: false,
		ok: false,
		cancel: false,
		content: false,
		shade: false,
		varTemp: 'loading',
		size: ['24px','24px']
	});
};

/******************************************end 各种快捷操作**************************************/


// dialog入口
function dialog(options){
	var instance;
	instance = new BoxClass(options);
	return instance; 
};


//对外暴露

$.boxDialog = $.fn.boxDialog = function(options){
	dialog(options);
};

boxDialog = {
	open: dialog,
	config: config,
	close: close,
	closeAll: closeAll,
	msg: msg,
	alert: alert,
	loading: loading
};

window.boxDialog = boxDialog;

return boxDialog;

}));
