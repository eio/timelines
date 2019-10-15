function initControls() {
	var style = document.getElementById('controls').style;
	style.opacity = 0.5;
	style.fontSize = '50%';
	style.position = 'absolute';
	style.zIndex = 100;
	style.top = '10px';
	style.right = '10px';
	style.paddingTop = '0px';
	style.paddingRight = '0px';
	style.paddingLeft = '0px';
	style.paddingBottom = '0px';
	style.backgroundColor = 'rgba(0,0,0,0)';
}
function bigControls() {
	var style = document.getElementById('controls').style;
	style.opacity = 1.0;
	style.fontSize = '200%';
	style.position = 'absolute';
	style.zIndex = 100;
	style.paddingTop = '100px';
	style.paddingRight = '100px';
	style.paddingLeft = '10px';
	style.paddingBottom = '10%';
	style.backgroundColor = 'rgba(0,0,0,0.8)';
}

var controls = '\
<div id="controls"\
	 onmouseover="bigControls()"\
	 onmouseout="initControls()"\
	 onclick="initControls()"\
>\
	<p class="controlstext">\
		<b><u>Controls</u></b>\
	</p>\
	<b>W:</b> forwards, <b>S:</b> backwards, <b>A:</b> left, <b>D:</b> right,\
	<br>\
	<b>R/F:</b> up/down, <b>Q/E:</b> roll, <b>&#8679;/&#8681;:</b> pitch, <b>&#8678;/&#8680;:</b> yaw<br/>\
</div>\
<br>';

// var buttons = '\
// <div id="info">\
// 	<div class="actions">\
// 		<span id="x_btn">X</span>\
// 		<span id="y_btn">Y</span>\
// 		<span id="z_btn">Z</span>\
// 	</div>\
// </div>';

var buttons = '\
<div id="info">\
	<div class="actions">\
		<span id="start_btn">Start</span>\
		<span id="reset_btn">Reset</span>\
	</div>\
</div>\
<br>';

document.body.innerHTML = controls + buttons;