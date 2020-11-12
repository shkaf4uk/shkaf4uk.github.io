let headerMobile = document.querySelector(".header_mobile");
let header = document.querySelector('#header');

let close = document.querySelector(".bgDiv");
let closeFooter = document.querySelector(".bgDivFooter");

//открытие меню

headerMobile.onclick = function () {
	let headerMenu = document.querySelector(".header__menu");
	let headerContentMidl = document.querySelector(".header_content_midl");
	headerContentMidl.style.height = 400 + "px";
	headerMenu.style.display = 'block';
	headerMobile.style.display = 'none';
	close.style.display = 'block';
	closeFooter.style.display = 'block';
	console.log("+")
}



//закрытие меню на клик слева
	closeFooter.onclick = function () {
		let headerMenu = document.querySelector(".header__menu");
		let headerContentMidl = document.querySelector(".header_content_midl");
		headerContentMidl.style.height = 500 + "px";
		headerMenu.style.display = 'none';
		headerMobile.style.display = 'block';
		close.style.display = 'none';
		closeFooter.style.display = 'none';
	}
//закрытие меню на клик снизу
	close.onclick = function () {
		let headerMenu = document.querySelector(".header__menu");
		let headerContentMidl = document.querySelector(".header_content_midl");
		headerContentMidl.style.height = 500 + "px";
		headerMenu.style.display = 'none';
		headerMobile.style.display = 'block';
		close.style.display = 'none';
		closeFooter.style.display = 'none';
	}




/* 
1. Сверстать слайдер - done
2. Сделать переключение фотографий влево вправо
3. Сделать переключение фотографии по клику на нижнее фото
4. При клике на большую картинку увеличивать картинку
*/

let images = [
	"forest_1.jpg",
	"coffe_to_bed.jpg",
	"girl_1.jpg",
	"cofee_cat.jpeg",
	"moon_1.jpg",
	"wave-sea.jpg"
];

//путь к картинке
let path = "img/sliders/";

let currentImage = 0;

//выбрали первую картинку
// $('#main_slider img')
// 	.attr("src", path + images[currentImage] );

//функция переключения слайдера вправо
$("#main_slider .next").click(function(){
	currentImage++;
	if (currentImage >= images.length){
		currentImage = 0;
	}
	$('#main_slider img')
		.attr("src", path + images[currentImage] );

	$('#slides ul li').removeClass('selected');
	let img = $('#slides ul li img');
	$(img).removeClass('selected');

	$(img[currentImage]).addClass('selected');
});

//функция переключения слайдера влево
$("#main_slider .pref").click(function(e){
	if (currentImage == 0){
		currentImage = images.length;
	}
	currentImage--;
	$('#main_slider img')
		.attr("src", path + images[currentImage] );

	$('#slides ul li').removeClass('selected');


	let img = $('#slides ul li img');
	$(img).removeClass('selected');

	$(img[currentImage]).addClass('selected');

});

//создание карточек фотографий
for(let i = 0; i < images.length; i++){
	//добавляем элемент в блок с миникартинками
	$('#slides ul').append("<li data-id=" + i + "><img src='" + path + images[i] + "'></li>");

	//если это прервая картинка добавим ей клас selected
	if (i == 0){
		$('#slides ul li').addClass('selected');
	}
}

//клики по слайдам
$('#slides ul li').click(function (e) {
	//убрали у всех элементов класс selected
	$('#slides ul li').removeClass('selected');
	$('#slides ul li img').removeClass('selected');
	//присвоили клас выбраному элементу
	$(this).addClass('selected');
	// получаем id элемента по которому кликнули
	let id = e.currentTarget.dataset.id;

	currentImage = id;
	//меняем картинку на слайде по id
	$('#main_slider img')
		.attr("src", path + images[id]);
});


// увеличение картинки при клике на большую картинку
$('#main_slider img').click(function(){
	$('#opacity').css('display', 'block');
	$('#full_image')
		.css('display', 'block')
			.append('<img src="' + $(this).attr('src') + '">');
});


$('#opacity').click(function(){
	$('#opacity').css('display', 'none');
	$('#full_image').css('display', 'none').empty();
})