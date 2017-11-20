function Calendar(wrap){
	if(!wrap) return;
	this.wrap = wrap;
	//this.offset = this.wrap.getBoundingClientRect().top;
	//console.log(this.offset)
	window.addEventListener('scroll', this.getSticky.bind(this));
}

Calendar.prototype.getSticky = function(){
	var top = this.wrap.getBoundingClientRect().top;
	//var scroll = window.pageYOffset;
	console.log('top= ' + top);
	//console.log('scroll= ' + scroll);
	if (top <= 32){
		console.log('fixed');
		this.wrap.style.position = 'fixed';
	}
}