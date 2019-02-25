$(document).ready(function(){

	$("#sub").on('click', function(e){
		e.preventDefault();
		$("#addForm").submit();
	})
	
	$("#t").on('click', function(){
		var html = '';
		$("#tagList").find('.tag:checked').each(function(){
			var tagName = $(this).siblings('span').html();
			var tagId = $(this).attr('id');
			html += '<span class="label label-info">'+tagName+'<input type="hidden" name="category[tagCategory]" value="'+tagId+'"></span>&nbsp;'
		})

		$("#tagCategoryBox").html(html)

		$("#tagModal").modal('hide')
	})
})