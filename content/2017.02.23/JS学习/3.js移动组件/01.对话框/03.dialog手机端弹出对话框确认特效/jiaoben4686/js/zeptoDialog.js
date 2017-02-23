;(function($){
	var Dialog=function(config){
	    var _this_=this;
	    //console.log("aaa");

	
		//设置默认参数
		this.config={
			width:'auto',
			height:'auto',
			message:'aaaaa',
		 	buttons:null,
		 	type:'loading',
		 	maskClose:true
		 	
		}
		//设置扩展参数
		if(config && $.isPlainOject(config)){
			$.extend(this.config,config)
		}else{
			this.isConfig=true;
		}
		//dom结构
		this.body=$('body');
		//遮罩层
		this.mask=$('<div class="dialog-container">');
		//弹出框
		this.win=$('<div class="dialog-window">');
		//弹出头部
		this.winHead=$('<div class="dialog-header">');
		//弹出内容
		this.winContent=$('<div class="dialog-content">这个一个等待框</div>');
		//弹出脚部
		this.winFooter=$('<div class="dialog-footer"><button class="blue">按钮1</button><button >按钮2</button><button class="red">按钮3</button>');
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
			winFooter=this.winFooter
			//config = this.config


			//如果没有参数就弹出一个等待的弹出框
			if(this.isConfig){
				
			    win.append(winHead.addClass('loading'));
			    win.append(winContent);
			    win.append(winFooter);
			    mask.append(win);
			    body.append(mask);

			    if(this.config.maskClose){
					mask.click(function(){
					_this_.close();
				})
				
				}
			    
			}
			else{

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