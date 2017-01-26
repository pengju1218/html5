//CountValue 文字计数器
(function(window,document,undefined){
	window.CountValue=function(field,params){
		/*================
		Model
		================*/
		var defaults={
			maxLengthAttr:"data-maxlength",
			defaultMaxLength:20
			/*
            Callbacks:
            onInput:function(CountValue)
			onInputOut:function(CountValue)//文字超过限制
			onInputIn:function(CountValue)//文字未超过限制
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		//Params
		s.params=params;
		//Field(Element)
		s.field=typeof field === "string"?document.querySelector(field):field;
		//Maxlength(Number)
		s.maxLength=s.field.getAttribute(s.params.maxLengthAttr)||s.params.defaultMaxLength;
		/*================
		Method
		================*/
		s.destroy=function(){
			s.detach();
		}
		/*================
		Controller
		================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			if(!s.hasInputEvent){
				s.field[action]("input",s.onInput,false);
				s.hasInputEvent=true;
			}
		}
		s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        s.onInput=function(e){
        	s.target=e.target;
        	//Callback
			if(s.params.onInput)s.params.onInput(s);
			if(s.maxLength<s.target.value.length && s.params.onInputOut){
				if(s.params.onInputOut)s.params.onInputOut(s);
			}else{
				if(s.params.onInputIn)s.params.onInputIn(s);
			}
        }
        //Init
        s.init=function(){
        	s.attach();
        }
        s.init();
	}
	window.CountValues=function(params){
		/*================
		Model
		================*/
		var defaults={
			fieldClass:"countvalue",
			/*
            Callbacks:
            onInput:function(CountValue)
			onInputOut:function(CountValue)//文字超过限制
			onInputIn:function(CountValue)//文字未超过限制
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		//Params
		s.params=params;
        //获得所有元素
        s.updateFields=function(){
        	s.fields=document.querySelectorAll("."+s.params.fieldClass);
        }
        s.updateFields();
        /*================
		Method
		================*/
		//实例化所有元素
        s.loadCountValue=function(){
        	for(var i=0;i<s.fields.length;i++){
	            s.fields[i].countValue=new CountValue(s.fields[i],s.params);
	        }
        }
        s.loadCountValue();
        s.destroyCountValue=function(){
        	for(var i=0;i<s.fields.length;i++){
	            s.fields[i].countValue.destroy();
	        }
	        s.fields=null;
        }
        //更新
        s.update=function(){
        	s.destroyCountValue();//清除对象
        	s.updateFields();//重新获得DOM
        	s.loadCountValue();//重新实例化
        }
	}
})(window,document,undefined);