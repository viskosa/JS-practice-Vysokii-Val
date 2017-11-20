function Currency (parent){
	if(!parent) return;
	this.parent = parent;
	this.request();
}

Currency.prototype = Object.create(App.prototype);
Currency.prototype.request = function(){
	this.ajax('GET', '/site/tryCurrency', this.response.bind(this));
}

Currency.prototype.response = function(arr){
	try {
		var arrAnswer = JSON.parse(arr); // парсим пришедший с сервера ответ
		console.log(arrAnswer);
	} catch (e) {
		console.log(e);
		return;
	}
	var name = '', // кредобанк
		arrBank = []; // сюда положим готовые объекты
	for (var i = 0; i <= arrAnswer.length - 1; i++) {
		if (arrAnswer[i]['bankName'] == name) {
			var c = arrAnswer[i]['codeAlpha']; //EUR USD or RUB
				objBank[c] = {}; // создаем пустой объект с названием EUR или USD или RUB
				objBank[c].rateBuy = arrAnswer[i]['rateBuy'];
				objBank[c].rateBuyDelta = arrAnswer[i]['rateBuyDelta'];
				objBank[c].rateSale = arrAnswer[i]['rateSale'];
				objBank[c].rateSaleDelta = arrAnswer[i]['rateSaleDelta'];

		} else if (arrAnswer[i]['bankName'] !== name) {	//при первой итерации или если зашли уже в другой банк
			if (i !== 0) {               // если это не первая итерация
				arrBank.push(objBank);   // то пушим ранее созданный объект в массив
			};
			objBank = {};                // и очищаем объект
			objBank.bankName = arrAnswer[i]['bankName']; // и записываем в чистый объект имя нового банка 

				var c = arrAnswer[i]['codeAlpha']; //EUR USD or RUB
				objBank[c] = {}; // создаем пустой объект с названием EUR или USD или RUB
				objBank[c].rateBuy = arrAnswer[i]['rateBuy'];
				objBank[c].rateBuyDelta = arrAnswer[i]['rateBuyDelta'];
				objBank[c].rateSale = arrAnswer[i]['rateSale'];
				objBank[c].rateSaleDelta = arrAnswer[i]['rateSaleDelta'];

			name = objBank.bankName;
		};

		if (i == arrAnswer.length - 1 ) {   //при последнем проходе пушим последний объект
			arrBank.push(objBank); 
		}
	}
	console.log(arrBank);
	for (var i = 0; i <1; i++) {
		var patt = '';
		patt += this.mainTempl(arrBank[i]);
		console.log(arrBank[i]);
		console.log(patt);
	}

	this.parent.insertAdjacentHTML('beforeEnd', patt);
}

Currency.prototype.mainTempl = function(objBank){
	return '<table class="-new-currensy">' +
			    '<tr>' +
			        '<th>' +
			            '<span>Банк</span>' +
			        '</th>' +
			        '<th>' +
			            '<span style="font-size: 18px">&#402;</span>' +
			        '</th>' +
			        '<th>' +
			            '<span>Покупка</span>' +
			        '</th>' +
			        '<th>' +
			            '<span>Продажа</span>' +
			        '</th>' +
			    '</tr>' +
			    '<tr>' +
			        '<td>' +
			            '<p><i>' + objBank['bankName'] + '</i></p>' +
			        '</td>' +
			        '<td>' +
			            '<span>' +
			            	'<b>&euro;</b>' + //если есть
			            '</span>' +
			           	'<span>' +
			           		'<b>$</b>' + //если есть
			           	'</span>' +
			           	'<span>' +
			           		'<b>R</b>' + //если есть
			           	'</span>' +
			        '</td>' +
			        '<td>' +
			            '<span>' + this.markTempl(objBank['EUR']['rateBuy']) + '</span>' +
			            	//!!! Для евро покупка !!) если есть
			            '<span>' + this.markTempl(objBank['USD']['rateBuy']) + '</span>' +
			            	//(!!! Для доллара покупка !!) если есть
			            '<span>' + this.markTempl(objBank['RUB']['rateBuy']) + '</span>' + 
			            	//(!!! Для рубля покупка !!) если есть
			        '</td>' +
			        '<td>' +
			            '<span>' + this.markTempl(objBank['EUR']['rateSale']) + '</span>' +
			            	//(!!! Для евро продажа !!) если есть
			            '<span>' + this.markTempl(objBank['USD']['rateSale']) + '</span>' +
			            	//(!!! Для доллара продажа !!) если есть
			            '<span>' + this.markTempl(objBank['RUB']['rateSale']) + '</span>' +
			            	//(!!! Для руюля продажа !!) если есть
			        '</td>' +
			    '</tr>' +
			'</table>';
}
Currency.prototype.markTempl = function(data){
	return '<mark>' + data + '</mark>' + //(!!!!!курс!!!!!!)
		   '<i class="-to-hight"> &nbsp; &#9650;</i> OR <i class="-to-low"> &nbsp; &#9660;</i> OR "" ';
}