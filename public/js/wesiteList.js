$(document).ready(function(){
	/* 查看图片 */
	$('.datalist').on('click', '.thumImg', function(e){
		e.stopPropagation();  
  
	})
	layer.photos({
	  photos: '.datalist'
	}); 

	/* 更新操作 */
	$("#update").on('click', function(){
		var rows = $(".datalist").find('.i-checks:checked');
		if (rows.length == 0) {
			layer.alert('请选择一条案例更新！', {icon: 0, title:'提示'});
		}else if(rows.length > 1){
			layer.alert('一次只能更新一条案例！', {icon: 0, title:'提示'});
		}else{
			location.href = $(this).data("href") + rows.val();
		}
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
		  	url: '/admin/wemedia/wesite/del',
		  	data: {'delList':delList.toString()},
		  	success: function(data){

		  		if (data.success === 1) {

						if (rows.length > 0) {

							rows.each(function(){
								$(this).parents('tr').remove();
							})

							layer.msg('数据删除成功！');
						}
					}
		  	},
		  	error: function(e){
		  		layer.msg('删除数据时遇到了问题，刷新后重新试试看~');
		  	}
		  })
		  
		  layer.close(index);
		});
	})

	
})