function Category(categoryParent){
	if(!categoryParent) return;

	this.categoryParent = categoryParent;
	this.status = true;
	this.id = 1;
	window.addEventListener('scroll', this.handler.bind(this));
}
Category.prototype = Object.create(App.prototype);

Category.prototype.handler = function(){
	var windowHeight = document.querySelector('body').clientHeight; // высота документа
	var scroll = window.pageYOffset; // хранит текущую прокрутку страницы
	if ((windowHeight - scroll < 1500) && this.status){
		this.status = false;
		this.ajax('GET', '/site/GetCategory?id='+ this.id, this.response.bind(this));
	}

	//console.log('raznica' + (windowHeight-scroll));
	//console.log('windowHeight=' + windowHeight);
	//console.log('scroll='+scroll);
}
Category.prototype.response = function(obj){
	try {
		var objAnswer = JSON.parse(obj),
			objNews = JSON.parse(objAnswer['news']),
			objCategory = JSON.parse(objAnswer['category']),
			objLang = objAnswer['language'];		
	} catch (e) {
			console.log(e);
			return;
		}

		this.putOnDocument(objCategory, objLang, objNews); 
}

Category.prototype.putOnDocument = function(category, lang, news){
	var commonPatt = '<div class="val-category-block">' + 
							'<h2 class="val-title-uppercase-with-line">' + category[0]['name_' + lang] + '</h2>' +
							'<div class="val-news-list-category">' + this.createNews(news, lang) + '</div>' +
					'</div>';
	this.categoryParent.insertAdjacentHTML('beforeEnd', commonPatt);
	
	this.id++;
	if (this.id == 7){
			this.id++;
		} else if (this.id > 9){
			return;
		}
	this.status = true;
}

Category.prototype.createNews = function(news, lang){
	var str = '';
	for (var i = 0; i < news.length; i++) {
		if (i == 0) {
			str += this.newsWithImg(news[i], lang);
		} else {
			str += this.newsWithoutImg(news[i], lang);
		}
	}
	return str;
}
Category.prototype.newsWithImg = function(news, lang){
	return '<a href="/site/news/' + this.id +'" class="val-news-item-category val-category-image">' +
				'<div class="val-item-outer-category-image">' +
					'<img src="/uploads/news/thumb/' + news['image'] + '" alt="' + news['title_' + lang] + '">' +
				'</div>' +
				'<div class="val-line-vews-data">' +
        			'<span class="val-content-news-data">' + /*this.getDate(news['date'], lang)*/this.createDate(news['date'], lang) + '</span>' +
       				'<span class="val-news-view">' + news['views'] + '</span>' +
    			'</div>' +
    			'<h2 class="val-title-news-category">' + news['title_' + lang] + '</h2>' +
			'</a>';
}
Category.prototype.newsWithoutImg = function(news, lang){
	return '<a href="/site/news/' + this.id +'" class="val-news-item-category val-category-image">' +
    			'<div class="val-line-vews-data">' +
        			'<span class="val-content-news-data">' + /*this.getDate(news['date'], lang)*/this.createDate(news['date'], lang) + '</span>' +
        			'<span class="val-news-view">' + news['views'] + '</span>' +
    			'</div>' +
    			'<h2 class="val-title-news-category">' + news['title_' + lang] + '</h2>' +
    			'<p class="val-description-news-category">' + news['description_' + lang].slice(0, 250) + '...</p>' +
			'</a>';
}
/*Category.prototype.getDate = function(news, lang){ // для вывода даты
    this.createDate(news, lang);
}*/