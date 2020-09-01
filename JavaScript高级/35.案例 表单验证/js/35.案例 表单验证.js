// 用li布局，每行有文字、表单、span图标

window.onload = function() {
	var regtel1 = /^1[3|4|5|7|8]\d{9}$/;  // 稍微不严谨

	var regtel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
	var regQQ = /^[1-9]\d{4,}$/;
	var regname = /^[\u4e00-\u9fa5]{2,8}$/;
	//            第一个汉字——最后一个汉字
	var regmessage = /^\d{6}$/;
	var regcode = /^[a-zA-Z0-9_-]{6,16}$/;


	var tel = document.querySelector('#tel');
	var QQ = document.querySelector('#qq');
	var uname = document.querySelector('#nc');
	var message = document.querySelector('#msg');
	var pwd = document.querySelector('#pwd');
	var surepwd = document.querySelector('#surepwd');

// 电话 QQ 用户名 验证码 密码
	regtest(tel, regtel);
	regtest(QQ, regQQ);
	regtest(uname, regname);
	regtest(message, regmessage);
	regtest(pwd, regcode);
	
// 确认密码	
	surepwd.onblur = function() {
		if (this.value == pwd.value) {

			this.nextElementSibling.className = 'success';
			this.nextElementSibling.innerHTML = '<i class="success_icon"></i>输入正确';
		} else{

			this.nextElementSibling.className = 'error';
			this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请重新输入';

		}
	}
	


	function regtest(ele, reg) {
		ele.onblur = function() {
			if (reg.test(this.value)) {

				this.nextElementSibling.className = 'success';
				this.nextElementSibling.innerHTML = '<i class="success_icon"></i>输入正确';
			} else{

				this.nextElementSibling.className = 'error';
				this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请重新输入';

			}
		}
	}

	

}

