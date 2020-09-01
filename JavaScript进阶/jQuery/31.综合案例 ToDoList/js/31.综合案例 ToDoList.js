
$(function() {


// 1 按回车 生成待办 					    —————— title属性
// 2 单击待办复选框——完成，再单击——未完成  —————— done属性
// 3 刷新内容不丢失  						—————— 本地存储
// 4 所有数据 先对本地存储 进行操作  (以前那种是存在内存里，一刷新就没了)

	// local不是 lacal！
	// JSON 不是 JAON ！
	 
	//arr: 用户输入——本地存储的 媒介数组，存的对象
	//ToDo:    本地存储的数据名称
	//localStorage.getItem("ToDo")
	//localStorage.setItem("ToDo", arr)		"todo"键，arr值
	//jQ对表单元素读写 用.val(),相当于原生JS的value
	//element.empty() 清空数据
	//$.each(要遍历的元素，function(索引，每个元素))
	



		load();    //0.每次刷新，这些数据直接就有了，不按回车也行

//1.输入框按下回车， 读取-更新数组-存入   									
		$("#title").on("keydown",function(e) { 

			if (e.keyCode === 13) {    // 按下回车

				if($(this).val() === "") {

				} else {
					// 读(数组初始化)
					var arr = getLocal(); 
					// 数组追加数据
					arr.push({
						title: $(this).val(),			// 用户输入的值，即表单text内容
						done: false					    // 刚输入都是未完成
					});
					// 数组存入本地存储
					saveLocal(arr);
					// 渲染加载
					load();
					//当前输入框清空
					$(this).val("");
				}			
			}
		})												

	// 总要用的函数们
   		//  1).读取本地存储 (需要判断local存储有没有数据)
		function getLocal() {  
 
			var localData = localStorage.getItem("ToDo");

			if (localData !== null) {
				return JSON.parse(localData);  // 要是本地存储本来有数据，就字符串转对象
			} else {
				return [];				       // 要是本地存储本来没有，就返回一个空数组，相当于给myarray声明了
			}	
		}

		//  2).保存本地存储
		function saveLocal(myarray) {  // 有形参
			localStorage.setItem("ToDo",JSON.stringify(myarray));   // 转为字符串 存入localStorage
		}


		//  3).渲染、加载到页面   (本地存储的数据)	
		function load() {
			//读取
			var arr = getLocal();
			//清空ol
			$("ol,ul").empty();  //不然每次都重复添加之前的
			//计数
			var todoC = 0;
			var doneC = 0;
			// 遍历
			$.each(arr, function(i,ele) {   //$.each(要遍历的元素，function(索引，每个元素))

				// arr是要遍历的数组，ele是里面的每个元素(每个对象)
				if (ele.done) {   //遍历到的当前对象
					
					$("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascript:;' id="+ i +" </a></li>");
					
					doneC++;
				} else {
					
					$("ol").prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;' id="+ i +" </a></li>");
					
					todoC++;
				}
			});
			$("#todocount").text(todoC);
			$("#donecount").text(doneC);
		} 

// 2.按下小圆钮，删除本条数据(从本地存储)
		$("ol").on("click","a",function() {

			//读取
			var arr = getLocal();
			//获取序号，从数组中删除对应条目
			var index = $(this).attr("id");   // 自定义属性id
			arr.splice(index,1);   		      // data就是个数组
			// 数组重存本地
			saveLocal(arr);
			//重渲染
			load();

		});
// 3.小选框选中——已完成，反选——正在进行
		$("ol,ul").on("click","input",function() {    // 事件委托
													   // 并集选择器 ol和ul里的按钮都要选上
			//读取
			var arr = getLocal();
			// done属性修改
			var index = $(this).siblings("a").attr("id");   //兄弟a已经有索引号了
			arr[index].done = $(this).prop("checked");      // 固有属性checked (input的)
				// 数组里 对应对象的done属性 = 复选框状态
			// 数组重存本地
			saveLocal(arr);
			// 重渲染
			load();
		})
// 4.统计 未完成 已完成个数
		
		




})
