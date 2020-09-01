// 全选思路:
// 		1.当全选框checkall选中 3个小的复选框j-checkedbox全选中
// 						 反选 						  全反选
// 						 
// 		2.每戳小按钮，判断一次几个被选中。3个选中则全选选中

$(function() {


// 一、全选
	// 1.全选框 影响小选框
	
	$(".checkall").change(function() {     //当全选框发生变化 即执行 change()

		// $(this).prop("checked");										     //利用prop()得到值
		$(".j-checkbox,.checkall").prop("checked",$(this).prop("checked"));  //利用prop()赋值 给小选框们
		// 上下两个同类明全选框，用并集选择器


		// 六、选中改变条目背景		
		if ($(this).prop("checked")) {

			$(".cart-item").addClass("check-cart-item");

		} else {
			$(".cart-item").removeClass("check-cart-item");

		}
	});



	// 2.小选框 影响全选框
	
	$(".j-checkbox").change(function() {

		// console.log($(".j-checkbox:checked").length);   //checked删选方法，得到伪数组，取其长度
		if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {

			$(".checkall").prop("checked",true);

		} else {

			$(".checkall").prop("checked",false);

		}



		// 六、选中改变条目背景			
		if ($(this).prop("checked")) {

			$(this).parents(".cart-item").addClass("check-cart-item");

		} else {
			$(this).parents(".cart-item").removeClass("check-cart-item");

		}


	});



// 二、增减商品数量

// 声明一个变量，单击+号，变量++ 赋值给文本框
 

// 1.增
	$(".increment").click(function() {

		var num = $(this).siblings(".itxt").val();    // 只取这个加号旁边的文本框(别的文本框不能动)
													  // 获取表单的值 val()
		num++;
		$(this).siblings(".itxt").val(num);			  // val(num) 不加" "




	// 3.商品小计
		var price = $(this).parent().parent().siblings(".p-price").html();   //从当前this出发
		price = price.substr(1);  //去掉￥

		var sum = (price * num).toFixed(2);  //保留两位小数
		$(this).parent().parent().siblings(".p-sum").html("￥" + sum);  


		getSum();

	})


// 2.减
	$(".decrement").click(function() {

		var num = $(this).siblings(".itxt").val();    

		if (num == 1) {
			return false       // 如果num=1，后面代码就不执行了
		}

		num--;
		$(this).siblings(".itxt").val(num);			




	// 3.商品小计
		var price = $(this).parent().parent().siblings(".p-price").html();   
		price = price.substr(1);  

		var sum = (price * num).toFixed(2);  //保留两位小数
		$(this).parents(".p-num").siblings(".p-sum").html("￥" + sum);    //parents()返回指定祖先元素


		getSum();
	})

// 三、商品数量表单变化
		$(".itxt").change(function() {

			
 			var num = $(this).val();  //当前文本框的值

			var price = $(this).parents(".p-num").siblings(".p-price").html();   
			price = price.substr(1);  

			var sum = (price * num).toFixed(2);  //保留两位小数
			$(this).parents(".p-num").siblings(".p-sum").html("￥" + sum);    //parents()返回指定祖先元素

			getSum();

		})	



// 四、价格总计
		function getSum() {

			var numSum = 0;
			var priceSum = 0;

		// 总计
			$(".itxt").each(function(i,ele) {

				numSum += parseInt($(ele).val());    // 遍历所有小文本框.itxt,，取文本框的值，求和
									// 字符串 转 数值

			})

			$(".amount-sum em").text(numSum);   // 修改总数量


		//总额
			$(".p-sum").each(function(i,ele) {
				priceSum += parseFloat($(ele).text().substr(1));    
									// 去掉￥
									// 字符 转 数值

			})

			$(".price-sum em").text("￥" + priceSum.toFixed(2));
		}


// 五、删除商品
	

		// 小删除(单独删除)
		$(".p-action").click(function(event) {

			$(this).parents(".cart-item").remove();   //移除条目自己
			getSum();

		});



		// 大删除(选中删除)
		$(".remove-batch").click(function(event) {

			$(".j-checkbox:checked").parents(".cart-item").remove();   // 用checked筛选 选中的元素
			getSum();

		});



		// 全部删除
		$(".clear-all").click(function(event) {
			
			$(".cart-item").remove();

			getSum();
		});

// 六、选中改变条目背景
// 			写在第一部分里，必须写在单击事件里
		







})

