
$(function() {

		var dis = $(".recommend").offset().top;   //top不加括号，它是对象里的属性
		tabShow(dis);                                //不滚动，在固定位置，tab栏也能显示隐藏


// 1.滚动到一定位置，出现导航栏
		$(window).scroll(function() {

			tabShow(dis);


// 3.滚动到一定位置，导航栏对应区域变色
			$(".floor .w").each(function(i,ele) {

				var iDis = $(ele).offset().top;
				if ($(document).scrollTop() >= iDis) {   // 其实这个操作相当于，每轻微滚动一下，都要遍历一遍
					// console.log(i);
					$(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
				}
			})

		})
		// 函数
		function tabShow(dis) {
			if ($(document).scrollTop() >= dis) {
				$(".fixedtool").fadeIn();
			} else {
				$(".fixedtool").fadeOut();

			}
		}

// 2.单击导航，可以滚动到相应区域
		$(".fixedtool li").click(function() {

			var index = $(this).index();
			var currentDis = $(".floor .w").eq(index).offset().top;

			$("body, html").stop().animate({
				scrollTop: currentDis
			})

			// tab对应块变色
			$(this).addClass("current").siblings().removeClass("current");

		})
		

})
