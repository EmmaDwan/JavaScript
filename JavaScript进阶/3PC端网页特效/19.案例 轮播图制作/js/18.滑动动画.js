

// 滑动动画
function animate(obj,target,callback) {            //回调函数当做一个形参

			clearInterval(obj.timer);

			obj.timer = setInterval(function() {

				if (obj.offsetLeft == target) {                         
					clearInterval(obj.timer);

					// if (callback) {                        //回调函数要写在 停止条件里
					// 	callback();                        //判断 如果有回调函数，就执行该函数
					// }
                    
                    //替代
					callback && callback();   //短路运算，第一个true，第二个true(执行第二个)
											  //短路运算，第一个false，不看第二个了


				}
                   
				var step = (target - obj.offsetLeft) / 10;

				step = step > 0 ? Math.ceil(step) : Math.floor(step);
					

				obj.style.left = obj.offsetLeft + step + 'px';          

			}, 15)   
		}
