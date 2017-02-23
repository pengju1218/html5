;(function($){
	var Dialog=function(config){
		var _this_=this;
		//console.log('aaa');
		//设置默认参数
		this.config={
		    /*this.winContent='黎寿富',
			this.type='loading'.*/
			//宽度
			width:'auto',
			height:'auto',
			message:'aaa',
			buttons:null,
			type:'loading',
			maskClose:true
		}
		//设置扩展参数
		if(config && $.isPlainOject(config)){
			$.extend(this.config,config)
		}
		else{
			this.isConfig = true;
		}
	/*	if(this.isconfig && this.isPlainOject){
			this.isconfig=true;
		}else{
              
		}*/
		//dom结构
		this.body = $('body');
		//创建遮罩层
		this.mask = $('<div class="dialog-container">')
		/*.......*/

		//渲染弹出框
		this.create();
		
	}
	Dialog.prototype = {
		create:function(){
			var _this_ = this,
			mask = this.mask

		}
	}
	window.Dialog=Dialog;
	$.dialog = function(){
		return new Dialog();
	}

	/*var dialog = function(){

		//创建dom结构
		var _this_=this;
		this.body="body";
		this.container='<div class="dialog-container">';
		this.win='<div class="dialog-window">';
		this.winHead='<div class="dialog-header loading">';
		this.winContent='<div class="dialog-content">这个一个等待框</div>';
		this.winFooter='<div class="dialog-footer">';
		//创建固定属性
        Dialog.prototype={
            body=this.body,
            container=this.container,
            win=this.win,
            winHead=this.winHead,
            winContent=this.winContent,
            winFooter=this.winFooter,
            type=this.type,
        	
        }
		if(this.isconfig){
			win.append(winHead);
			win.append(winContent);
			win.append(winFooter);
			container.append(win);
			body.append(container);
		}
		
	}
*/
})(Zepto)