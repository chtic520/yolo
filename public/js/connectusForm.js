$(document).ready(function(){
	CKEDITOR.replace( 'content' );

	$("#sub").on('click', function(e){
		e.preventDefault();

		$("#addForm").submit();
	})
	
})