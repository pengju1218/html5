;(function($){
	var Dialog=function(config){
		var _this_ =this;
		//console.log("aaa");
		//设置默认参数
		this.config={
			width:'auto',
			height:'auto',
			message:'没有传递任何参数',
			buttons:[],
			type:'warning',
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
		//return false;
		
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
			//弹出一个确认和删除的框,点击确认弹出加载2秒自动关闭,点击删除按钮把上一次框关闭
			//判断是否传递参数,无有传递参数的时候
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
				console.log(_this_);
			    var button_close=$("#right").click(function(e){
						_this_.close();
						e.stopPropagation();
					
						$.dialogSix({
							type:'loading',
							message:'2秒后自动关闭！'
	
						})
						setTimeout(function(){
							newMask.close();

						},2000)
						//return false;

				});
					
			    
			    //console.log(button_close);
			  //   if(!button_close){
			    	
			  //   }else{
			  //   	setTimeout(function(){
					// 	console.log("setTimeout");
					// 	_this_.close();

					// },2000)
			  //   }
                //删除按钮
				$("#cancle").click(function(){
					old=_this_;
					$.dialogSix({
						type:'warning',
						message:'你确定删除吗？',
						buttons:['<button id="rightRemove" class="blue">删除上一个弹出框</button>']
					});
			      	
				});
				//取消按钮中的确定按钮
				$("#rightRemove").click(function(){

					old.close();
					setTimeout(function(){
						_this_.close();
					},2000)
				});
				//取消按钮中的取消按钮
				$("#cancleRemove").click(function(){
                     _this_.close();
				})

			}	
		},
		
		close:function(){
			//console.log("close");
			this.mask.remove();
		}
		
	}
	
	$.dialogSix=function(config){
		 return new Dialog(config);
		// Dialog(config);
		// return false;
	}
})(Zepto)