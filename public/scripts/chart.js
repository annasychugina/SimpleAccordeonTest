var toggles = document.querySelectorAll('.accordion__item-tittle');

var _onClick = function(event) {
	var elem = event.target;
	var parent = elem.closest('.accordion__item');
	var items = document.querySelectorAll('.accordion__item');

	for (var item of items) {
		item.classList.remove('accordion__item_open');
	};

	parent.classList.toggle('accordion__item_open');
};

for (var toggle of toggles) {
	toggle.addEventListener('click', _onClick);
};