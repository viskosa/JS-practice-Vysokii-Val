function Modals(){
	this.parent = document.querySelector('.val-modal-login-reg-outer');
	document.querySelector('body').addEventListener('click', this.showPopup.bind(this));
	this.displayNone = this.displayNone.bind(this);
}

Modals.prototype.showPopup = function(e){
	var target = e && e.target || e.scrElement;
	if (target.hasAttribute('data-attr')){
		var attr = target.getAttribute('data-attr');
	}
	//console.log(target);
	//console.log(attr);
	//console.log(this.popup);

	if (attr) {
		this.popup = document.querySelector('.' + attr); // попап
		this.parent.classList.add('-active-outer');
		this.popup.classList.add('-animate-content-window');
		this.parent.style.display = 'table';
		this.popup.style.display = 'block';
		document.body.style.overflow = 'hidden';
	} else if (target.classList.contains('val-close-modals')){ // если щелкнули по крестику
		this.parent.classList.add('-active-outer-out');
		this.popup.classList.add('-animate-content-window-close');

		this.parent.classList.remove('-active-outer');
		this.popup.classList.remove('-animate-content-window');
		//setTimeout(this.displayNone.bind(this), 600);
		this.popup.addEventListener('animationend', this.displayNone);
	} else if (target.classList.contains('-val-remember-pass')){ // если щелкнули по "Напомнить пароль" или "Назад"
		var arr = this.popup.querySelectorAll('.val-html-modal-form');
		for (var i = 0; i < arr.length; i++){
			arr[i].classList.toggle('remember');
		}
	}
}

Modals.prototype.displayNone = function(){
	this.popup.classList.remove('-animate-content-window-close');
	this.parent.classList.remove('-active-outer-out');
	this.popup.style.display = 'none';
	this.parent.style.display = 'none';
	document.body.style.overflow = '';
	this.popup.removeEventListener('animationend', this.displayNone);
}
