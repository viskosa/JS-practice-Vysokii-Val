function Weather(parent){
  if (!parent) return;
  this.parent = parent;
  this.request();
}
Weather.prototype = Object.create(App.prototype);

Weather.prototype.request = function(){
	this.ajax('GET', 'https://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%3D918233%20and%20u%3D%22c%22&format=json&l=ru', this.response.bind(this));
}

Weather.prototype.response = function(obj){
	try {
		var objAnswer = JSON.parse(obj); // парсим пришедший с сервера ответ
	} catch (e) {
			console.log(e);
			return;
	};
	this.recurse(objAnswer, 'item', this.finish.bind(this));// во всем возвращенном объекте рекурсией ищем item
}

Weather.prototype.finish = function(obj){ // рекурсия сюда вернула объект item
	var objCond = obj['condition'], //погода на сегодня
		  objForecast = obj['forecast'],  //погода на последующие дни
      str = '';

  for (var i = 1; i <= 4; i++){
    str += this.singleTemplate(objForecast[i]['code'], objForecast[i]['day'], objForecast[i]['high'], objForecast[i]['low']);//сюда соберем погоду за 4 дня
  }

  var mainTemplate = this.fullTemplate(objCond, objForecast, str);
  this.parent.insertAdjacentHTML('beforeend', mainTemplate); // конец выполнения
}

Weather.prototype.fullTemplate = function(condition, forecast, str){
	return 	'<div class="drop-weather-button">' +
              	'<div class="outer-today-ico">' +
                  '<span class="icons-for-c-min icon-weather-min-'+ condition['code'] +'"></span>' +
                  '<i class="today-weather">' + condition['temp'] + ' С°</i>' +
              	'</div>' +
              	'<div class="drop-wether">' +
                  	'<p class="for-genwether"><span class="title-weather">Погода</span><span class="city-weather">Украина, Чернигов</span></p>' +
                  	'<div class="section-today">' +
                		'<div class="for-weather-icon">'+
                  			'<h5 class="section-heading">Сьогодні</h5>'+
                 			'<span class="icons-for-c icon-weather-'+ condition['code'] +'"></span>'+
                		'</div>'+
              			'<div class="weather-detail">'+
                  			'<h4 class="weather-heading">'+
                      			'<span class="temp-now">' + condition['temp'] + ' С°</span>'+
                      			'<span class="phrase">Температура зараз</span>'+
                  			'</h4>'+
                  			'<span class="temperature high-temperature">' + forecast[0]['high'] + ' С°</span>'+ 
                  			'&nbsp; - &nbsp;' +
                  			'<span class="temperature low-temperature">' + forecast[0]['low'] + ' С°</span>'+
                  			'<p class="summary">' + this.getCondition(condition['code']) + '</p>'+
              			'</div>'+
                	'</div>'+
                	'<div class="section-this-week">'+
                    	'<h5 class="section-heading">Тиждень</h5>'+
                    	'<ul class="item-list-temperature">'+ str +'</ul>'+
                	'</div>'+
            	'</div>'+
          '</div>';
}
Weather.prototype.singleTemplate = function(code, day, high, low){
	return '<li class="item-time-temperature">'+
              '<span class="icons-for-c icon-weather-' + code + '"></span>'+
              '<span class="day">' + this.getDay(day) + '</span>'+
              '<span class="temperature-days high-temperature">' + high + ' С°</span>'+
                '&nbsp;-&nbsp;'+
              '<span class="temperature-days low-temperature">' + low + ' С°</span>'+
          '</li>';
}