var jq = document.createElement('script');
jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.querySelector('head').appendChild(jq);

jq.onload = procede;

function procede() {

	var floatMenu = document.createElement('div');

	floatMenu.id = "floatMenu";

	var outterDiv = [];

	var menuItem = [];

	var subMenu = [];

	var i = 0;

	for (i = 0; i < 4; i++) {
		outterDiv[i] = document.createElement('div');

		menuItem[i] = document.createElement('div');
		menuItem[i].className = 'menuItem';
		menuItem[i].innerHTML = 'Menu Item';

		subMenu[i] = document.createElement('div');
		subMenu[i].className = 'subMenu';

		var j = 0;
		var a;
		var li;

		for (j = 0; j < 4; j++){
			a = document.createElement('a');
			a.href='javascript:void(0);';
			a.innerHTML = a.innerHTML + "SubMenu Item " + j;
			li = document.createElement('li');
			li.appendChild(a);
			subMenu[i].appendChild(li);
		}
		outterDiv[i].appendChild(menuItem[i]);
		outterDiv[i].appendChild(subMenu[i]);
	}

	var ul = document.createElement('ul');

	for (i = 0; i < 4; i++){
		ul.appendChild(outterDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.innerHTML = "Next Steps";

	floatMenu.appendChild(h3);

	floatMenu.appendChild(ul);

	document.body.appendChild(floatMenu);

	var css = "#floatMenu {\
			position:absolute;\
			top:15%;\
			right:0px;\
			width:200px;\
			background-color:#FFF;\
			margin:0;\
			padding:0;\
			font-size:15px;\
			border-left:1px solid #ddd;\
			border-right:1px solid #ddd;\
		}\
		#floatMenu h3 {\
			color:black;\
			font-weight:bold;\
			padding:3px;\
			margin:0;\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:18px;\
		}\
		#floatMenu div {\
			margin:0;\
			padding:0;\
			list-style:none;\
		}\
		.menuItem {\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:14px;\
			font-weight:bold;\
			padding-left:10px;\
		}\
		#floatMenu ul div a {\
			text-decoration:none;\
		}";

	var head = document.head;
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);

	$(function() {
		function moveFloatMenu() {
			var menuOffset = menuYloc.top + $(this).scrollTop() + "px";
			$('#floatMenu').animate({
				top: menuOffset
			}, {
				duration: 500,
				queue: false
			});
		}

		var menuYloc = $('#floatMenu').offset();

		$(window).scroll(moveFloatMenu);

		moveFloatMenu();
	});

	$(function() {
		$('.subMenu').hide();
		$(".menuItem").click(function () {
			$menuItem = $(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});
};