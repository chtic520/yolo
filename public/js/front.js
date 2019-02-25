$(document).ready(function(){
	var Case = function(width, ele){
		this.width = width;
		this.ele = ele;
	}

	Case.prototype._hover = function(){
		var me = this;
		me.ele.each(function(index, item){
			$(item).on('mouseenter', function(e){
				me.mouseenter(e, me.width);
			});
		});

		me.ele.each(function(index, item){
			$(item).on('mouseleave', function(e){
				me.mouseleave(e);
			});
		});
	}

	Case.prototype.mouseenter = function(e, width){
		var me = this;
		var $thisE = $(e.target);
		$thisE.find('.case-content').css('width', width).addClass('lalala');
	}

	Case.prototype.mouseleave = function(e){
		var me = this;
		var $thisE = $(e.target);
		$thisE.find('.case-content').css('width', 0).removeClass('lalala');
	}

	$.fn.caseEvent = function(width){
		var a = new Case(width, $(this));

		a._hover();
	}

	$.fn.overEll = function(num){
		var _this = $(this);

		_this.each(function(){
			var html = $(this).text().slice(0, num);

			if($(this).html().length > num){
				$(this).html(html + "......");
			}
		})
	}


	$(".case-container").caseEvent(250);

	$(".back").overEll(200);
})