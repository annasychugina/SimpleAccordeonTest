var triggers = document.querySelectorAll('.accordion__item-tittle');

var accordion = function (e) {
	var elem = e.target;
	var parent = elem.closest('.accordion__item');
	var items = document.querySelectorAll('.accordion__item');

	for (var item of items) {
		item.classList.remove('accordion__item_open');
	}


	parent.classList.toggle('accordion__item_open');
};

for (var trigger of triggers) {
	trigger.addEventListener('click', accordion);
}
