$(document).ready(function(){
	/* 图片上传 */
	var uploader = new WebUploader.Uploader({
  	swf: 'libs/webuploader/Uploader.swf',
  	accept: [
  		title: 'Images',
  		extensions: 'gif,jpg,jpeg,bmp,png',
  		mimeTypes: 'image/*'
  	],
  	method: 'POST'

	    // 其他配置项
	});
})