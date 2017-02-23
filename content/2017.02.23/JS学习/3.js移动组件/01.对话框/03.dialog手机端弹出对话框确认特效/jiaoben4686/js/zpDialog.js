;(function($){
	var Dialog=function(config){
		var _this_=this;
		//console.log("aaa");
		//设置默认参数
		this.config={
			width:'auto',
			height:'auto',
			message:'aaaaa',
			buttons:[],
			type:'warning',
			maskClose:true
		}
		//设置扩展参数
		if(config && $.isPlainObject(config)){
			$.entend(this.config,config);
		}else{
			this.isConfig=true;
		}
		//创建dom结构
		this.body=$('body');
		//设置遮罩层
		this.mask=$('<div class="dialog-container">');
		//设置弹出框
		this.win=$('<div class="dialog-window">');
		//设置头部
		this.winHead=$('<div class="dialog-header">');
		//设置内容
		this.winContent=$('<div class="dialog-content">这个一个等待框</div>');
		//设置脚部
		this.winFooter=$('<div class="dialog-footer">');
		//渲染弹出框
		this.create();

	}
	Dialog.prototype={
		create:function(){
			var _this_=this,
			body=this.body,
			mask=this.mask,
			win=this.win,
			winHead=this.winHead,
			winContent=this.winContent,
			winFooter=this.winFooter,
			config=this.config
			//判断是否传递参数
			if(this.isConfig){
				win.append(winHead.addClass('loading'));
				mask.append(win);
				body.append(mask);
				//手动关闭
				if(config.maskClose){
					mask.click(function(){
						_this_.close();
					})
				}

			}else{

			}
            
		},
		close:function(){
		
			this.mask.remove();
		}
	}
	window.Dialog=Dialog;
    $.dialog=function(config){
    	return new Dialog(config);
    }
})(Zepto)