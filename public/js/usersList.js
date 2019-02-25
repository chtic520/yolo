$(document).ready(function(){

	/* 更新操作 */
	$("#updateRole").on('click', function(){
		var rows = $(".datalist").find('.i-checks:checked');
		if (rows.length == 0) {
			layer.alert('请选择一个用户！', {icon: 0, title:'提示'});
		}else if(rows.length > 1){
			layer.alert('一次只能更新一个用户！', {icon: 0, title:'提示'});
		}else{
			$.ajax({
				url: '/admin/users/role',
				type: 'POST',
				dataType: 'json',
				success: function(data){
					if (data.success) {
						$("#id").val(rows.val());
						$("#username_r").val(rows.data('name'));
						$("#role").val(rows.data('userrole'));
						$('#update_r').modal('show');
					}else{
						layer.alert(data.msg, {icon: 0, title:'警告'});
					}
				}
			})
		}
	})

	$("#updatePassword").on('click', function(){
		var rows = $(".datalist").find('.i-checks:checked');
		if (rows.length == 0) {
			layer.alert('请选择一个用户！', {icon: 0, title:'提示'});
		}else if(rows.length > 1){
			layer.alert('一次只能更新一个用户！', {icon: 0, title:'提示'});
		}else{
			$("#id").val(rows.val());
			$("#username_p").val(rows.data('name'))
			$('#update_p').modal('show');
		}
	})

	$("#r").on('click', function(){
		var $this = $(this);
		var _id = $("#id").val();
		var _role = $("#role").val();

		$this.prop('disabled', true).attr('disabled', true);

		$.ajax({
			url: '/admin/users/updater',
			type: 'POST',
			dataType: 'json',
			data: {user:{id: _id, role: _role}},
			success: function(data){
				if (data.success === 1) {
					layer.msg(data.msg);
					$('#update_r').modal('hide');
					window.location.reload();
				}else{
					layer.msg('修改权限发生错误，请重试！');
					$('#update_r').modal('hide');
				}
				$this.prop('disabled', false).attr('disabled', false);
			},
			error: function(e){
				layer.msg('服务器错误，请重试！');
				$this.prop('disabled', false).attr('disabled', false);
			}
		})
	})

	$("#p").on('click', function(){
		var $this = $(this);
		var _id = $("#id").val();
		var _password = $("#newpassword").val();
console.log(_id)
		$this.prop('disabled', true).attr('disabled', true);

		$.ajax({
			url: '/admin/users/updatep',
			type: 'POST',
			dataType: 'json',
			data: {user: {id: _id, password: _password}},
			success: function(data){
				if (data.success === 1) {
					layer.msg(data.msg);
					$('#update_p').modal('hide');
				}else{
					layer.msg('修改密码发生错误，请重试！');
					$('#update_p').modal('hide');
				}
				$this.prop('disabled', false).attr('disabled', false);
			},
			error: function(e){
				layer.msg('服务器错误，请重试！');
				$this.prop('disabled', false).attr('disabled', false);
			}
		})
	})

	/* 删除操作 */
	$("#del").on('click', function(){

		var rows = $(".datalist").find('.i-checks:checked');
		var delList = [];

		rows.each(function(){
			delList.push($(this).val())
		})

		layer.confirm('确定要删除这' + rows.length + '条数据吗', {icon: 3, title:'提示'}, function(index){
		  $.ajax({
		  	type: 'DELETE',
		  	url: '/admin/users/del',
		  	data: {'delList':delList.toString()},
		  	success: function(data){

		  		if (data.success === 1) {

						if (rows.length > 0) {

							rows.each(function(){
								$(this).parents('tr').remove();
							})

							layer.msg('用户删除成功！');
						}
					}
		  	},
		  	error: function(e){
		  		layer.msg('删除用户时遇到了问题，刷新后重新试试看~');
		  	}
		  })
		  
		  layer.close(index);
		});
	})

	
})