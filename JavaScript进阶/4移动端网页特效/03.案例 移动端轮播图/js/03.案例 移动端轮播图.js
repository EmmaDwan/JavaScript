

// 移动端移动尽情用css3


//(1).轮播图自动播放
 
	window.addEventListener('load', function() {       //是window不是windows。。。

		var focus = document.querySelector('.focus');
		var ul = focus.children[0];                    //focus的第一个子节点
		var ol = focus.children[1];

		var focusWidth = focus.offsetWidth;



	// 1 定时器
		var num = 0;  //移动计数
		var timer = setInterval(function() {

			num++;
            var dis = num * focusWidth;

            ul.style.transition = 'all .3s';                         // 2.ul添加过渡效果，有时间的消耗

			ul.style.transform = 'translateX(' +  -dis  + 'px)';      // 1.css3的transform,咔的一换，没有动画
				                                                      //         translateX
																	
		}, 1500)


    // 2 无缝滚动
            // 过渡耗时，所以要等过渡完成再判断是否到头
            // 给过度的元素添加 是否过渡完成监听事件 transition end
		ul.addEventListener('transitionend',function() {                //监听过渡(动画)完成
			console.log(1);

			if (num >= 3) {

				num = 0;

				ul.style.transition = 'none';                           //清除过渡
				var dis = num * focusWidth;  //需要重新定义
				ul.style.transform = 'translateX(' +  -dis  + 'px)';     //快速跳回，并继续滚动
				//这一步快速完成后，续上定时器里的，继续num++，继续transform(带过渡)


			} else if (num < 0) {  // 如果索引<0,说明拖动它从图1往前————(假图3)
				index = 2;         // 说明它3-2-1这么滚动

				ul.style.transition = 'none';                           //清除过渡
				var dis = num * focusWidth;  //需要重新定义
				ul.style.transform = 'translateX(' +  -dis  + 'px)';     //快速跳回，并继续滚动
			}

//(2).小圆圈变化

			//过渡完成后改变，写在过渡完成监听事件里
	
			// 1 把ol里 li带current的选出来，去掉current类名
			ol.querySelector('.current').classList.remove('current');   //干掉所有 不用循环了啊！ 
            // 2 当前索引号对应的li  添加current类名
			ol.children[num].classList.add('current');    

			// 3.它的过渡动画，在css文件里添加

		});//'过渡动画完成'监听事件结束



//(3).手指按下 拖动图片 播放

		var fingerX = 0; //全局变量不用Y，不上下
		var moveDis = 0;

		var flag = false; //针对按下不拖动的情况

	// 1 按下触摸start(落下位置)
		ul.addEventListener('touchstart',function(e) {

			fingerX = e.targetTouches[0].pageX;
			clearInterval(timer); 					      //一按下就停止计时器，不播放了
		})
    // 2 拖动move
		ul.addEventListener('touchmove', function(e) {

			moveDis = e.targetTouches[0].pageX - fingerX;
			//移盒子
			var dis = -num * focusWidth + moveDis;
			ul.style.transition = 'none';          //拖动是一丢丢来的，要取消过渡。不取消过渡反而会拖动不顺滑
			ul.style.transform = 'translateX(' + dis + 'px)';

			flag = true;
			e.preventDefault();  //防止拖动引起屏幕滚动

		});
		


//(4).手指松开
		//拖动距离<50px，回弹
		//拖动距离>50px, 继续播放
		ul.addEventListener('touchend',function() {

			if (flag) { //拖动了才判断，不拖动不看

	        // 1 继续播放
				if (Math.abs(moveDis) > 50) {         // moveDis全局变量，事件赋值。
													  // 根据拖动方向不同，可能是正值或负值
					if (moveDis > 0) {
						num--;                        // num全局变量
					} else {
						num++
					}
				var dis = -num * focusWidth;
				ul.style.transition = 'all .3s';          
				ul.style.transform = 'translateX(' + dis + 'px)';

			// 2 回弹
				} else {
					//num就不变了呗
					var dis = -num * focusWidth;
					ul.style.transition = 'all .3s';          
					ul.style.transform = 'translateX(' + dis + 'px)';
				}// if结束

			} //flag if结束

		    //重启定时器
		    clearInterval(timer);  //先清空定时器，再重启
		    timer = setInterval(function() {
				num++;

	            var dis = num * focusWidth;
	            ul.style.transition = 'all .3s';                         
				ul.style.transform = 'translateX(' +  -dis  + 'px)';      
					                                                     
													
			}, 1500)


		});
//(5).返回顶部
		var goBack = document.querySelector('.goBack');
		var nav = document.querySelector('nav');
    // 1 按钮显示和隐藏
		window.addEventListener('scroll', function() {    //window的页面滚动事件
			if (window.pageYOffset >= nav.offsetTop) {
				goBack.style.display = 'block';
			} else {
				goBack.style.display = 'none';
			}
		});
	// 2 单击返回顶部
		goBack.addEventListener('click', function() {
			window.scroll(0,0);
		});

	})