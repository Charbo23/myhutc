var curDate = new Date();
var year = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
var month = ("0" + (curDate.getMonth() + 1)).slice(-2); //获取当前月份(01-12)
var date = curDate.getDate(); //获取当前日(1-31)
var str = "星期" + "日一二三四五六".charAt(new Date().getDay());

//主轮播图变量
var home_curBannerIndex = 0;
var home_targetBannerIndex;
var home_bannerDotTimer;
var home_bannerSwitchTimer;
var home_bannerList = document.querySelectorAll('.home-banner .banner-item');
var home_bannerDotList = document.querySelectorAll('.home-banner .dot-item');

//新闻轮播图变量
var news_curBannerIndex = 0;
var news_targetBannerIndex;
var news_bannerDotTimer;
var news_bannerSwitchTimer;
var news_bannerList = document.querySelectorAll('.news-banner .banner-item');
var news_bannerDotList = document.querySelectorAll('.news-banner .dot-item');

function switchBanner(prefix, targetBannerIndex) {
    var proxy_target = targetBannerIndex;
    var proxy_cur = eval(prefix + '_curBannerIndex');
    proxy_target = proxy_target < 0 ? 4 : proxy_target;
    proxy_target = proxy_target > 4 ? 0 : proxy_target;
    window[prefix + '_bannerDotList'][proxy_cur].classList.remove('active');
    window[prefix + '_bannerList'][proxy_cur].classList.remove('active');
    window[prefix + '_bannerList'][proxy_target].classList.add('active');
    window[prefix + '_bannerDotList'][proxy_target].classList.add('active');
    window[prefix + '_curBannerIndex'] = proxy_target;
}

function autoSwitch(prefix, toAuto) {
    if (toAuto) {
        window[prefix + '_bannerSwitchTimer'] = setInterval(function() {
            switchBanner(prefix, eval(prefix + "_curBannerIndex") + 1);
        }, 8000);
    } else {
        clearInterval(window[prefix + '_bannerSwitchTimer']);
    }

}
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}
$(function() {
    //开启自动轮播
    autoSwitch('home', true);
    autoSwitch('news',true);
    //日期加载
    $('.date').html('<div class="date-top">' + date + '</div><div class="date-mid">' + month + '月' +
        '</div><div class="date-bottom">' + year + '</div>');
    $('.date').addClass('date-loaded');

    //主轮播图
    $('.home-banner .pre').click(function() {

        switchBanner('home', home_curBannerIndex - 1);
    })
    $('.home-banner .next').click(function() {
        switchBanner('home', home_curBannerIndex + 1);
    })
    $('.home-banner .banner-dot').on('mouseover', '.dot-item', function() {
        var currentDot = this;
        home_bannerDotTimer = setTimeout(function() {
            home_targetBannerIndex = parseInt(currentDot.getAttribute('data-index'));
            switchBanner('home', home_targetBannerIndex);
        }, 200);

    })
    $('.home-banner .banner-dot').on('mouseleave', '.dot-item', function() {
        clearTimeout(home_bannerDotTimer);
    })
    $('#container').on('mouseover', '.home-banner', function() {
        autoSwitch('home', false);
    })
    $('#container').on('mouseleave', '.home-banner', function() {
        autoSwitch('home', true);
    })
    //新闻轮播图
    $('.news-banner .pre').click(function() {
        switchBanner('news', news_curBannerIndex - 1);
    })
    $('.news-banner .next').click(function() {
        switchBanner('news', news_curBannerIndex + 1);
    })
    $('.news-banner .banner-dot').on('mouseover', '.dot-item', function() {
        var currentDot = this;
        news_bannerDotTimer = setTimeout(function() {
            news_targetBannerIndex = parseInt(currentDot.getAttribute('data-index'));
            switchBanner('news', news_targetBannerIndex);
        }, 200);

    })
    $('.news-banner .banner-dot').on('mouseleave', '.dot-item', function() {
        clearTimeout(news_bannerDotTimer);
    })
    $('#container').on('mouseover', '.news-banner', function() {
        autoSwitch('news', false);
    })
    $('#container').on('mouseleave', '.news-banner', function() {
        autoSwitch('news', true);
    })

    //新闻选项卡切换
    $('.title-main').on('click', '.title-tab', function(){
        if($(this).hasClass('active')){
            return;
        }else{
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var href=$(this).attr('data-href');
            $('#'+href).siblings().removeClass('active');
            $('#'+href).addClass('active')
        }
    })

    //底部选项卡切换
    $('.nav-tab').on('click', '.tab-block', function(){
        if($(this).hasClass('active')){
            return;
        }else{
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var href=$(this).attr('data-href');
            $('#'+href).siblings().removeClass('active');
            $('#'+href).addClass('active')
        }
    })
})