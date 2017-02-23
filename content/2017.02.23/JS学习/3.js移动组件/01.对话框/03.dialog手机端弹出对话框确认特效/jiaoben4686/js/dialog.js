;(function($){
	$.dialog=function(config){
		 return new Dialog(config);
		
	}
	var Dialog=function(config){
		var _this_ =this;
		//设置默认参数
		this.config={
			width:'auto',
			height:'auto',
			message:'没有传递任何参数',
			buttons:[],
			type:'ok',
			maskClose:true
		}
		//设置扩展参数
		if(config && $.isPlainObject(config)){
			$.extend(this.config,config);
            newMask=_this_;
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
		this.winHead = $('<div class="dialog-header"></div>');
		//设置内容
		this.winContent= $('<div class="dialog-content"></div>');
		//设置脚部
		this.winFooter= $('<div class="dialog-footer">');
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
			if(this.isConfig){
				
			//传递参数的时候	
			}else{
				win.append(winHead.addClass(config.type));
				winContent.html(config.message);
				win.append(winContent);
				for(var i=0; i<config.buttons.length;i++){
					winFooter.append(config.buttons[i]);
				}
				win.append(winFooter);
				mask.append(win);
				body.append(mask);
				//当只有一个按钮的时候
				$("#right").click(function(){
					_this_.close();
				})


			}	
		},
		
		close:function(){
			
			this.mask.remove();
		}
		
	}
})(Zepto)