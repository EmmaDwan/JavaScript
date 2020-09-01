// 鼠标经过商品图盒子，遮挡层 和 大盒子显示
// 鼠标移动，黄色遮挡层跟随，大盒子内容跟随


// 让页面加载完，再执行JS
	window.addEventListener('load', function() {    


		var previewImg = document.querySelector('.preview_img');
		var mask = document.querySelector('.mask');
		var big = document.querySelector('.big');


// 1.鼠标放上显示 和 鼠标离开掩藏 
		previewImg.addEventListener('mouseover',function() {
			mask.style.display = 'block';
			big.style.display = 'block';
		})

		previewImg.addEventListener('mouseout',function() {
			mask.style.display = 'none';
			big.style.display = 'none';

		})


// 2.鼠标移动，遮挡层跟着移动 

		previewImg.addEventListener('mousemove',function(e) {

            //鼠标在盒子内的坐标 = 鼠标距离body - 盒子距离body  —————— 左上角对齐
			var deltaX = e.pageX - this.offsetLeft;
			var deltaY = e.pageY - this.offsetTop;

            //移动的距离
			moveX = deltaX - mask.offsetWidth/2;  //让遮挡层往下往右走这个delta的距离，并 - 遮挡层/2，以水平居中
			moveY = deltaY - mask.offsetHeight/2 ;


		//判断，不要出界  <0,设0  ———— >最大，设最大值
			maskMoveMaxX = previewImg.offsetWidth - mask.offsetWidth;
			maskMoveMaxY = previewImg.offsetHeight - mask.offsetHeight;
			//左右
			if (moveX <= 0) {
				moveX = 0;
			} else if (moveX >= maskMoveMaxX) {
				moveX = maskMoveMaxX;
			} 

            //上下
			if (moveY <= 0) {
				moveY = 0;
			} else if (moveY >= maskMoveMaxY) {
				moveY = maskMoveMaxY;
			}

            //赋值
			mask.style.left = moveX + 'px';
			mask.style.top = moveY + 'px';

											// 和04拖拽案例区别：
											// 					04拖拽 是让login移动距离为： 新鼠标位置 - delta
											// 					05放大镜 是让遮挡层移动距离为： delta
											// 					
// 3.修改大图内容

			var img = document.querySelector('.bigImg');
			var imgMoveMax = img.offsetWidth - big.offsetWidth;


            //   大图移动距离 = 遮挡层移动 / 遮挡层最大移动 * 大图片最大移动 	
			var deltaImgX = moveX * imgMoveMax / maskMoveMaxX;   
			var deltaImgY = moveY * imgMoveMax / maskMoveMaxY; 

			//鼠标往右，图往左走，所以应该是负值
			img.style.left = - deltaImgX + 'px';   
			img.style.top = - deltaImgY + 'px';
				

		})
        //鼠标移动事件结束

	}) 
