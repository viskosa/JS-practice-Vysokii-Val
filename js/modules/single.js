function Single(parent){
	if (!parent) return;
	this.status = true;
	this.id = document.querySelector('#val-count-and-id').getAttribute('data-id');
	this.offset = document.querySelector('#val-count-and-id').getAttribute('data-count');
	this.parent = parent;
	this.loader();
	window.addEventListener('scroll', this.handler.bind(this));
}

Single.prototype = Object.create(App.prototype);

Single.prototype.loader = function(){
	this.ajax('GET', '/site/GetCategoryByIdXhrOrNotId?id='+ this.id +'&offset=' + this.offset, this.response.bind(this));
}

Single.prototype.handler = function(){
	var windowHeight = document.querySelector('body').clientHeight; // высота документа
	var scroll = window.pageYOffset; // хранит текущую прокрутку страницы
	if ((windowHeight - scroll < 2000) && this.status){
		this.status = false;
		this.loader();
	}
	//console.log('raznica' + (windowHeight-scroll));
	//console.log('windowHeight=' + windowHeight);
	//console.log('scroll='+scroll);
}

Single.prototype.response = function(obj){ // в obj получили ответ от сервера xhr.responseText
	try {
		var objAnswer = JSON.parse(obj);
			objNews = JSON.parse(objAnswer['news']),
			objLang = objAnswer['language'];
			objOffset = objAnswer['offset'];		
	} catch (e) {
			console.log(e);
			return;
		};
	this.createNews(objNews, objLang, objOffset); 
}	

Single.prototype.createNews = function(news, lang, offset){
	var str = '';
	for (var i = 0; i < news.length; i++) {
		str += this.news(news[i], lang);
	}

	this.parent.insertAdjacentHTML('beforeend', str);
	this.offset = offset;
	this.status = true;
}

Single.prototype.news = function(news, lang){
	return '<a href="/site/news/' + this.id + '" class="val-block-gen-news">' +
    			'<div class="val-image-block-gen-news">' +
         			'<img src="/uploads/news/thumb/'+ news['image'] + '">'+
     			'</div>' +
     			'<div class="val-description-block-gen-news">' +
          			'<span class="val-news-view">'+ news['views']+'</span>' +
          			'<span class="val-content-news-data">'+ this.createDate(news['date'], lang) + '</span>' +
           			'<h3 class="val-content-news-title-small">' + news['title_' + lang] + '</h3>' +
      			'</div>'
  			'</a>'
}