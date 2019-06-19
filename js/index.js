var myDate = new Date();
var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
var month = ("0" + (myDate.getMonth() + 1)).slice(-2); //获取当前月份(01-12)
var date = myDate.getDate(); //获取当前日(1-31)
var str = "星期" + "日一二三四五六".charAt(new Date().getDay());
var bannerIndex = 0;
var bannerList = document.querySelectorAll('.banner-item');
var bannerDotList = document.querySelectorAll('.dot-item');
var bannerDotTimer;
$(function() {
    //日期加载
    $('.date').html('<div class="font1">' + date + '</div><div class="font2">' + month + '月' +
        '</div><div class="font3">' + year + '</div>');
    $('.date').addClass('date-loaded');

    $('.pre').click(function() {
        bannerList[bannerIndex].classList.remove('active');
        bannerIndex--;
        bannerIndex = bannerIndex < 0 ? 4 : bannerIndex;
        bannerList[bannerIndex].classList.add('active');
    })
    $('.next').click(function() {
        bannerList[bannerIndex].classList.remove('active');
        bannerIndex++;
        bannerIndex = bannerIndex > 4 ? 0 : bannerIndex;
        bannerList[bannerIndex].classList.add('active');
    })
    $('.banner-dot').on('mouseover', '.dot-item', function() {
        var currentDot=this;
        bannerDotTimer = setTimeout(function() {
            bannerList[bannerIndex].classList.remove('active');
            bannerDotList[bannerIndex].classList.remove('active');
            currentDot.classList.add('active');
            bannerIndex = currentDot.getAttribute('data-index');
            bannerList[bannerIndex].classList.add('active');
        },200);

    })
    $('.banner-dot').on('mouseleave', '.dot-item', function() {
        clearTimeout(bannerDotTimer);

    })
})