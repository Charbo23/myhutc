var bannerVarList = new Array();
//轮播图初始化函数
function initBanner(bannerId, isAuto, delayTime) {
    bannerVarList[bannerId] = new Array();
    isAuto = isAuto ? isAuto : false;
    delayTime = delayTime ? delayTime : 5000;
    autoSwitch(bannerId, isAuto, delayTime);
    var banner = document.querySelector(bannerId);
    bannerVarList[bannerId]['curBannerIndex'] = 0;
    bannerVarList[bannerId]['bannerItemList'] = banner.querySelectorAll('.banner-item');
    bannerVarList[bannerId]['bannerDotList'] = banner.querySelectorAll('.dot-item');
    //左箭头
    $(bannerId + ' .pre').on('click', function() {
        switchBanner(bannerId, bannerVarList[bannerId]['curBannerIndex'] - 1);
    });
    //右箭头
    $(bannerId + ' .next').on('click', function() {
        switchBanner(bannerId, bannerVarList[bannerId]['curBannerIndex'] + 1);
    });
    //导航点
    $(bannerId + ' .dot-item').on('mouseenter', function() {
        var currentDot = this;
        bannerVarList[bannerId]['bannerDotTimer'] = setTimeout(function() {
            bannerVarList[bannerId]['targetBannerIndex'] = parseInt(currentDot.getAttribute('data-index'));
            switchBanner(bannerId, bannerVarList[bannerId]['targetBannerIndex']);
        }, 200);
    }).on('mouseleave', function() {
        clearTimeout(bannerVarList[bannerId]['bannerDotTimer']);
    });
    //鼠标悬停停止自动播放
    if (isAuto) {
        $(bannerId).on('mouseenter', function() {
            autoSwitch(bannerId, false, delayTime);
        }).on('mouseleave', function() {
            autoSwitch(bannerId, true, delayTime);
        });
    }
}
//轮播图切换函数
function switchBanner(bannerId, targetIndex) {
    var cur_index = bannerVarList[bannerId]['curBannerIndex'];
    targetIndex = targetIndex < 0 ? 4 : targetIndex;
    targetIndex = targetIndex > 4 ? 0 : targetIndex;
    bannerVarList[bannerId]['bannerDotList'][cur_index].classList.remove('active');
    bannerVarList[bannerId]['bannerItemList'][cur_index].classList.remove('active');
    bannerVarList[bannerId]['bannerItemList'][targetIndex].classList.add('active');
    bannerVarList[bannerId]['bannerDotList'][targetIndex].classList.add('active');
    bannerVarList[bannerId]['curBannerIndex'] = targetIndex;
}
//自动轮播启停函数
function autoSwitch(bannerId, isAuto, delayTime) {
    if (isAuto) {
        bannerVarList[bannerId]['bannerSwitchTimer'] = setInterval(function() {
            switchBanner(bannerId, bannerVarList[bannerId]['curBannerIndex'] + 1);
        }, delayTime);
    } else {
        clearInterval(bannerVarList[bannerId]['bannerSwitchTimer']);
    }
}
//日期初始化函数
function initDate() {
    var curDate = new Date();
    var year = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = ("0" + (curDate.getMonth() + 1)).slice(-2); //获取当前月份(01-12)
    var date = curDate.getDate(); //获取当前日(1-31)
    var str = "星期" + "日一二三四五六".charAt(new Date().getDay());
    $('.date').html('<div class="date-top">' + date + '</div><div class="date-mid">' + month + '月' +
        '</div><div class="date-bottom">' + year + '</div>');
    $('.date').addClass('date-loaded');
}

//文档载入完毕执行
$(function() {
    //初始化轮播图
    initBanner('.home-banner', true);
    initBanner('.news-banner', true, 8000);
    //初始化日期
    initDate();
    //新闻选项卡切换
    $('.title-main').on('click', '.title-tab', function() {
        if ($(this).hasClass('active')) {
            return;
        } else {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var href = $(this).attr('data-href');
            $('#' + href).siblings().removeClass('active');
            $('#' + href).addClass('active')
        }
    })
    //底部选项卡切换
    $('.nav-tab').on('click', '.tab-block', function() {
        if ($(this).hasClass('active')) {
            return;
        } else {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var href = $(this).attr('data-href');
            $('#' + href).siblings().removeClass('active');
            $('#' + href).addClass('active')
        }
    })
})