
var calender = {
	CHOOSE_DATE: "",
	TODAY_DATE: "",
	IS_LOADING: false,
	/**
	 * 改变当前选择时间
	 * @param {object} obj 当前控件（应该是span）
	 */
	changeFocus: function(obj) {
		var doc = document,
			fDate = obj.getAttribute("full-date"),
			pre = doc.querySelector(".focus"),
			preClass, thisClass,
			arr = fDate.split("-");

		doc.getElementById("thisYM").innerText = arr[0] + "年" + arr[1] + "月";
		if(pre != null) {
			preClass = pre.getAttribute("class");
			preClass = preClass.replace("focus", "");
			pre.setAttribute("class", preClass);
		}
		thisClass = obj.getAttribute("class");
		obj.setAttribute("class", thisClass + " focus");
		// 改变全局变量的值
		calender.CHOOSE_DATE = obj.getAttribute("full-date");
	},
	/**
	 * 改变月份
	 * @param {number} type 递增为1，递减为-1
	 */
	changeMonth : function(type){

		var doc = document, thisWeek,//周几
			thisYM = doc.getElementById("thisYM").innerText,// 格式为yyyy年mm月，如2014年11月
			thisYear = thisYM.substr(0, 4),// 取yyyy
			thisMonth = thisYM.substr(5, 2),// 取mm
			fDate,// 格式：yyyy-MM-dd
			choDate = new Date(),// 要跳转到的日期
			curDate = new Date();// 当前所在页面的日期
		choDate.setFullYear(thisYear, (thisMonth-1), 1);// 该方法的第二个参数，月份是从0开始的
		choDate.setMonth(choDate.getMonth() + type);// 修改日期
		thisYear = choDate.getFullYear();
		thisMonth = choDate.getMonth() + 1;
		thisWeek = choDate.getDay();
		if(thisMonth < 10) {
			thisMonth = "0" + thisMonth;
		}
		doc.getElementById("thisYM").innerText = thisYear + "年" + thisMonth + "月";
		// 获取当前显示这天日期
		fDate = doc.getElementById("week" + thisWeek).getAttribute("full-date");
		var dateArr = fDate.split("-"), gapDate;
		curDate.setFullYear(dateArr[0], (dateArr[1]-1), dateArr[2]);
		// 获取要显示的月份一日这天距离当前显示这天日期的天数。可以是正负
		gapDate = (choDate.getTime() - curDate.getTime()) / (1000*60*60*24);
		// 执行改变日期
		calender.changeDate(gapDate);
	},
	/**
	 * 滑动改变日期
	 * @param {number} type 递增正数，递减为负数；可自行修改。
	 */
	changeDate: function(type) {
		var doc = document;
		// 去除之前的focus样式和today样式
		var focus = doc.querySelector(".focus"),
			focusClass;
		if (focus != null) {
			focusClass = focus.getAttribute("class");
			focusClass = focusClass.replace("focus", "");
			focus.setAttribute("class", focusClass);
		}
		var today = doc.querySelector(".today"),
			todayClass;
		if (today != null) {
			todayClass = today.getAttribute("class");
			todayClass = todayClass.replace("today", "");
			today.setAttribute("class", todayClass);
		}

		// 改变日期
		for (var i = 0, infor, preDate, fdate; i < 7; i++) {
			infor = doc.getElementById("week" + i);
			preDate = infor.getAttribute("full-date");
			var arr = preDate.split("-"),
				preYear = arr[0],
				preMonth = arr[1],
				preDate = arr[2];
			preMonth = preMonth - 1;
			var now = new Date();
			now.setFullYear(preYear, preMonth, preDate);
			now.setDate(now.getDate() + type);
			var year = now.getFullYear(),
				month = now.getMonth() + 1,
				thisDate = now.getDate();

			if (month < 10) {
				month = "0" + month;
			}
			if (thisDate < 10) {
				thisDate = "0" + thisDate;
			}
			// 如果最后一天的月份不等于之前月份
			if(i == 6){
				if (month != (preMonth + 1) || year != preYear) {
					doc.getElementById("thisYM").innerText =
						year + "年" + month + "月";
				}
			}
			
			infor.innerText = thisDate;
			fdate = year + "-" + month + "-" + thisDate;
			infor.setAttribute("full-date", fdate);
			// 判断是否滑动回到选择的时间
			if (fdate == calender.CHOOSE_DATE) { // 上次选择的时间
				var thisClass = infor.getAttribute("class");
				infor.setAttribute("class", thisClass + " focus");
			}
			// 判断是否滑动回到当前的时间
			if (fdate == calender.TODAY_DATE) { // 今天时间
				var thisClass = infor.getAttribute("class");
				infor.setAttribute("class", thisClass + " today");
			}
		}
	},
	mouseDown: function(obj, thisX){	
		obj.onmousemove = function(){
			calender.mouseMove(thisX);
		};
		obj.onmouseup = function(){
			calender.mouseUp(this);
		};
		obj.onselectstart = function(){
			return false;
		};		
	},
	mouseMove: function(lastX){
		var thisX = event.clientX;
		if(thisX - lastX > 30 && !calender.IS_LOADING){
			calender.IS_LOADING = true;
			calender.changeDate(-7);
		}else if(thisX - lastX < -30 && !calender.IS_LOADING){
			calender.IS_LOADING = true;
			calender.changeDate(7);
		}
	},
	mouseUp : function(obj){	
		obj.onmousemove = null;
		obj.onmouseup = null;
		calender.IS_LOADING = false;
	}
};

/**
 * 自运行的JS函数，用来构造日历的初始样式
 */
(function() {
	/**********************日历初始化开始************************/
	// 填充日期
	var preDate = new Date(),
		nextDate = new Date(),
		now = new Date(),
		week = now.getDay(),
		thisMonth = now.getMonth() + 1, // 显示月份
		thisDate = now.getDate(), // 显示日期
		doc = document,
		thisYM = doc.getElementById("thisYM");

	// 今天的月份
	if (thisMonth < 10) {
		thisMonth = "0" + thisMonth;
	}
	thisYM.innerText = now.getFullYear() + "年" + thisMonth + "月";
	// 今天日期，小于10前面补0
	if (thisDate < 10) {
		thisDate = "0" + thisDate;
	}
	doc.getElementById("week" + week).innerText = thisDate;
	doc.getElementById("week" + week).setAttribute("class", "today focus");
	// 默认初始化时，选择的时间为当前时间
	calender.CHOOSE_DATE = now.getFullYear() + "-" + thisMonth + "-" + thisDate;
	calender.TODAY_DATE = calender.CHOOSE_DATE;
	doc.getElementById("week" + week).setAttribute("full-date", calender.CHOOSE_DATE);
	// 大于当前天
	for (var i = week + 1; i < 7; i++) {
		nextDate.setDate(nextDate.getDate() + 1);
		thisMonth = nextDate.getMonth() + 1;
		if (thisMonth < 10) {
			thisMonth = "0" + thisMonth;
		}
		thisDate = nextDate.getDate();
		if (thisDate < 10) {
			thisDate = "0" + thisDate;
		}
		doc.getElementById("week" + i).innerText = thisDate;
		doc.getElementById("week" + i).setAttribute("full-date",
			nextDate.getFullYear() + "-" + thisMonth + "-" + thisDate);
	}
	// 小于当前天
	for (var i = week - 1, thisMonth; i >= 0; i--) {
		preDate.setDate(preDate.getDate() - 1);
		thisMonth = preDate.getMonth() + 1;
		if (thisMonth < 10) {
			thisMonth = "0" + thisMonth;
		}
		thisDate = preDate.getDate();
		if (thisDate < 10) {
			thisDate = "0" + thisDate;
		}
		doc.getElementById("week" + i).innerText = thisDate;
		doc.getElementById("week" + i).setAttribute("full-date",
			preDate.getFullYear() + "-" + thisMonth + "-" + thisDate);
	}
	/**********************日历初始化结束************************/

	// 给每个日期增加点击事件
	var spans = doc.getElementsByTagName("span");
	for (var i = 0, len = spans.length; i < len; i++) {
		if (spans[i].getAttribute("id") &&
			spans[i].getAttribute("id").indexOf("week") != -1) {
			spans[i].onclick = function(){
				calender.changeFocus(this);
			};
		}
	}
		
	// 给月份添加左右点击事件
	doc.getElementById("preM").onclick = function(){
		calender.changeMonth(-1);
	};
	
	// 给月份添加左右点击事件
	doc.getElementById("nextM").onclick = function(){
		calender.changeMonth(1);
	};
	
	// 给日历控件左滑和右滑事件（这里在PC端模拟移动端的效果）
	doc.getElementById("cal_week").onmousedown = function(){
		var thisX = event.clientX;
		calender.mouseDown(this, thisX);
	};
	
	// 如果移动端使用，可以使用下列代码
//	doc.getElementById("cal_week").addEventListener("swipeleft", function() {
//		page.changeDate(7); // 增加日期
//	}, false);
//	doc.getElementById("cal_week").addEventListener("swiperight", function() {
//		page.changeDate(-7);
//	}, false);
	
})();

