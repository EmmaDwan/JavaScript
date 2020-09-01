



		function animate(obj,target,callback) {            

			clearInterval(obj.timer);

			obj.timer = setInterval(function() {

				if (obj.window.pageYOffset == target) {                         
					clearInterval(obj.timer);

					if (callback) {                        
						callback();                       
					}


				}


		//页面滚动了多少距离，通过window.pageYOffset得到
                // console.log(target - obj.window.pageYOffset);   
                // window.pageYOffset是不断变化的，将逐渐缩小的距离差/10，就是缓动
				var step = (target - obj.window.pageYOffset) / 10;
				// console.log(step);

				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				// console.log(step);

					

				// obj.style.left = obj.offsetLeft + step + 'px';  左右滑动
				
		// 用window.scroll(x,y) 立即滚动 不加px
				window.scroll(0,obj.window.pageYOffset + step);        

			}, 15)   
		}