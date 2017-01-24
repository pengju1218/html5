/*

 @Name：mBox v2.0 弹层组件移动版
 @Author：陈国军
 @Date：2016-2-28
 @QQ群：516754269
 @官网：http://www.jayui.com/mBox/  或　 https://github.com/singod/mBox　
        
*/
(function(window, undefined) {
    var $QM = function(elem) {
        return document.querySelectorAll(elem);
    }, doc = document, JM = {}, FM = $QM.prototype;
    JM.timer = {};
    JM.endfun = {};
    JM.extend = function(Obj, source, override) {
        if (override === undefined) override = true;
        for (var property in source) {
            if (override || !(property in Obj)) {
                Obj[property] = source[property];
            }
        }
        return Obj;
    };
    JM.oneven = function(elem, fun) {
        var move;
        if (!/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)) {
            return elem.addEventListener("click", function(e) {
                fun.call(this, e);
            }, false);
        }
        elem.addEventListener("touchmove", function() {
            move = true;
        }, false);
        elem.addEventListener("touchend", function(e) {
            e.preventDefault();
            move || fun.call(this, e);
            move = false;
        }, false);
    };
    //默认配置
    var config = {
        width:"",  // 弹层的宽度，可用是百分比，可用是如（320px）
        height:"",  // 弹层的高度，可用是百分比，可用是如（320px）
        boxtype:0,  //弹层的类型
        title:[],  // 标题可以有2个参数，例如 ["标题","color:#fff"]，如果title:[]参数为空，不显示标题
        content:"请稍等,暂无内容！",  // 内容	
        conStyle:"background-color:#fff;", //内容框的css样式，你可以写更多样式
        btnName:[],  // 是否显示按钮  确定："\u786E\u5B9A", 取消："\u53D6\u6D88"
        btnStyle:[],  //按钮CSS样式
        yesfun:null,  // 确定按钮回调函数
        nofun:null,  // 取消按钮回调函数
        closefun:null,  // 右上角关闭取消按钮回调函数
        closeBtn:[ false, 1 ],  // 参数一是否显示右上角关闭取消按钮，默认false，参数二按钮颜色 1是黑色，2是白色
        time:null,  // 自动关闭时间(毫秒)
        fixed:true,  // 是否静止定位
        mask:true,  //是否显示遮罩层
        maskClose:true,  // 点击遮罩层是否关闭，默认true
        maskColor:"rgba(0,0,0,0.5)",  // 遮罩层颜色可以是rgba也可以是rgb
        margin:"10px 10px",
        zIndex:1e4,  // 层级关系
        success:null,  //层成功弹出层的回调函数，返回一个参数为当前层元素对象
        endfun:null   //层彻底销毁后的回调函数
    };
    var idx = 1, jemCell = [ "jembox" ], Wcell, Wprev, Wnext, Wparent, WisShow, 
	JmLayer = function(options) {
        var that = this, newobj = JSON.parse(JSON.stringify(config));
        that.config = JM.extend(newobj, options);
        Wcell = that.config.content;
        if (Wcell && Wcell.nodeType === 1) {
            WisShow = document.defaultView.getComputedStyle(Wcell, null).display;
            Wprev = Wcell.previousSibling;
            Wnext = Wcell.nextSibling;
            Wparent = Wcell.parentNode;
        }
        that.viewInit();
    };
    JmLayer.prototype = {
        viewInit:function() {
            var that = this, opts = that.config, modBox = doc.createElement("div");
            var maskDiv = opts.mask ? '<div class="jemboxmask" style="pointer-events:auto;background-color:' + opts.maskColor + ';"></div>' :"";
            //判断是否有标题参数，创建标题	
            var titDiv = function() {
                var titype = typeof opts.title === "object", tCss = opts.title[1] != undefined ? opts.title[1] :"";
                return opts.title != "" ? '<div class="jemboxhead" id="head' + idx + '" style="'+tCss+'">' + (titype ? opts.title[0] :opts.title) + "</div>" :"";
            }();
            //判断是否有按钮参数，创建按钮
            var btnDiv = function() {
                var btnArr = opts.btnName, len = btnArr.length, btnDom, W50 = "width:50%;";
                if (len === 0 || !opts.btnName) return "";
                if (len === 1) {
                    if (opts.btnStyle != "") {
                        var BtnCss = "width:100%;" + opts.btnStyle[0].replace(/\s/g, "");
                    } else {
                        var BtnCss = "width:100%;";
                    }
                    btnDom = '<span onytpe="1" style="' + BtnCss + '">' + btnArr[0] + "</span>";
                }
                if (len === 2) {
                    var B1 = opts.btnStyle[0] != undefined ? W50 + opts.btnStyle[0] : W50;
                    var B2 = opts.btnStyle[1] != undefined ? W50 + opts.btnStyle[1] : W50;
                    btnDom = '<span onytpe="0" style="' + B2 + '">' + btnArr[1] + '</span><span onytpe="1" style="' + B1 + '">' + btnArr[0] + "</span>";
                }
                return '<div class="jemboxfoot" id="foot' + idx + '">' + btnDom + "</div>";
            }();

            $QM("html")[0].style.overflowY = "hidden";
            $QM("body")[0].style.overflowY = "hidden";
            var setW = opts.width != "" ? "width:" + opts.width + ";" :"", setH = opts.height != "" ? "height:" + opts.height + ";" :"";
            that.id = modBox.id = jemCell[0] + idx;
            modBox.setAttribute("class", "jemboxer" + " " + jemCell[0] + (opts.boxtype || 1));
            modBox.setAttribute("style", "z-index:" + opts.zIndex);
            modBox.setAttribute("jmb", idx);
            modBox.innerHTML = maskDiv + '<div class="jemboxmain" '+ (!opts.fixed ? 'style="position:static;"' : '') +'><div class="jemboxsection">' + 
			'<div class="jemboxchild" style="' + setW + setH + opts.conStyle + '">' + 
			titDiv + 
			'<span class="jemboxclose0' + opts.closeBtn[1] + '" style="display:' + (opts.closeBtn[0] ? "block" :"none") + '"></span>' + 
			'<div class="jemboxmcont" style="margin:' + opts.margin + ';"></div>' + 
			btnDiv + 
			"</div>" + 
			"</div></div>";
            doc.body.appendChild(modBox);
            var elem = that.elem = $QM("#" + that.id)[0];
            setTimeout(function() {
                try {
					$QM("#" + that.id +" .jemboxchild")[0].classList.add("jemboxanim");
                } catch (e) {
                    return;
                }
                opts.success && opts.success(elem);
            }, 1);
            that.idx = idx++;
            that.contype(opts);
            that.action(opts);
        },
        contype:function(opts) {
            //设置显示的类型
            var that = this, conCell = $QM("#" + that.id + " .jemboxmcont")[0], msg = opts.content;
            that._elemBack && that._elemBack();
            if (msg === undefined) return conCell;
            if (typeof msg === "string") {
                conCell.innerHTML = opts.content;
            } else if (msg && msg.nodeType === 1) {
                var wrap = doc.createElement("div");
                if (window.getComputedStyle(msg, null).display == "none") msg.style.display = "block";
                conCell.appendChild(wrap.appendChild(msg));
            }
        },
        action:function(opts) {
            var that = this;
            //自动关闭
            if (opts.time) {
                JM.timer[that.idx] = setTimeout(function() {
                    mBox.close(that.idx);
                }, opts.time * 1e3);
            }
            //关闭按钮
            if (opts.closeBtn[0]) {
                var elclose = $QM("#" + that.id + " .jemboxclose0" + opts.closeBtn[1])[0];
                JM.oneven(elclose, function() {
                    opts.closefun && opts.closefun();
                    mBox.close(that.idx);
                });
            }
            //确认取消
            if (opts.btnName != "") {
                var btnArr = $QM("#" + that.id + " .jemboxfoot")[0].children;
                for (var i = 0; i < btnArr.length; i++) {
                    JM.oneven(btnArr[i], function() {
                        var onytpe = this.getAttribute("onytpe");
                        if (onytpe == 0) {
                            opts.nofun && opts.nofun();
                        } else {
                            opts.yesfun && opts.yesfun(that.idx);
                        }
                        mBox.close(that.idx);
                    });
                }
            }
            //点遮罩关闭
            if (opts.mask && opts.maskClose) {
                var oncover = $QM("#" + that.id + " .jemboxmask")[0];
                JM.oneven(oncover, function() {
                    mBox.close(that.idx, opts.endfun);
                });
            }
            opts.endfun && (JM.endfun[that.idx] = opts.endfun);
        }
    };
    // 让传入的元素在对话框关闭后可以返回到原来的地方
    function backSitu(elem, prev, next, parent, isShow) {
        if (prev && prev.parentNode) {
            prev.parentNode.insertBefore(elem, prev.nextSibling);
        } else if (next && next.parentNode) {
            next.parentNode.insertBefore(elem, next);
        } else if (parent) {
            parent.appendChild(elem);
        }
        elem.style.display = isShow == "block" ? "block" :"none";
        this.backSitu = null;
    }
    var mBox = {
        idx:idx,
        cell:function(elem) {
            return $QM(elem)[0];
        },
        //核心方法
        open:function(options) {
            var newm = new JmLayer(options || {});
            return newm.idx;
        },
        //关闭单个层
        close:function(mid) {
            var mCell = $QM("#jembox" + mid)[0];
            if (!mCell) return;  
            if (Wcell && Wcell.nodeType === 1) {
            	backSitu(Wcell, Wprev, Wnext, Wparent, WisShow);
            }
            doc.body.removeChild(mCell);
            $QM("html")[0].style.overflowY = "";
            $QM("body")[0].style.overflowY = "";
            clearTimeout(JM.timer[idx]);
            delete JM.timer[idx];
            typeof JM.endfun[idx] === "function" && JM.endfun[idx]();
            delete JM.endfun[idx];
        },
        //关闭所有弹层
        closeAll:function() {
            var allboxs = $QM(".jemboxer");
            for (var c = 0; c < allboxs.length; c++) {
                mBox.close(allboxs[c].getAttribute("jmb"));
            }
        }
    };

	// 多环境支持
	"function" === typeof define ? define(function () { 
	    return mBox = mbox = $M = jemBox; 
	}) : ("object" === typeof module && "object" === typeof module.exports) ?  
	module.exports = mBox = $M = mbox = jemBox : window.mBox = $M = jemBox = mbox = mBox;
})(window);