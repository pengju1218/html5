// JavaScript Document
!function(){

var demo = {};
demo.trys = function(index){
    
    //提示框
    if(index === 0){
        mBox.open({
            content: '世界您好！'
        });
    } 
    
    //信息框
    else if(index === 1){
        mBox.open({
            title: ['信息','border-bottom: 1px solid #EBEBEB;']
            ,content: '移动版和PC版不能同时存在同一页面'
            ,btnName: ['我知道了']
        });
    } 
    
    //询问框
    else if(index === 2){
        mBox.open({
            title: ['提示','border-bottom: 1px solid #EBEBEB;'],
            content: '您确定要刷新一下本页面吗？',
            btnName: ['是的', '不要'],
            yesfun: function(index){
                location.reload();
                mBox.close(index);
            }
        });
    } 
    
    //页面层
    else if(index === 3){
        mBox.open({
            boxtype: 2,
            content: '可传入任何内容，支持html。一般用于手机页面中',
            conStyle: 'background-color:#fff;position:fixed; bottom:0; left:0; width:100%; height:150px; padding:10px 0; border:none;'
        });
    }
    
    //加载条
    else if(index === 4){
        mBox.open({
            boxtype: 3,
            conStyle: 'text-align:center;',
			maskColor:"rgba(0,0,0,0.8)",
			time: 5,
            content: '<div class="jemboxloadspin"><div class="jemboxloading"></div></div><p style="line-height:20px;">加载测试中</p>'
        });
    }
};

if(window.trys){
    var tryas = trys.getElementsByTagName('a');
    for(var i = 0, len = tryas.length; i < len; i++){
        (function(i){
            tryas[i].addEventListener('click', function(){
                demo.trys(i);
            });
        }(i));
    };
}

}();