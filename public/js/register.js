$(document).ready(function(){
	$("#register").on('click', function(){
		var $username = $("#username").val(),
			$password = $("#password").val(),
			$confirmPW = $("#confirmPW").val(),
			$this = $(this);

		var regUN = new RegExp('(^[a-zA-Z]+[a-zA-Z0-9_@]*).{4,12}$');
		var regPW = new RegExp('(?=.*).{6,30}$');

		if($username == ''){
			layer.tips('请输入登录名!', '#username', {tips: 1});
			return false
		}else if(!regUN.test($username) || $username.length > 12){
			layer.tips('登录名格式错误！', '#username', {tips: 1});
			return false
		}else if($password == ''){
			layer.tips('请填写密码！', '#password', {tips: 1});
			return false
		}else if (!regPW.test($password)) {
			layer.tips('密码格式错误！', '#password', {tips: 1});
			return false
		}else if($confirmPW == ''){
			layer.tips('请确认密码', '#confirmPW', {tips: 1});
			return false
		}else if($password !== $confirmPW){
			layer.tips('两次密码输入不一致，请确认！', '#confirmPW', {tips: 1});
			return false
		}else{
			$this.prop("disabled", true).attr("disabled", true).html('正在注册');
			
			$.ajax({
				url: '/register',
				type: 'POST',
				dataType: 'json',
				data: {user: {name: $username, password: $password}},
				success: function(data){
					switch(data.success){
						case 0:
							$("#msg").addClass('callout callout-danger').html('<p>' + data.msg + '</p>');
							$this.prop("disabled", false).attr("disabled", false).html('注册');
							break;
						case 1:
							window.location.href = '/admin';
							break;
					}
				},
				error: function(e){
					$("#msg").addClass('callout callout-danger').html('<p>错误：' + e.status + '<br>注册遇到了问题，请重试！</p>');
					$this.prop("disabled", false).attr("disabled", false).html('注册');
				}
			})
		}
	})
})