function Modals(){
	this.parent = document.querySelector('.val-modal-login-reg-outer');
	document.querySelector('body').addEventListener('click', this.showPopup.bind(this));
	//document.querySelector('.-val-remember-pass').addEventListener('click', this.display.bind(this, '', 'none'));
}

Modals.prototype.showPopup = function(){
	var target = event && event.target || event.srcElement;
	if (target.hasAttribute('data-attr')) {
		var attr = target.getAttribute('data-attr');
	}
	
		   //-login-modal   -reg-modal   -about-modal

	if (attr && attr!=='-login-modal') { 
		this.popup = document.querySelector('.' + attr);
		this.addClass('-active-outer', '-animate-content-window');
		this.display('table', 'block');
		document.body.style.overflow = 'hidden';

	} else if (attr && attr == '-login-modal') {
		console.log(this.popup);
		//document.querySelector('.-val-remember-pass').addEventListener('click', this.display.bind(this, '', 'none'));
		this.popup.querySelector('#login').style.display = 'block';

		var arr = this.popup.querySelectorAll('.val-html-modal-form');

		console.log(arr);

	} else if (target.classList.contains('val-close-modals')){
		this.removeClass('-animate-content-window', '-active-outer');// убрали старые классы
		this.addClass('-active-outer-out', '-animate-content-window-close'); // добавили новые для анимации закрытия
		this.popup.addEventListener('animationend', this.xxx.bind(this)); // по окончанию анимации скрыли блоки и убрали классы анимации закрытия
		//this.popup.removeEventListener('animationend', this.xxx.bind(this));
		//this.popup.addEventListener('animationend', this.removeHandler.bind(this));
		document.body.style.overflow = '';
	}
}

Modals.prototype.addClass = function(addParent, addPopup) {
	this.parent.classList.add(addParent);
	this.popup.classList.add(addPopup);
}
Modals.prototype.display = function(displayParent, displayPopup){
	this.parent.style.display = displayParent;
	this.popup.style.display = displayPopup;
}
Modals.prototype.removeClass = function(removePopup, removeParent){
	this.popup.classList.remove(removePopup);
	this.parent.classList.remove(removeParent);
}
Modals.prototype.xxx = function(){
	this.display('none', 'none');
	this.removeClass('-animate-content-window-close', '-active-outer-out');
	this.popup.removeEventListener('animationend', this.xxx);
	//this.popup.addEventListener('animationend', this.removeHandler.bind(this));
}
/*Modals.prototype.removeHandler = function(){
	this.popup.removeEventListener('animationend', this.xxx.bind(this));
}*/


/*	this.popup.addEventListener('animationend', function(){
			this.popup.style.display = 'none';
		});
		this.parent.addEventLisener('animationend', function(){
			this.parent.style.display = 'none';
		})
}*/


/*		this.popup = document.querySelector('.' + attr);
		//document.body.style.overflow = 'hidden';
		this.parent.style.display = 'table';
		this.parent.classList.add('-active-outer');
		this.popup.classList.add('-animate-content-window');
		this.popup.style.display = 'block';*/

/*Modals.prototype.closePopup = function(){
		this.cross = this.popup.querySelector('.val-close-modals');
		this.popup.classList.remove('-animate-content-window');
		this.popup.classList.add('-animate-content-window-close');
		this.parent.classList.remove('-active-outer');
		this.parent.classList.add('-active-outer-out');
		console.log(this.popup);
		console.log(this.parent);
	}	*/	