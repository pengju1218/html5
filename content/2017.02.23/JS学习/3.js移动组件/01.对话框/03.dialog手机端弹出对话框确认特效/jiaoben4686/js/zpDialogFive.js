;(function($){
	var Dialog=function(config){
		var _this_ =this;
		//console.log("aaa");
		//设置默认参数
		this.config={
			width:'auto',
			height:'auto',
			message:'aaa',
			buttons:null,
			type:'loading',
			maskClose:true
		}
		//设置扩展参数
		if(config && $.isPlainOject(config)){
			$.extend(this.config,config);
		}else{
			this.isConfig=true;
		}
		//创建dom
		this.body = $('body');
		//设置遮罩层
		this.mask= $('<div class="dialog-container">');
		//设置弹出框
		this.win = $('<div class="dialog-window">');
		//设置头部
		this.winHead = $('<div class="dialog-header">');
		//设置内容
		this.winContent= $('<div class="dialog-content">自己定制按钮</div>');
		//设置脚部
		this.winFooter= $('<div class="dialog-footer">'
			+'<button id="right" class="blue">确定</button>'
			+'<button id="loading">等待</button>'
			+'<button id="cancle" class="red">取消</button>');
		//渲染弹出框
		this.create();
	}
	Dialog.prototype={
		create:function(){
			var _this_ = this,
			body =this.body,
			mask=this.mask,
			win =this.win,
			winHead = this.winHead,
			winContent = this.winContent,
			winFooter = this.winFooter,
			config= this.config
			//判断是否传递参数
			if(this.isConfig){
				win.append(winHead.addClass('warning'));
				win.append(winContent);
				win.append(winFooter);
				mask.append(win);
				body.append(mask);
				//弹出一个多组合的按钮框,且按钮样式可以定制
				//判断点击关闭弹出框
				
				$("#right").click(function(){
					_this_.close();
				}),

				$("#cancle").click(function(){
					_this_.close();
				})
				
			}
		},
		close:function(){
			this.mask.remove();
		}
		
	}
	$.dialogFive=function(config){
		return new Dialog(config);
	}
})(Zepto)