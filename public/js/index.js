$(document).ready(function(){
	if($('body').scrollTop() < 798){
		$(".header").removeClass("bg");
	}
	

	$(document).on('mousewheel', function(e){
		if($('body').scrollTop() >= 798){
			$(".header").addClass("bg");
		}else{
			$(".header").removeClass("bg");
		}
	})

	$(".news-info a").overEll(155);
})