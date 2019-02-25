$(document).ready(function(){
	$(".side-link").on('click', function(){
		var $this = $(this);

		$this.addClass('active').siblings('li').removeClass('active');
		$("#content").attr('src', $this.find('a').data('href'))
	})

})

