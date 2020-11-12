// запуск стартовой страницы
startPage();

// нажатие на кнопку старта
startKnopka.onclick = goGame;

// Функия создания игрового поля
function goGame(){
	// удаление стартовой страницы
	udelanieStartPage();
	// создание блока очков
	createScore();
	// создание блока жизней
	createLife();
	// слздание нашего коробля
	createShip();
	// создание противников
	createEnemy();
	// таймер задежки первого выстрела противника
	setTimeout (timerIgra, 500);
}

// Собитие по нажатии кнопок
document.addEventListener('keydown', function(key){
	ship = document.querySelector("#ship");
	// существует ли наш кораблик
	if (ship != null) {
		switch(key.keyCode){
			// нажатие стрелки влево или A
			case 37:
			case 65:
				if ((ship.offsetLeft - ship.offsetWidth) >= gamePole.clientLeft) {
					ship.style.left = ship.offsetLeft - 25 + "px";
				}
				break;
			// нажатиe стрелки вправо или D
			case 39:
			case 68:
				if ((ship.offsetLeft + 2*ship.offsetWidth) <= gamePole.offsetWidth){
					ship.style.left = ship.offsetLeft + 25 + "px";
				}
				break;
			// нажатиe пробела(space)
			case 32:
				createPull();
				break;
		}
	}
});