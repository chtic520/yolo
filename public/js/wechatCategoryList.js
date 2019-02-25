$(document).ready(function(){

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
		  	url: '/admin/wemedia/wechat/category',
		  	data: {'delList':delList.toString()},
		  	success: function(data){

		  		if (data.success === 1) {

						if (rows.length > 0) {

							rows.each(function(){
								$(this).parents('tr').remove();
							})

							layer.msg('标签删除成功！');
						}
					}
		  	},
		  	error: function(e){
		  		layer.msg('删除标签时遇到了问题，刷新后重新试试看~');
		  	}
		  })
		  
		  layer.close(index);
		});
	})

	
})