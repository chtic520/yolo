$(document).ready(function(){
	var uri = window.location.href;
	var msg = getQuery('msg', uri);

	switch (msg) {
		case 'norole':
			$("#msg").addClass('callout callout-danger').html('<p>你没有权限访问该模块，请用有该权限的账号登录！</p>');
			break;
		case 'nologin':
			$("#msg").addClass('callout callout-danger').html('<p>登录超时或未登录！</p>');
			break;
	}

	$("#login").on('click', function(e){
		e.preventDefault();

		var $username = $("#username").val(),
			$password = $("#password").val(),
			$this = $(this);

		if($username == ''){
			layer.tips('请输入登录名!', '#username', {tips: 1});
			return false
		}else if($password == ''){
			layer.tips('请填写密码！', '#password', {tips: 1});
			return false
		}else{
			$this.prop("disabled", true).attr("disabled", true).html('正在登录');
			
			$.ajax({
				url: '/login',
				type: 'POST',
				dataType: 'json',
				data: {user: {name: $username, password: $password}},
				success: function(data){
					switch(data.success){
						case 0:
							$("#msg").addClass('callout callout-danger').html('<p>' + data.msg + '</p>');
							$this.prop("disabled", false).attr("disabled", false).html('登录');
							break;
						case 1:
							window.location.href = '/admin';
							break;
					}
				},
				error: function(e){
					$("#msg").addClass('callout callout-danger').html('<p>错误：' + e.status + '<br>登录遇到了问题，请重试！</p>');
					$this.prop("disabled", false).attr("disabled", false).html('登录');
				}
			})
		}
	})

	$("#forget").on('click', function(){
		layer.alert('请联系管理员修改密码！')
	})
})