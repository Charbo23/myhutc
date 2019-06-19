var myDate = new Date();
var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
var month = ("0" + (myDate.getMonth() + 1)).slice(-2); //获取当前月份(01-12)
var date = myDate.getDate(); //获取当前日(1-31)
var str = "星期" + "日一二三四五六".charAt(new Date().getDay());
var bannerIndex = 0;
var bannerList = document.querySelectorAll('.banner-item');
var bannerDotList = document.querySelectorAll('.dot-item');
var bannerDotTimer;
var newIndex;
$(function() {
    //日期加载
    $('.date').html('<div class="font1">' + date + '</div><div class="font2">' + month + '月' +
        '</div><div class="font3">' + year + '</div>');
    $('.date').addClass('date-loaded');

    $('.pre').click(function() {
        
        newIndex=bannerIndex-1;
        newIndex = newIndex < 0 ? 4 : newIndex;
       switchBanner(newIndex);
    })
    $('.next').click(function() {
        newIndex=bannerIndex+1;
        newIndex = newIndex > 4 ? 0 : newIndex;
        
        switchBanner(newIndex);
    })
    $('.banner-dot').on('mouseover', '.dot-item', function() {
        var currentDot=this;
        bannerDotTimer = setTimeout(function() {
            
           
            newIndex = parseInt(currentDot.getAttribute('data-index'));
            switchBanner(newIndex);
        },200);

    })
    $('.banner-dot').on('mouseleave', '.dot-item', function() {
        clearTimeout(bannerDotTimer);

    })
    function switchBanner(newIndex){
        bannerDotList[bannerIndex].classList.remove('active');
        bannerList[bannerIndex].classList.remove('active');
        bannerList[newIndex].classList.add('active');
        bannerDotList[newIndex].classList.add('active');
        bannerIndex=newIndex;
    }
})