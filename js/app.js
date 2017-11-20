function App(){

}

/*App.prototype.xhr=function(){
	console.log('1');
}*/

/*App.prototype.request = function(callback){
	setTimeout(function(){console.log('1');}, 3000);
}*/

App.prototype.now = function(data){
	var date = data ? new Date(data) : new Date();
	return (new Date(date.getFullYear(), date.getMonth(), date.getDate())).valueOf();//возвращает время в мс переданной ему даты. Если дату не передали - вернет время сегодняшнего дня
}

App.prototype.createDate = function(time, lang){
	var now = this.now(); // время сегодняшнего дня в мс
	var server = this.now(time); // время пришедшего с сервера дня в мс
	if (now > server){ // значит, эта новость прошлого дня
		var date = new Date(time); // и вывести дату в виде 11 Января 2017
		var m = date.getMonth()+1;// +1 т.к. в js месяцы нумеруются с 0, а в нашем массиве с 1
		var month = this.getMonth(lang, m); /*'ru', 1*/  //получаем название месяца из объекта
		return (date.getDate() + ' ' + month + ' ' + date.getFullYear());
	} else { //иначе это сегодняшняя новость и вывести в виде 11 : 00
		var timeArray =  time.split(' '); //разбиваем полученную с сервера строку по пробелу и делаеи массив
		return (timeArray[1].slice(0,-3));//берем второй индекс в массиве, т.е. время, и работаем с ним как со строкой - обрезаем сзади 3 символа и возвращаем то, что осталось - т.е. только часы и минуты без секунд
	}
}

App.prototype.getMonth = function(l, m){
	var monthObject = {
        ru: {
            1: 'Января',
            2: 'Февраля',
            3: 'Марта',
            4: 'Апреля',
            5: 'Мая',
            6: 'Июня',
            7: 'Июля',
            8: 'Августа',
            9: 'Сентября',
            10: 'Октября',
            11: 'Ноября',
            12: 'Декабря'
        },
        uk: {
            1: "Січня",
            2: "Лютого",
            3: "Березня",
            4: "Квітня",
            5: "Травня",
            6: "Червня",
            7: "Липня",
            8: "Серпня",
            9: "Вересня",
            10: "Жовтня",
            11: "Листопада",
            12: "Грудня"
        }
    };
    return monthObject[l][m];
}

App.prototype.ajax = function(method, url,callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr);
            callback(xhr.responseText);
        }
    }
    xhr.open(method, url, callback);
    xhr.send(null);
}