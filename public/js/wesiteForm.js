$(document).ready(function(){
	CKEDITOR.replace( 'summary' );

	$("#sub").on('click', function(e){
		e.preventDefault();

		/*var _summary = CKEDITOR.instances.summary.getData();

		if ('' == $("#title").val().trim()) {
			layer.tips('必须填写案例名称！', '#title', {tips: 1});
			return;
		};

		if ('' == $("#scene").val().trim()) {
			layer.tips('必须填写适合的场景！', '#scene', {tips: 1});
			return;
		};

		if ('' == $("#tagBox").html().trim()) {
			layer.tips('必须添加标签！', '#tagBox', {tips: 1});
			return;
		};

		if ('' == $("#pic").val().trim()) {
			layer.tips('必须添加背景图片！', '#pic', {tips: 1});
			return;
		};

		if ('' == _summary) {
			layer.tips('必须填写案例特色！', '#summary', {tips: 1});
			return;
		};*/

		$("#addForm").submit();
	})
	/* 图片上传 */

	var $list = $("#thethum"); 
	var $btn = $("#uploadBtn");
	var uploader;


	$("#uploadModal").on("shown.bs.modal",function(){
		var flag = false;

		uploader = WebUploader.create({
			auto: false,
			pick: '#addfile',
			server: '/admin/upload',
		  	swf: 'libs/webuploader/Uploader.swf',
		  	accept: {
		  		title: 'Images',
		  		extensions: 'gif,jpg,jpeg,bmp,png',
		  		mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp'
		  	},
		  	method: 'POST'
		});

		// 当有文件添加进来的时候  
	  uploader.on( 'fileQueued', function( file ) {
	  	flag = true;
	  	$list.find('.thum-img').attr('id', file.id);
	  	$list.find('#imgtitle').html(file.name);
	  	$list.find('#imgsize').html(formatSize(file.size));
	  	var $img = $list.find('#imgupload');
	  
			uploader.makeThumb( file, function( error, src ) {  
				if ( error ) {  
					$img.replaceWith('<span>不能预览</span>');  
					return;  
				}  
	  
				$img.attr( 'src', src );  
			});  
		}); 

		// 文件上传过程中创建进度条实时显示。
		uploader.on( 'uploadProgress', function( file, percentage ) {
			var $percent = $list.find('.progress');
  
			// 避免重复创建  
			if ( !$percent.length ) {  
				$percent = $('<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active"></div></div>').prependTo( $list ).find('.progress-bar');  
			}  
  
			$percent.css( 'width', percentage * 100 + '%' );  
		}); 

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。  
		uploader.on( 'uploadSuccess', function( file, res ) {
			$("#pic").val(res.path);
			layer.msg('图片上传成功！', {icon: 1});
		}); 

		// 文件上传失败，显示上传出错。  
		uploader.on( 'uploadError', function( file ) {
			layer.msg('上传遇到了问题，请重试！', {icon: 5});
		}); 

		// 完成上传完了，成功或者失败，先删除进度条。  
		uploader.on( 'uploadComplete', function( file ) {
			setTimeout(function(){
				$list.find('.progress').remove();
			}, 3000);
		});

		// 开始上传
		$btn.on( 'click', function() {
			if(!flag){
				layer.msg('没有选择要上传的图片，或需要重新选择！', {icon: 5});
				return false;
			}

	    uploader.upload(); 
	  });
	})

	$('#uploadModal').on('hide.bs.modal', function () {
	    uploader.destroy();
	});

	$("#addTag").on('click', function(){
		layer.prompt({title: '新增标签'}, function(value, index, elem){
		  $.ajax({
		  	url: '/admin/wemedia/wesite/category',
		  	type: 'POST',
		  	data: {category: {name: value}},
		  	dataType: 'json',
		  	success: function(data){
		  		if (data.success === 1) {
		  			layer.msg('添加标签成功！')
		  			if ($(".no-tag").length > 0) {
		  				$(".no-tag").remove()
		  			}
		  			$("#tagList").prepend('<div class="col-sm-2"><label><input class="tag" type="checkbox" id="'+data.category._id+'"> <span>'+data.category.name+'</span></label></div>')
		  			layer.close(index);
		  		}
		  	}
		  })
		});
	});

	$("#t").on('click', function(){
		var html = '';
		$("#tagList").find('.tag:checked').each(function(){
			var tagName = $(this).siblings('span').html();
			var tagId = $(this).attr('id');
			html += '<span class="label label-info">'+tagName+'<input type="hidden" name="wesite[category]" value="'+tagId+'"></span>&nbsp;'
		})

		$("#tagBox").html(html)

		$("#tagModal").modal('hide')
	})

	function formatSize( size, pointLength, units ) {
		var unit;

		units = units || [ 'B', 'K', 'M', 'G', 'TB' ];

		while ( (unit = units.shift()) && size > 1024 ) {
			size = size / 1024;
		}

		return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) + unit;
	}
	
})