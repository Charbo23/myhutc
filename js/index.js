var myDate = new Date();
var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
var month = ("0" + (myDate.getMonth() + 1)).slice(-2); //获取当前月份(01-12)
var date = myDate.getDate(); //获取当前日(1-31)
var str = "星期" + "日一二三四五六".charAt(new Date().getDay());

//主轮播图变量
var home_curBannerIndex = 0;
var home_targetBannerIndex;
var home_bannerDotTimer;
var home_bannerSwitchTimer;
var home_bannerList = document.querySelectorAll('.banner-item');
var home_bannerDotList = document.querySelectorAll('.dot-item');

//新闻轮播图变量
var news_curBannerIndex = 0;
var news_targetBannerIndex;
var news_bannerDotTimer;
var news_bannerSwitchTimer;
var news_bannerList = document.querySelectorAll('.banner-item');
var news_bannerDotList = document.querySelectorAll('.dot-item');

$(function() {
    autoSwitch(true);
    //日期加载
    $('.date').html('<div class="font1">' + date + '</div><div class="font2">' + month + '月' +
        '</div><div class="font3">' + year + '</div>');
    $('.date').addClass('date-loaded');

    //主轮播图
    $('.pre').click(function() {
        
        switchBanner(home_curBannerIndex - 1);
    })
    $('.next').click(function() {
        switchBanner(home_curBannerIndex + 1);
    })
    $('.banner-dot').on('mouseover', '.dot-item', function() {
        var currentDot = this;
        home_bannerDotTimer = setTimeout(function() {
            home_targetBannerIndex = parseInt(currentDot.getAttribute('data-index'));
            switchBanner(home_targetBannerIndex);
        }, 200);

    })
    $('.banner-dot').on('mouseleave', '.dot-item', function() {
        clearTimeout(home_bannerDotTimer);

    })
    $('#container').on('mouseover', '.banner', function() {
        autoSwitch(false);
    })
    $('#container').on('mouseleave', '.banner', function() {
        autoSwitch(true);
    })

    function switchBanner(home_targetBannerIndex) {
        home_targetBannerIndex = home_targetBannerIndex < 0 ? 4 : home_targetBannerIndex;
        home_targetBannerIndex = home_targetBannerIndex > 4 ? 0 : home_targetBannerIndex;
        home_bannerDotList[home_curBannerIndex].classList.remove('active');
        home_bannerList[home_curBannerIndex].classList.remove('active');
        home_bannerList[home_targetBannerIndex].classList.add('active');
        home_bannerDotList[home_targetBannerIndex].classList.add('active');
        home_curBannerIndex = home_targetBannerIndex;
    }

    function autoSwitch(toAuto) {
        if (toAuto) {
            home_bannerSwitchTimer = setInterval(function() {
                switchBanner(home_curBannerIndex + 1);
            }, 1000);
        } else {
            clearInterval(home_bannerSwitchTimer);
        }

    }
    //新闻轮播图

})