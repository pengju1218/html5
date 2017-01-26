//DateUtil
Date.prototype.compareDate=function(date1,date2){//Date对象，格式yy-HH-dd hh:mm,大于返回1,等于返回0,小于返回-1
	date1.setSeconds(0,0);
	date2.setSeconds(0,0);
	var t1=date1.getTime();
	var t2=date2.getTime();

	if(t1==t2)return 0;
	return t1>t2==true?1:-1;
}
Date.prototype.compareTime=function(time1,time2){//格式hh:ss,大于返回1,等于返回0,小于返回-1
	var preTime1=time1.split(":");
	var t1=Math.abs(-preTime1[0]*60-preTime1[1]);
	var preTime2=time2.split(":");
	var t2=Math.abs(-preTime2[0]*60-preTime2[1]);
	if(t1==t2)return 0;
	return t1>t2==true?1:-1;
}
Date.prototype.year=function(){
	return this.getFullYear();
}
Date.prototype.month=function(){
	var monthNum=this.getMonth()+1;
    if(monthNum<10){
        monthNum="0"+monthNum;
    }
    return monthNum;
}
Date.prototype.day=function(){
	var dayNum=this.getDate();
    if(dayNum<10){
        dayNum="0"+dayNum;
    }
    return dayNum;
}
Date.prototype.hour=function(){
	var hourNum=this.getHours();
    if(hourNum<10){
        hourNum="0"+hourNum;
    }
    return hourNum;
}
Date.prototype.minute=function(){
	var minuteNum=this.getMinutes();
    if(minuteNum<10){
        minuteNum="0"+minuteNum;
    }
    return minuteNum;
}
Date.prototype.week=function(date){//周
	if(date){
		return new Date(date).getDay();
	}
	return this.getDay();
}
Date.prototype.seconds=function(){
	return this.getSeconds();
}
Date.prototype.milliseconds=function(){//毫秒
	return this.getMilliseconds();
}
Date.prototype.quarter=function(){//季
	return Math.floor((this.getMonth()+3)/3);
}
Date.prototype.date=function(){//yy-HH-dd
	return this.getFullYear()+"-"+this.month()+"-"+this.day();
}
Date.prototype.time=function(){//hh:mm
	return this.hour()+":"+this.minute();
}
Date.prototype.datetime=function(){//yy-HH-dd hh:mm
	return this.date()+" "+this.time();
}
Date.prototype.fulldatetime=function(){//yy-HH-dd hh:mm:ss
	return this.datetime()+":"+this.getSeconds();
}
Date.prototype.timestamp=function(){//获得现在距1970-1-1的毫秒数
	return this.getTime();
}
Date.prototype.days=function(year,month){//返回当月共多少天
	if(month && year){
		return new Date(year,month,0).getDate();
	}
	return new Date(this.year(),this.month(),0).getDate();
}
Date.prototype.diffDateTime=function(date1,date2){
	var dateStart=date1;//开始时间
	var dateEnd=date2;//结束时间
	if(!date1 instanceof Date)dateStart=new Date(date1);
	if(!date2 instanceof Date)dateEnd=new Date(date2);

	var secondMilli = 1000;//一分钟的毫秒数
	var minuteMilli = 60*secondMilli;//一分钟的毫秒数
	var hourMilli = 60 * minuteMilli;//一小时的毫秒数
	var dayMilli = 24 * hourMilli;//一天的毫秒数

	var timeDiff=dateEnd.getTime()-dateStart.getTime(); //毫秒差

	//计算出相差天数
	var daysDiff=Math.floor(timeDiff/dayMilli);

	//计算出小时数
	var dayMilliRemainder=timeDiff % dayMilli; //计算天数后剩余的毫秒数
	var hoursDiff=Math.floor(dayMilliRemainder / hourMilli);

	//计算相差分钟数
	var minuteMilliRemainder=dayMilliRemainder % hourMilli; //计算小时数后剩余的毫秒数
	var minutesDiff=Math.floor(minuteMilliRemainder / minuteMilli);

	//计算相差秒数
	var secondMilliRemainder=minuteMilliRemainder % minuteMilli; //计算分钟数后剩余的毫秒数
	var secondsDiff=Math.round(secondMilliRemainder / secondMilli);

	return {
		days:daysDiff,
		hours:hoursDiff,
		minutes:minutesDiff,
		seconds:secondsDiff
	}
}
Date.prototype.diff=function(date1,date2){
	var dateStart=date1;//开始时间
	var dateEnd=date2;//结束时间
	if(!date1 instanceof Date)dateStart=new Date(date1);
	if(!date2 instanceof Date)dateEnd=new Date(date2);

	var secondMilli = 1000;//一分钟的毫秒数
	var minuteMilli = 60*secondMilli;//一分钟的毫秒数
	var hourMilli = 60 * minuteMilli;//一小时的毫秒数
	var dayMilli = 24 * hourMilli;//一天的毫秒数

	var timeDiff=dateEnd.getTime()-dateStart.getTime(); //毫秒差
	//计算出相差天数
	var daysDiff=timeDiff/dayMilli;

	//计算出小时数
	var hoursDiff=timeDiff/hourMilli;

	//计算相差分钟数
	var minutesDiff=timeDiff/minuteMilli;

	//计算相差秒数
	var secondsDiff=timeDiff/secondMilli;

	return {
		days:daysDiff,
		hours:hoursDiff,
		minutes:minutesDiff,
		seconds:secondsDiff
	}
}
Date.prototype.minusday=function(num){
	var numTimestamp=num*1000*60*60*24;
	var newdate=new Date();
	newdate.setTime(newdate.getTime()-numTimestamp);
	return newdate.year()+"-"+newdate.month()+"-"+newdate.day();
}
Date.prototype.plusday=function(num){
	var numTimestamp=num*1000*60*60*24;
	var newdate=new Date();
	newdate.setTime(newdate.getTime()+numTimestamp);
	return newdate.year()+"-"+newdate.month()+"-"+newdate.day();
}
Date.prototype.expires=function(cacheTime){//时效性
	if(!cacheTime)return;
	//如果参数是小时
	if(!isNaN(cacheTime)){
		var numTimestamp=cacheTime*1000*60*60;
		var newDate=new Date(this.getTime()+numTimestamp);
		return newDate;
	}

	//如果参数是今天
	if(cacheTime==="today"){
		return new Date(this.plusday(1)+" 00:00:00");
	}

	//如果参数是日期yyyy-MM-dd
	return new Date(cacheTime);
}
Date.prototype.format=function(fmtDate,fmtType){//格式化日期yyyy-MM-dd hh:mm:ss
	var fmt="yyyy-MM-dd hh:mm:ss";
	if(fmtType){
		fmt=fmtType;
	}
	var y,M,d,h,m,s;
	
	if(fmtDate instanceof Date == true){
		y=fmtDate.getFullYear();
		M=fmtDate.getMonth() + 1;
		d=fmtDate.getDate();
		h=fmtDate.getHours();
		m=fmtDate.getMinutes();
		s=fmtDate.getSeconds();
	}
	//如果不是Date对象,就用另一种方法处理
	else{
		//匹配年月日yyyy-MM-dd或者yyyy.mm.dd或者yyyy/mm/dd
		var dateExpr=/([1-2][0-9][0-9][0-9])[\.\/-](0?[[1-9]|1[0-2])[\.\/-]([1-3][0-9]|0?[0-9])/
		var dateMatch=dateExpr.exec(fmtDate);
		if(!dateMatch || isNaN(dateMatch[1])  && isNaN(dateMatch[2]) && isNaN(dateMatch[3])){
			alert("您所要格式化的时期格式不正确");
			return;
		}
		y=dateMatch[1];
		M=dateMatch[2];
		d=dateMatch[3];
		h="00";
		m="00";
		s="00";
		
		//匹配时分hh:mm
		var timeExpr=/(0?[0-9]|[1-2][0-9]):([1-6][0-9]|0?[0-9])/
		var timeMatch=timeExpr.exec(fmtDate);
		if(timeMatch){
			h=timeMatch[1]?timeMatch[1]:"00";
			m=timeMatch[2]?timeMatch[2]:"00";
			s="00";
		}
		
		//匹配时分hh:mm:ss
		var tExpr=/(\d{2}|\d{1}):(\d{2}|\d{1}):(\d{2}|\d{1})/
		var tMatch=tExpr.exec(fmtDate);
		if(tMatch){
			h=tMatch[1]?tMatch[1]:"00";
			m=tMatch[2]?tMatch[2]:"00";
			s=tMatch[3]?tMatch[3]:"00";
		}
	}
	
	var dateExprs={
		"M+" :M,   
		"d+" :d,  
		"h+" :h,   
		"m+" :m,  
		"s+" :s
	};
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, (y+"").substr(4 - RegExp.$1.length));
	}
	for(var k in dateExprs){
		//"("+ k +")"=(M+)、(d+)、(h+)...
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (dateExprs[k]) : (("00"+ dateExprs[k]).substr((""+ dateExprs[k]).length)));   
		}
	}
	return fmt;
}
Date.prototype.setMinuteCeil=function(space){//分秒向上档位，返回日期的档位时间
	var space=space?space:5;//间隔
	var minute=this.getMinutes();//分钟
	var hasRemainder = minute % space == 0;//是否有余数

    var percentNum=Math.ceil(minute / space);//档位
    percentNum = hasRemainder ? parseInt(percentNum)+1 : percentNum;

    var result=percentNum*space;//根据档位计算结果
    this.setMinutes(result);
    return this;
}
Date.prototype.setMinuteFloor=function(space){//分秒向下档位，返回日期的档位时间
	var space=space?space:5;//间隔
	var minute=this.getMinutes();//分钟
	var hasRemainder = minute % space == 0;//是否有余数

    var percentNum=Math.floor(minute / space);//档位
    percentNum = hasRemainder ? parseInt(percentNum)-1 : percentNum;

    var result=percentNum*space;//根据档位计算结果
    this.setMinutes(result);
    return this;
}