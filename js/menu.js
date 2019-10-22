function toggleMenu() {
	var current = document.getElementById('menu').className;
	if (current == 'open') {
		document.getElementById('menu').className = '';
		document.getElementById('menu_icon').className = '';
	} else {
		document.getElementById('menu').className = 'open';
		document.getElementById('menu_icon').className = 'open';
	}
}

var menuOptions = '\
<div>\
Controls\
</div>';

function initMenu() {
	var menu = document.getElementById('menu');
	menu.innerHTML = menuOptions;
	console.log("init")
}

initMenu();