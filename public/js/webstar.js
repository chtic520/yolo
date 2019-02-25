$(document).ready(function(){
	$(".tagTab").on('click', '.tag', function(){
		$("#tagVal").val($(this).attr('id'));
		$("#searchForm").submit();
	})

	$(".platform").on('click', function(){
		$("#platformVal").val($(this).attr('id'));
		$("#searchForm").submit();
	})

	$(".fans").on('click', function(){
		$("#fanMax").val($(this).data('max'));
		$("#fanMin").val($(this).data('min'));
		$("#searchForm").submit();
	})

	$(".webstar-pagination").on('click', '.live', function(){
		$("#page").val($(this).data('page'));
		$("#searchForm").submit();
	})
})