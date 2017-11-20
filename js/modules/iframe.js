/*function Iframe(){   // 1
	this.sent();
}
Iframe.prototype = Object.create(App.prototype);

Iframe.prototype.sent = function(){
	this.xhr();
}*/



/*function Iframe () {   // 2 
	this.send();
}

Iframe.prototype = Object.create(App.prototype);

Iframe.prototype.send = function () {
	this.xhr(this.responce);
}

Iframe.prototype.responce = function (val) {
	console.log(val)
}*/



function Iframe(iframeParent){
if (!iframeParent) return;
//this.test(); // для вывода даты
var srcArray = iframeParent.getAttribute('data-src').split(', '), // берем у этого блока аттрибут data-src (это строка) и разбиваем эту строку по запятой и пробелу 
	str = ''; // объявляем пустую строку

	for (var i = 0; i < srcArray.length; i++){ // идем в цикле по массиву 
		str += this.insertIframe(srcArray[i]); // и записываем в пустую строку результат выполнения метода this.insertIframe, т.е. с каждой новой итерацией 
		//в строку допишется кусок html из метода this.insertIframe, только в src с каждой новой итерацией передается новое значение из массива srcArray
	}
	iframeParent.insertAdjacentHTML('afterBegin', str); // и вставляем полученную строку (кусок html) в нужный блок
}

Iframe.prototype = Object.create(App.prototype);

Iframe.prototype.insertIframe = function(src){ // метод возвращает кусок html с разным src 
	return '<div class="val-outer-frame">' + 
				'<span class="val-ico-online">' +
					'<i>Online</i>' +
				'</span>' +
				'<iframe width="100%" height="270px" src = "' + src + '"></iframe>' +
			'</div>';
}

/*Iframe.prototype.test = function(){ // для вывода даты
	this.createDate('2017-02-14, 12:30:56', 'ru');
}*/