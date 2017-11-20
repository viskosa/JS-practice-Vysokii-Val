function Slider(sliderParent) {
	if (!sliderParent) return;
	var str = '';
	this.ul = document.querySelector('.val-list-slider');
	this.pointsParent = document.querySelector('.val-display-controls'),
	this.countLi = this.ul.children, // массив li-шек
	this.liWidth = this.countLi[0].clientWidth; //  ширина одной li без px

	for (var i = 0; i < this.countLi.length; i++) {
		str += this.setPoints(i);
	}
	this.nonStop();
	this.pointsParent.insertAdjacentHTML('afterBegin', str);
	this.pointsParent.addEventListener('click', this.handler.bind(this));
	sliderParent.addEventListener('mouseleave', this.nonStop.bind(this));
	sliderParent.addEventListener('mouseenter', this.stop.bind(this));
}	

Slider.prototype.setPoints = function(attr){
	if (attr == '0') {
		return '<span data-controls="' + attr + '" class="-active-slide"></span>';
	} else {
		return '<span data-controls="' + attr + '"></span>';
	}
}

Slider.prototype.handler = function(next){
	var target = event && event.target ? event.target : next,
		active = document.querySelector('.-active-slide'); // берем того, у кого класс актив
		if (target.tagName == 'SPAN') {
			var multiplier = target.getAttribute('data-controls'); // то берем у соседа его data-controls
			active.classList.remove('-active-slide'); //убираем активный класс у всех, у кого бы он ни стоял
			target.classList.add('-active-slide');// и накидываем активный класс 
		}
	this.ul.style.cssText += 'transform: translateX(' + (-this.liWidth * multiplier) + 'px); transition: 1s ease';
}
	
Slider.prototype.nonStop = function(){
	this.timer = setTimeout(function(){
		var x = document.querySelector('.-active-slide');
		if (x.nextElementSibling) {
			this.handler(x.nextElementSibling);
		} else if (!x.nextElementSibling) {
			this.handler(this.pointsParent.firstElementChild);
		}
		this.nonStop();
	}.bind(this), 1500);
}

Slider.prototype.stop = function(){
	clearTimeout(this.timer);
};
