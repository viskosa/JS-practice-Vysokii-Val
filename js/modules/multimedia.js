function Multi (parent) {
	if (!parent) return;
	this.parent = parent;
	this.status = true;
	this.offset = document.getElementById('val-count-and-id').getAttribute('data-count'); // 0
	this.link(); //  подключение библиотеки imagesloaded.pkgd.min.js
	this.setGridSizer();    // создаем элемент, который будет эталоном колонки для масонри
	this.request();
	window.addEventListener('scroll', this.handler.bind(this));
}
Multi.prototype = Object.create(App.prototype);

Multi.prototype.link = function(){
	var	el = document.createElement('script');
	el.setAttribute('type', 'text/javascript');
	el.setAttribute('src', '/public/js/_lib/imagesloaded.pkgd.min.js');
	document.querySelector('body').appendChild(el);
}

Multi.prototype.setGridSizer = function(){
	var gridSizer = document.createElement('div');
	gridSizer.classList.add('grid-sizer');
	gridSizer.style.width = '25%'/*this.parent.clientWidth/4 + 'px'*/;
	this.parent.insertBefore(gridSizer, this.parent.firstElementChild);
}

Multi.prototype.handler = function(){
	var windowHeight = document.querySelector('body').clientHeight; // высота документа
	var scroll = window.pageYOffset; 								// хранит текущую прокрутку страницы
	if ((windowHeight - scroll < 1000) && this.status){
		this.status = false;
		this.request();
	}
}

Multi.prototype.request = function(){
	this.ajax('GET', '/site/GetMultimedia?offset=' + this.offset, this.response.bind(this));
}

Multi.prototype.response = function(obj){
	try {
		var objAnswer = JSON.parse(obj),
			objMulti = JSON.parse(objAnswer['multimedia']), // сюда приходит массив объектов новостей
			lang = objAnswer['language'], 					// язык
			offset = objAnswer['offset'], 					// offset
			arrResult = [],               					// сюда сложим все сформированыые ноды
			patt = '';

	} catch (e) {
			console.log(e);
			return;
	};

	if (offset == 30) {									// при первой подгрузке показываем все 30 новостей
		for (var i = 0; i < objMulti.length; i++){
			patt += this.template(objMulti[i], lang);					  
		} 
		this.parent.insertAdjacentHTML('beforeEnd', patt);
		imagesLoaded(this.parent, this.masonry.bind(this, offset));
	};
	if (offset > 30) {									// если это не первая подгрузка
		for (var i = 0; i <= 14; i++){					// то показываем по 15 первых новостей из 30-ти пришедших
			patt += this.template(objMulti[i], lang);	// собираем из мультимедиа шаблон  
		}
		this.parent.insertAdjacentHTML('beforeEnd', patt);  // теперь в this.parent 45 новостей + 1 первый див
		// и еще нужно собрать в массив эти же вновь вставленные 15 элементов (нод), чтобы передить их в масонри, т.к. html не катит:
		var nodes = this.parent.children;		// 46 штук : 30 + 15 + 1 div grid-sizer                         
		for (var i = this.offset + 1; i < nodes.length; i++){   // начинаем с 31 ноды, т.е с первой вставленной на страницу после второго запроса на сервер
			arrResult.push(nodes[i]);  							// собираем массив вновь пришедших 15-ти нод
		}
		//console.log('offset = ' + offset);
		//console.log('nodes.length = ' + nodes.length);
		//console.log('this.offset', this.offset);
		//console.log(arrResult);
		imagesLoaded(this.parent, this.masonry.bind(this, offset, arrResult));
	}
}

Multi.prototype.masonry = function(offset, arr){
	if (this.msnry && offset > 30) {
		this.msnry.appended(arr);
		console.log('добавляем элементы в масонри');
	} else if (!this.msnry && offset == 30){
		this.msnry = new Masonry (this.parent, {
			itemSelector: '.val-block-multimedia',
			columnWidth: '.grid-sizer'
		});
		this.msnry.layout();	// если уходим с этой страницы, а потом возвращаемся, то элементы на страницу уже вставлены - надо их перевыложить      
		console.log('создаем масонри');
	}

	if (this.parent.style.opacity = '0') {  // изначально у this.parent опасити 0, надо его проявить
		this.parent.style.opacity = '1';
	};

	if (offset == 30) {                 // если это это первая подгрузка мультимедиа
		this.offset = offset;     
	} else if (offset > 30) {			// если это второй и последующий запросы на сервер
		this.offset = offset - 15;		// то т.к. приходит с сервера по 30 новостей, а мы из них показываем только 15
	};
	this.status = true;
}

Multi.prototype.template = function(obj, lang){
	return '<a href="/' + this.helperLink(obj, lang) + '" class="val-block-multimedia -val-ico-' + obj['type'] + '">' +
				'<span class="-val-multimedia-description">' + obj['name_' + lang] + '</span>' +
				'<div class="val-image-block-multimedia">' + 
					'<img src= "' + this.helperImg(obj) + '">' +
				'</div>' +
			'</a>';
}
Multi.prototype.helperLink = function(obj, lang){ 
	if (obj && obj['type'] == 'photo'){         
		return  lang + '/site/photos/' + obj['id'];    
	};
	if (obj && obj['type'] == 'video'){ 	      
		return	lang + '/site/video/' + obj['id'];
	}
}
Multi.prototype.helperImg = function(obj){
	if (obj && obj['type'] == 'photo'){        
		return  'http://val.ua/uploads/galery/category/' + obj['image'];   
	};
	if (obj && obj['type'] == 'video'){ 	    
		return	'http://img.youtube.com/vi/' + obj['image'] + '/mqdefault.jpg';
	}
}
