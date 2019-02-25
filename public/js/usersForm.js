$(document).ready(function(){

	$("#sub").on('click', function(e){
		e.preventDefault();

		if ($("#name") && '' == $("#name").val().trim()) {
			layer.tips('请添加用户名！', '#name', {tips: 1});
			return;
		};

		if ($("#password") && '' == $("#password").val()) {
			layer.tips('请添加用户密码！', '#password', {tips: 1});
			return;
		}

		$("#addForm").submit();
	})
	
})