
// 1 有几张图，下面就由几个小圆圈
// 2 鼠标经过，左右按钮显示，鼠标离开，左右按钮隐藏
// 3 单击右侧按钮，图往左播一张，下面小圆圈同步。反之亦然
// 4 单击小圆圈也可以实现2
// 5 轮播图自动播放
// 6 鼠标经过，自动播放停止


window.addEventListener('load', function() {                   //页面全部加载完成 再调用

		var arrowL = document.querySelector('.arrow-l');
		var arrowR = document.querySelector('.arrow-r');
		var focus  = document.querySelector('.focus');

		var focusWidth = focus.offsetWidth;        //整个ul的宽  4.(2)提出来的


// 1.鼠标经过
		focus.addEventListener('mouseenter',function() {

			arrowL.style.display = 'block';
			arrowR.style.display = 'block';

            // 8.2 清除定时器  
			clearInterval(timer);
			timer = none;

		})

// 2.鼠标离开
		focus.addEventListener('mouseleave',function() {

			arrowL.style.display = 'none';
			arrowR.style.display = 'none';

            // 8.1 设定时器
			timer = setInterval(function() {     //事件里重设不要var,8部分已经声明过了

				arrowR.click()    

			}, 1500)	

		})



// 3.动态生成小圆圈	
		var ul = focus.querySelector('ul');                //必须限定focus里得ul(focus元素前面获取过了)
		var ol = focus.querySelector('.circle');

		
		for (var i = 0; i < ul.children.length; i++) {     // 1.根据li的个数，ul.children.length，
														   //   循环生成小圆圈，放入ol
														   //			
			var ol_li = document.createElement('li');      // 2.创建节点 createElement('')

			ol_li.setAttribute('index', i)                 // 3.自定义属性，顺手给生成的小圆圈添加 索引号
			ol.appendChild(ol_li);						   // 4.插入节点，插入到ol下面， ol.appendchild( )
				
				// 4.单击小圆圈
	 			//(1)小圆圈变色
	
				// 不单击没事啊，不会影响下面的第一个li设置
				// (顺便在for里面添加click事件)
			ol_li.addEventListener('click', function() {
				
				for (var i = 0; i < ol.children.length; i++) {   // 1.干掉所有人 清除current类名

					ol.children[i].className = '';         
				}

				this.className = 'current';                      // 2.复活自己   当前li设置current类名


	 
	  			//(2)上面播放图片	
	  				//是整个ul在移动
	  				
		  		// var focusWidth = focus.offsetWidth;     //整个ul的宽
		  		var index = this.getAttribute('index');    //获得 小圆圈li的索引号
 	// 6.1
		  		num = index;     //不要var
	// 6.2
		  		circle = index;  //不要var 此处只是click发生后的赋值，声明在第6部分

		  		
		  		dis = -(index * focusWidth);              //索引号 * 整个ul宽  负方向
		  		animate(ul, dis);
				
			})//click事件结束 



		}//for循环结束

		//3.2 第一个小圆圈白色
		ol.children[0].className = 'current';             //第一个li设类current，css里显示实心浅色





		
// 5.克隆第一张图片 自动化，且小圆圈会多
		var first = ul.children[0].cloneNode(true);     //真克隆 第一个li
		ul.appendChild(first);                          //插入ul里的最后一个元素

		//无缝滚动
		//		克隆第一张，放到最后面，不过动画跳到最左侧第一张
 




		
		var circle = 0;  //   控制小圆圈
		var num = 0;     //   控制图片


// 9.节流阀flag        
        var flag = true



// 6.单击右侧按钮
		arrowR.addEventListener('click', function() {

			if (flag) {
				flag = false;
			
		// 1 图片轮播
				if (num == ul.children.length - 1) {  // ul.children.length = 5
					ul.style.left = 0;    			  // num = 4的时候让它跳0,即图片走到第5张时迅速跳第1张
					num = 0;                         
				}
				
				num++;                                 
	  
				dis2 = num * focusWidth;
				animate(ul,-dis2,waterTap);
	    // 2 小圆圈轮播
				circle++;  // num++后，小圆圈也要跟着++

				if (circle == ol.children.length) {   // ol.children.length = 4
					circle = 0;                       // circle = 3的时候让它跳0,即小圆圈走到第4个的时候迅速跳第1个
				} 									  //此处circle先+1，所以=4的时候跳0

	            //调用函数 改小圆圈颜色
				currentCircle();
			

            } //节流阀if结束
		});	





// 7.单击左侧按钮		 
		arrowL.addEventListener('click', function() {

			if (flag) {
				flag = false;

				// 1 图片轮播
				if (num == 0) {

					num = ul.children.length - 1;      		   //num = 0的时候让它跳4(第5张)
															   
															   
					ul.style.left = -num*focusWidth + 'px';    // 迅速跳4*width 要加px!!!!
					
				}
				
				num--;                                 		  
	  
				dis2 = num * focusWidth;
				animate(ul,-dis2,waterTap);

	    		// 2 小圆圈轮播
	            // num--后，小圆圈也要跟着--
				circle--;  


				if (circle < 0) {
					circle = ol.children.length - 1;          //让小圆圈<0的时候 迅速跳3
				} 
				// circle = circle < 0 ? ol.children,length - 1 : circle;
				 
				 
	            //调用函数 改小圆圈颜色
				currentCircle();

			}

		});

		function currentCircle() {

			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = '';               //干掉所有
			}

			ol.children[circle].className = 'current';       //复活自己


		}

		function waterTap() {
			flag = true;         //打开节流阀
		}

// 8.自动播放
		
		var timer = setInterval(function() {

			//手动调用click事件(相当于在页面里点了)
			arrowR.click()    

		}, 1500)		
		
		
		


})
