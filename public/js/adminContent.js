$(document).ready(function(){

	$(".i-checks").iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue'
	});

	$(".i-switch").bootstrapSwitch({
		onSwitchChange: function(e){
			e.stopPropagation();
		}
	});

	$(".bootstrap-switch-label").on('click', function(e){
		e.stopPropagation();
	});

	$(".datalist,.datalist2").on('click', 'tr', function(){
		$(this).find('input[type="checkbox"]').iCheck('toggle');
	});

	$("#allCheck").on('ifClicked', function(){
		var _status = $(this).prop('checked');

		$(".datalist").find('.i-checks').each(function(){
			var $this = $(this);
			if (_status) {
				$this.prop('checked') == true && $this.iCheck('uncheck');
			}else{
				$this.prop('checked') == false && $this.iCheck('check');
			}
		})
	})
})

