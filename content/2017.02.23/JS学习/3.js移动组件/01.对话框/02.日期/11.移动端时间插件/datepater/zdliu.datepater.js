/**
 * Created by zdliu on 2015/12/8. author:刘正东 qq:335758663
 */
(function ($) {

    $.fn.zdDatePater = function (options) {
        var beautifier = new zdDatePater(this, options);
        beautifier.init(this);
        return beautifier;
    };

    $.fn.zdDatePater.defaultOptions = {
        beginYear: 1900,//开始时间
        endYear: 2050,//结束时间
        timeOf: false//小时分钟开关
    };
    var zdDatePater = function (traget, options) {
        this.options = $.extend(true, {}, $.fn.zdDatePater.defaultOptions, options);
    };
    var yearY = 1, monthY = 1, dayY = 1, hourY = 1, minuteY = 1;
    var yearScroll = null, monthScroll = null, dayScroll = null, hourScroll = null, minuteScroll = null;
    var _scrollHH = 0, lastDay = 0;
    zdDatePater.prototype = {
        init: function (traget) {
            this.dgDate(traget);
        }, dgDate: function (traget) {
            var _dgDate = $('<div class="dg_date" id="dg_date">' +
            '<div class="dg_data_bg"></div>' +
            '<div class="dg_date_body">' +
            '<div class="dg_date_title">选择日期</div>' +
            '<div class="dg_date_scroll">' +
            '<div class="dg_date_bg"></div>' +
            '<div class="dg_date_ul" id="dateYearWrapper"><ul></ul></div>' +
            '<div class="dg_date_ul" id="dateMonthWrapper"><ul></ul></div>' +
            '<div class="dg_date_ul" id="dateDayWrapper"><ul></ul></div>' +
            '</div>' +
            '</div>' +
            '</div>');
            if (this.options.timeOf) {
                _dgDate.find(".dg_date_body").addClass("dg_time_body").append('  <div class="dg_date_scroll">' +
                '<div class="dg_date_bg"></div>' +
                '<div class="dg_time_ul" id="dateHourWrapper"><ul></ul></div>' +
                '<div class="dg_time_ul" id="dateMinuteWrapper"><ul></ul></div>' +
                '</div>');
                this.createTime(_dgDate);
            }
            _dgDate.find(".dg_date_body").append('<div class="dg_date_btn">' +
            '<a class="dg_date_sure" href="javascript:void(0);">确定</a>' +
            '<a class="dg_date_empty" href="javascript:void(0);">清除</a>' +
            '<a class="dg_date_cancel" href="javascript:void(0);">取消</a>' +
            '</div>');
            this.createDate(_dgDate);
            var $this = this;
            traget.click(function () {
                $("body").append(_dgDate);
                refresh();
            });
            function refresh() {
                if (traget.val() === "") {
                    var dt = new Date();
                    yearY = dt.getFullYear() - parseInt($this.options.beginYear) + 1;
                    monthY = dt.getMonth() + 1;
                    dayY = dt.getDate();
                    if ($this.options.timeOf) {
                        hourY = dt.getHours() + 1;
                        minuteY = dt.getMinutes() + 1;
                    }
                } else {
                    yearY = parseInt(traget.val().substr(0, 4)) - $this.options.beginYear + 1;
                    monthY = parseInt(traget.val().substr(5, 2));
                    dayY = parseInt(traget.val().substr(8, 2));
                    if ($this.options.timeOf) {
                        hourY = parseInt(traget.val().substr(11, 2)) + 1;
                        minuteY = parseInt(traget.val().substr(14, 2)) + 1;
                    }
                }
                $this.monthLastDay(yearY, monthY);
                _scrollHH = _dgDate.find(".dg_date_ul").height() / 3;
                $this.refreshDate(_dgDate);
                if ($this.options.timeOf) {
                    $this.refreshTime();
                }
                _dgDate.find(".dg_date_sure").click(function () {
                    var _vl = _dgDate.find("#dateYearWrapper li").eq(Math.ceil(yearY)).text().substr(0, 4);
                    _vl += "-" + _dgDate.find("#dateMonthWrapper li").eq(Math.ceil(monthY)).text().substr(0, 2);
                    _vl += "-" + _dgDate.find("#dateDayWrapper li").eq(Math.ceil(dayY)).text().substr(0, 2);
                    if ($this.options.timeOf) {
                        _vl += " " + _dgDate.find("#dateHourWrapper li").eq(Math.ceil(hourY)).text().substr(0, 2);
                        _vl += ":" + _dgDate.find("#dateMinuteWrapper li").eq(Math.ceil(minuteY)).text().substr(0, 2);
                    }
                    traget.val(_vl);
                    $("#dg_date").remove();
                });
                _dgDate.find(".dg_date_empty").click(function () {
                    traget.val("");
                });
                _dgDate.find(".dg_date_cancel").click(function () {
                    $("#dg_date").remove();
                });
            }
        }, refreshDate: function (_dgDate) {
            this.day_scroll(_dgDate);
            yearScroll.refresh();
            monthScroll.refresh();
            dayScroll.refresh();
            yearScroll.scrollTo(0, (yearY - 1) * _scrollHH, 0, true);
            monthScroll.scrollTo(0, (monthY - 1) * _scrollHH, 0, true);
            dayScroll.scrollTo(0, (dayY - 1) * _scrollHH, 0, true);
        }, day_scroll: function (_dgDate) {
            var $this = this;
            yearScroll = new iScroll("dateYearWrapper", {
                snap: "li", vScrollbar: false,
                onScrollEnd: function () {
                    yearY = (this.y / _scrollHH) * (-1) + 1;
                    $this.monthLastDay(yearY, monthY);
                    _dgDate.find("#dateDayWrapper ul").html($this.ulDay());
                    dayScroll.refresh();
                }
            });
            monthScroll = new iScroll("dateMonthWrapper", {
                snap: "li", vScrollbar: false,
                onScrollEnd: function () {
                    monthY = (this.y / _scrollHH) * (-1) + 1;
                    $this.monthLastDay(yearY, monthY);
                    _dgDate.find("#dateDayWrapper ul").html($this.ulDay());
                    dayScroll.refresh();
                }
            });
            dayScroll = new iScroll("dateDayWrapper", {
                snap: "li", vScrollbar: false,
                onScrollEnd: function () {
                    dayY = (this.y / _scrollHH) * (-1) + 1;
                }
            });
        },
        refreshTime: function () {
            this.time_scroll();
            hourScroll.refresh();
            minuteScroll.refresh();
            hourScroll.scrollTo(0, (hourY - 1) * _scrollHH, 0, true);
            minuteScroll.scrollTo(0, (minuteY - 1) * _scrollHH, 0, true);
        },
        time_scroll: function () {
            hourScroll = new iScroll("dateHourWrapper", {
                snap: "li", vScrollbar: false,
                onScrollEnd: function () {
                    hourY = (this.y / _scrollHH) * (-1) + 1;
                }
            });
            minuteScroll = new iScroll("dateMinuteWrapper", {
                snap: "li", vScrollbar: false,
                onScrollEnd: function () {
                    minuteY = (this.y / _scrollHH) * (-1) + 1;
                }
            });
        },
        createDate: function (_dgDate) {
            _dgDate.find("#dateYearWrapper ul").html(this.ulYear());
            _dgDate.find("#dateMonthWrapper ul").html(this.ulMonth());
            _dgDate.find("#dateDayWrapper ul").html(this.ulDay());
        },
        createTime: function (_dgDate) {
            _dgDate.find("#dateHourWrapper ul").html(this.ulHour());
            _dgDate.find("#dateMinuteWrapper ul").html(this.ulMinute());
        },
        ulYear: function () {
            var _ul = '<li>&nbsp;</li>';
            for (var i = this.options.beginYear; i <= this.options.endYear; i++) {
                _ul += '<li>' + i + '年</li>';
            }
            return _ul + '<li>&nbsp;</li>';
        },
        ulMonth: function () {
            var _ul = '<li>&nbsp;</li>';
            for (var i = 1; i <= 12; i++) {
                _ul += '<li>' + (i < 10 ? '0' : '') + i + '月</li>';
            }
            return _ul + '<li>&nbsp;</li>';
        },
        ulDay: function () {
            var _ul = '<li>&nbsp;</li>';
            for (var i = 1; i <= lastDay; i++) {
                _ul += '<li>' + (i < 10 ? '0' : '') + i + '日</li>';
            }
            return _ul + '<li>&nbsp;</li>';
        },
        ulHour: function () {
            var _ul = '<li>&nbsp;</li>';
            for (var i = 0; i <= 23; i++) {
                _ul += '<li>' + (i < 10 ? '0' : '') + i + '时</li>';
            }
            return _ul + '<li>&nbsp;</li>';
        },
        ulMinute: function () {
            var _ul = '<li>&nbsp;</li>';
            for (var i = 0; i <= 59; i++) {
                _ul += '<li>' + (i < 10 ? '0' : '') + i + '分</li>';
            }
            return _ul + '<li>&nbsp;</li>';
        },
        monthLastDay: function (year, month) {
            var d = new Date(this.options.beginYear + year - 1, month, 0);
            lastDay = d.getDate();
        }
    };


})(jQuery);
