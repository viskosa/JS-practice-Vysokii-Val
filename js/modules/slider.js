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

//Slider.prototype = Object.create(App.prototype); надо ли???

Slider.prototype.setPoints = function(attr){
	if (attr == '0') {
		return '<span data-controls="' + attr + '" class="-active-slide"></span>';
	} else {
		return '<span data-controls="' + attr + '"></span>';
	}
}

Slider.prototype.handler = function(e){

	var target = e && e.target ? e.target : document.querySelector('.-active-slide'); // берем того, на кого щелкнули, или у кого класс актив (если ивента не произошло)
		if (target.classList.contains('-active-slide') && target.nextElementSibling) { //если не было ивента и у спана есть сосед
			var multiplier = target.nextElementSibling.getAttribute('data-controls'); // то берем у соседа его data-controls
			this.removeActiveClass(); //убираем активный класс у всех, у кого бы он ни стоял
			target.nextElementSibling.classList.add('-active-slide');// и ставим его соседу
		} else if (target.classList.contains('-active-slide') && !target.nextElementSibling) { // если это последний спан
			var multiplier = 0;
			this.removeActiveClass();
			this.pointsParent.firstElementChild.classList.add('-active-slide'); // то ставим активный класс первому спану
		} else if (target.tagName == 'SPAN') {  // и осталось выбрать тех, по кому щелкаем, т.е. если произошел ивент, таргет существует и таргет - это спан (а то может быть его родитель)
			var multiplier = target.getAttribute('data-controls'); // то берем у элемента, по которому щелкнули, data-controls
			this.removeActiveClass();
			target.classList.add('-active-slide'); // и накидываем активный класс 
		}

	this.ul.style.cssText += 'transform: translateX(' + (-this.liWidth * multiplier) + 'px); transition: 1s ease';

}

Slider.prototype.removeActiveClass = function(){
	for (var i = 0; i < this.pointsParent.children.length; i++){
		if(this.pointsParent.children[i].classList.contains('-active-slide')) {
			this.pointsParent.children[i].classList.remove('-active-slide');
		} 
	}
}
	
Slider.prototype.nonStop = function(){
	this.timer = setTimeout(function(){
		this.handler();
		this.nonStop();
	}.bind(this), 1500);
}

Slider.prototype.stop = function(){
	clearTimeout(this.timer);
	console.log('clear');
};

/*Slider.prototype.addActiveClass = function(){
	if (this.target.classList.contains('-active-slide') && this.target.nextElementSibling) {
		this.target.nextElementSibling.classList.add('-active-slide');
	} else if (this.target.classList.contains('-active-slide') && this.target.nextElementSibling == 'null') {
		this.pointsParent.firstElementChild.classList.add('-active-slide');
	} else {
		this.target.classList.add('-active-slide');
	}
	console.log(this.target);
}*/