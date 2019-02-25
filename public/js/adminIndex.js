$(document).ready(function(){
	/* 查看图片 */
	$('.datalist').on('click', '.thumImg', function(e){
		e.stopPropagation();  
  
	})
	$('.datalist2').on('click', '.thumImg', function(e){
		e.stopPropagation();  
  
	})
	layer.photos({
	  photos: '.datalist'
	}); 

	layer.photos({
	  photos: '.datalist2'
	}); 

	/* 控制首页是否展示 */
	$('.i-switch').on('switchChange.bootstrapSwitch', function(e, state) {
		if ($(this).closest('table').attr('id') == "bannerTable") {
			switchAction.call(this, "#onItemsBanner", "/admin/banner/display", e, state)
		}
		else{
			switchAction.call(this, "#onItemsCooperation", "/admin/cooperation/display", e, state)
		}
	});

	/* 更新操作 */
	$("#updateBanner").on('click', function(){
		updateAction("#bannerTable", this)
	})

	$("#updateCooperation").on('click', function(){
		updateAction("#cooperationTable", this)
	})

	

	/* 删除操作 */
	$("#delBanner").on('click', function(){
		deleteAction("#bannerTable", "/admin/banner/del")
	})

	$("#delCooperation").on('click', function(){
		deleteAction("#cooperationTable", "/admin/cooperation/del")
	})

	function switchAction(id, url, e, state){
		var _onItems = parseInt($(id).val()),
				$this = $(this);
		if (state && _onItems < 8) {

			$.ajax({
				type: 'POST',
				url: url,
				data: {'id': $this.data('id'), 'on': true},
				success: function(data){
					if (data.success === 1 && $this) {

						$(id).val(_onItems + 1);
						layer.msg('首页展示成功！');

					}
				},
				error: function(e){
					layer.msg('执行操作时遇到了问题，刷新后重新试试看~');
				}
			})

			
		}else if(state && _onItems >= 8){
			layer.msg('只能选择4条案列在首页展示！');
			$this.bootstrapSwitch('state', false);
		}else if(!state && _onItems < 8){
			
			$.ajax({
				type: 'POST',
				url: url,
				data: {'id': $this.data('id'), 'on': false},
				success: function(data){
					if (data.success === 1 && $this) {

						$(id).val(_onItems - 1);
						layer.msg('撤销展示成功！')

					}
				},
				error: function(e){
					layer.msg('执行操作时遇到了问题，刷新后重新试试看~');
				}
			})
			
		}
	}

	function updateAction(id, ele){
		var rows = $(id).find('.i-checks:checked');
		if (rows.length == 0) {
			layer.alert('请选择一条案例更新！', {icon: 0, title:'提示'});
		}else if(rows.length > 1){
			layer.alert('一次只能更新一条案例！', {icon: 0, title:'提示'});
		}else{
			location.href = $(ele).data("href") + rows.val();
		}
	}

	function deleteAction(id, url){
		var rows = $(id).find('.i-checks:checked');
		var delList = [];

		rows.each(function(){
			delList.push($(this).val())
		})

		layer.confirm('确定要删除这' + rows.length + '条数据吗', {icon: 3, title:'提示'}, function(index){
		  $.ajax({
		  	type: 'DELETE',
		  	url: url,
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
	}

	
})