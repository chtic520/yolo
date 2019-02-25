$(document).ready(function(){
	/* 查看图片 */
	$('.datalist').on('click', '.thumImg', function(e){
		e.stopPropagation();  
  
	})
	layer.photos({
	  photos: '.datalist'
	}); 

	/* 控制首页是否展示 */
	$('.i-switch').on('switchChange.bootstrapSwitch', function(e, state) {
		var _onItems = parseInt($("#onItems").val()),
				$this = $(this);

	  if (state && _onItems < 2) {

	  	$.ajax({
	  		type: 'POST',
	  		url: '/admin/news/display',
	  		data: {'id': $this.data('id'), 'on': true},
	  		success: function(data){
	  			if (data.success === 1 && $this) {

	  				$("#onItems").val(_onItems + 1);
						layer.msg('首页展示成功！');

					}
	  		},
	  		error: function(e){
	  			layer.msg('执行操作时遇到了问题，刷新后重新试试看~');
	  		}
	  	})

	  	
	  }else if(state && _onItems >= 2){
	  	layer.msg('只能选择4条案列在首页展示！');
	  	$this.bootstrapSwitch('state', false);
	  }else if(!state && _onItems < 2){
	  	
	  	$.ajax({
	  		type: 'POST',
	  		url: '/admin/news/display',
	  		data: {'id': $this.data('id'), 'on': false},
	  		success: function(data){
	  			if (data.success === 1 && $this) {

	  				$("#onItems").val(_onItems - 1);
						layer.msg('撤销展示成功！')

					}
	  		},
	  		error: function(e){
	  			layer.msg('执行操作时遇到了问题，刷新后重新试试看~');
	  		}
	  	})
	  	
	  }
	});

	/* 更新操作 */
	$("#update").on('click', function(){
		var rows = $(".datalist").find('.i-checks:checked');
		if (rows.length == 0) {
			layer.alert('请选择一篇资讯更新！', {icon: 0, title:'提示'});
		}else if(rows.length > 1){
			layer.alert('一次只能更新一篇资讯！', {icon: 0, title:'提示'});
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
		  	url: '/admin/news/del',
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