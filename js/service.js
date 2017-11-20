function Service(){
	this.init();
}

Service.prototype.init=function(){
	new Iframe(document.querySelector('.val-iframe-streams'));
	new Slider(document.querySelector('.val-slider-general-news'));
	new Category(document.querySelector('.val-full-width-category'));
	new Modals();
	new Single(document.querySelector('#val-single-category'));
}

window.addEventListener('DOMContentLoaded', function(){new Service()});