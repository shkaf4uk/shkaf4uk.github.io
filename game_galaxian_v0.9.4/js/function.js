//Генерация рандомного числа
function getRandom(max) {
  return Math.floor(1 + Math.random() * max);
}


/*================================
	Функции создания игрового поля
==================================*/

// Создание стартовой страницы
function startPage(){
	startBlockGame = document.createElement('div');
	startBlockGame.id = 'startBlock';
	gamePole.appendChild(startBlockGame);
	startBlockGame.style.display = "block";
	startBlockGame.style.backgroundImage = "url(images/maxresdefault.jpg)";
	//создание стартовой надписи 'Galaxian'
	startH1 = document.createElement('h1');
	startH1.innerText = 'Galaxial';
	startBlockGame.appendChild(startH1);
	//Создание старт кнопки 'Start!'
	startKnopka = document.createElement('button');
	startKnopka.id = 'startKnopka';
	startKnopka.innerText = 'Start!';
	startBlockGame.appendChild(startKnopka);
	//создание стартовой надписи 'Driving: '
	startInfoDrive = document.createElement('h2');
	startInfoDrive.className = 'infoDrive';
	startInfoDrive.innerText = 'Driving: '
	startBlockGame.appendChild(startInfoDrive);
	//создание стартовой надписи '< or a left \n > or a right'
	startH3 = document.createElement('h3');
	startH3.id = 'leftRight';
	startH3.innerText = '< or A left \n > or D right';
	startBlockGame.appendChild(startH3);
	//создание стартовой надписи 'Shooting: Space '
	startInfoShoot = document.createElement('h2');
	startInfoShoot.className = 'infoShoot';
	startInfoShoot.innerText = 'Shooting: Space';
	startBlockGame.appendChild(startInfoShoot);
}

// Создание блока очков
function createScore(){
	ochki = document.createElement("div");
	ochki.id = "ochki";
	ochki.innerText = score;
	gamePole.appendChild(ochki);
}
	
// Создание блока жизней
function createLife(){
	life = document.createElement("div");
	life.id = "life";
	// temp - временная переменная
	var temp = 0;
	// создание нужного количества жизней
	while (temp < numbLife){
		var span = document.createElement("span");
			span.style.backgroundImage = "url(images/life1.png)";
			life.appendChild(span);
			temp++;
	}
	gamePole.appendChild(life);
}

// Создание нашего кораблика
function createShip(){
	ship = document.createElement("div");
	ship.id = "ship";
	ship.style.backgroundImage = "url(images/ship1.png)";
	gamePole.appendChild(ship);
}

// Создал врагов
function createEnemy(){
	// создаем нужное количество противником и присваиваем каждому свой class и координаты размещения на игровом поле
	for (var i = 1; i <= enemyCount; i++) {
		enemy = document.createElement("div");
		enemy.className = "enemy"+i;
		enemy.style.width = "64px";
   		enemy.style.height = "64px";
   		enemy.style.position = "absolute";
    	enemy.style.backgroundImage = "url(images/enemy.png)";
    	enemy.style.transition = "all 0.1s";
		enemy.style.left = startX + "px";
		enemy.style.top = startY + "px";
		startX = startX + 75;
		// проверяем, чтобы противник не выходил за нашы пределы, если выходит создаем новый ряд
		if (startX >= 700) {
			startY = startY + 75;
			startX = 100;
		}
		// добавляем противника на игровое поле
	gamePole.appendChild(enemy);
	}
}

// Создание пули 
function createPull(){
	pull = document.querySelector("#pull");
	// существует ли наша пуля
	if(pull == null){
	// создание блока пули с id pull
		pull = document.createElement("div");
		pull.id = "pull";
		// установка пули относительно положения нашего кораблика
		pull.style.top = ship.offsetTop - 20 + "px";
		pull.style.left = ship.offsetLeft + 28 + "px";
		// добавления пули в игровое поле
		gamePole.appendChild(pull);
		// движение пули
		var timerPull = setInterval(function(){
		pull.style.top = pull.offsetTop - 10 + "px";
		// проверка выхода за пределы игрового поля пули
		if (pull.offsetTop <= gamePole.offsetTop) {
			// удаление пули
			pull.remove();
			// удаление таймера
			clearInterval(timerPull);
		}
		// проверка на попадание пули в одного из противников
		for (var i = 1; i <= enemyCount; i++) {
			// перебираем противников
			enemy = document.querySelector(".enemy"+i);
			// проверка существует ли противник
			if (enemy != null) {
				// проверяем совподает ли положение пули и противника
				if(pull.offsetTop < (enemy.offsetTop + enemy.offsetHeight) 
					&& (pull.offsetLeft + pull.offsetWidth)> enemy.offsetLeft 
					&& pull.offsetLeft < (enemy.offsetLeft + enemy.offsetWidth) ){
					// при попадании добавляем очки
					score++;
					// обновляем значение очков
					ochki.innerText = score;
					// удаляем противника
					enemy.remove();
					// удаляем пулю
					pull.remove();
				}
			}			
		}
			// если уничтожили всех противников игра заканчивается
			if (score == enemyCount*level) {
			   	startX = 100;
				startY = 60;
				level++;
				createEnemy();
			}
		},20);	
	}
}

// Создание пуль врагов
function createPullEnemy(){
	// выбор ближайшего противника для выстрела
	for (var i = 1; i <= enemyCount; i++) {
		var enemy = document.querySelector(".enemy" + (i+getRandom(16)));
		//условие прицеливание по нашому кораблю 
		if ((enemy != null && ship.offsetLeft == enemy.offsetLeft && pullEnemy == null) || 
			(enemy != null && ship.offsetLeft == (enemy.offsetLeft + (enemy.offsetWidth/2)) && pullEnemy == null) ||
			(enemy != null && ship.offsetLeft == (enemy.offsetLeft - (enemy.offsetWidth/2)) && pullEnemy == null) ||
			(enemy != null && ship.offsetLeft == (enemy.offsetLeft - enemy.offsetWidth) && pullEnemy == null) ||
			(enemy != null && ship.offsetLeft == (enemy.offsetLeft + enemy.offsetWidth) && pullEnemy == null) 
			) {
			// создание пули врагов, присвоение ей нужных параметров
			var pullEnemy = document.createElement("div");
				pullEnemy.className = "enemyPull";
				pullEnemy.style.width = "10px";
		   		pullEnemy.style.height = "15px";
		   		pullEnemy.style.background = "red";
		    	pullEnemy.style.borderRadius = "14px";
		    	pullEnemy.style.position = "absolute";
			   	pullEnemy.style.transition = "all 0s";
				pullEnemy.style.left = enemy.offsetLeft + 27 + "px";
				pullEnemy.style.top = enemy.offsetTop + 40 + "px";
				gamePole.appendChild(pullEnemy);
			// создание таймера для полета пули вражеского коробля
			var timerPullEnemy = setInterval(function(){
				pullEnemy = document.querySelector(".enemyPull");
				pullEnemy.style.top = pullEnemy.offsetTop + 2.5 + "px";
			// проверка выхода за пределы игрового поля пули
			if ((pullEnemy.offsetTop + pullEnemy.offsetHeight) >= gamePole.offsetHeight) {
					pullEnemy.remove();
					clearInterval(timerPullEnemy);
			}
			// проверка на попадание пули врагов в наш корабль
			if (pullEnemy != null) {
				if((pullEnemy.offsetTop + pullEnemy.offsetHeight)> ship.offsetTop 
					&& (pullEnemy.offsetLeft + pullEnemy.offsetWidth) > ship.offsetLeft 
					&& pullEnemy.offsetLeft <(ship.offsetLeft + ship.offsetWidth) ){
						// удаление пули при попадании в наш кораблик
						pullEnemy.remove();
						// уменьшение жизней
						numbLife = numbLife - 1;
						// закончились ли жизни
						if (numbLife == 0){
							status = "end";
							// запись рекорда очков
							if (score > HighScore){
								HighScore = score ;
							}
							// удаление игрового поля и создание финального экрана
							udalenieEnemy();
							sozdanieKoniecIgra();
							udalenieOchki();
							udalenieLifes();
							udalenieShip();
							sozdanieStartBlock();
						} else {
						udalenieLifes();
						createLife();
						clearInterval(timerPullEnemy);	
						}		
					}
				}
				// игра закончилась
				if (status == "end") {
					clearInterval(timerPullEnemy);	
				}
			},10);
		}
	}
}

// Функция движения противников влево
function moveEnemyLeft(){
	// перебор противников начиная с левой строны продвигаясь по колонкам с лево на право снизу вверх
	for (var i = 17; i <= enemyCount; i = i - 8) {
		enemy = document.querySelector(".enemy"+i);
		// существует ли выбраный кораблик
		if (enemy != null) {
			// сдвигаем все существующии противники влево 
			for (var j = 1; j <= enemyCount; j++) {
				enemy = document.querySelector(".enemy"+j);
				if (enemy != null) {
						enemy.style.left = enemy.offsetLeft - 5 + "px";
					}
					// когда сдвинули последний проверяем будет ли следующий сдвиг выходить за пределы поля
					if (j == 24) {
						for (var k = 17; k < enemyCount; k = k - 8) {
							enemy = document.querySelector(".enemy"+k);
							if (enemy != null) {
								// если выходим за пределы меняй направление движения
								if ((enemy.offsetLeft - 30) < gamePole.clientLeft){
									napravlenie = 2;
								}
								break;
							}
							// проверка на перескок на новую колонку вправо
							if ((k - 8) < 0) {
								k = k + 25;
							}
						}
					}
			}
			break;
		}
		// проверка на перескок на новую колонку вправо
		if ((i - 8) < 0) {
			i = i + 25;
		}
	}
}

// Функция движения противников вправо
function moveEnemyRight(){
	// перебор противников начиная с правой строны продвигаясь по колонкам с право на лево снизу вверх
	for (var i = 24; i <= enemyCount; i = i - 8) {
		enemy = document.querySelector(".enemy"+i);
		// существует ли выбраный кораблик
		if (enemy != null) {
			// сдвигаем всех существующих противников вправо
			for (var j = 1; j <= enemyCount; j++) {
				enemy = document.querySelector(".enemy"+j);
				if (enemy != null) {
					enemy.style.left = enemy.offsetLeft + 5 + "px";
				}
				// когда сдвинули последний проверяем будет ли следующий сдвиг выходить за пределы поля
				if (j == 24) {
					for (var k = 24; k <= enemyCount; k = k - 8) {
						enemy = document.querySelector(".enemy"+k);
						if (enemy != null) {
							// если выходим за пределы меняй направление движения
							if((enemy.offsetLeft + enemy.offsetWidth + 50) >= gamePole.offsetWidth){
								napravlenie = 1;
							}	
							break;
						}
						// проверка на перескок на новую колонку влево
						if ((k - 8) <= 0) {
							k = k + 23;
						}	
					}
				}
			}
			break;
		}
		// проверка на перескок на новую колонку влево
		if ((i - 8) <= 0){
			i = i + 23;
		}
	}
}


/*==========================
	Функции создания finala
===========================*/

// Создание игрового таймера
function timerIgra() {
	//переменная chasy - в ней храним таймер что бы потом можно было его остановить 
	var chasy = setInterval(function() {
		// игра закончилась?
		if (status != "end") {
		 	// выбираем направление движения
			if (napravlenie == 1) {
				moveEnemyLeft();
			} else {
				moveEnemyRight();
			}	
			// существует ли пуля противника
			pullEnemy = document.querySelector(".enemyPull");
			if (pullEnemy == null) {
				createPullEnemy();
			}
		} else {
			clearInterval(chasy);
		}	
	}, 10);
}

// Создание финального блока игры
function sozdanieKoniecIgra() {
	// создание блока див с id=koniec-igra
	div = document.createElement("div");
	div.id = "koniec-igra";
	// создание заголовка Game over
	var h2 = document.createElement("h2");
	h2.id = "h2";
	h2.innerText = "Game over!";
	// создание блока очков набраных за эту игру и наксимально набранных за сессию
	var h3 = document.createElement("h2");
	h3.id = "h3";
	h3.innerText = "You scored: " + score + " points \n Best result: " + HighScore + " points"; 
	// добавление к финальному блоку
	div.appendChild(h2);
	div.appendChild(h3);
	// дабавление на игровое поле
	gamePole.appendChild(div);
}

// Создание кнопки 'Try again' после конца игры
function sozdanieStartBlock() {
	// создаём блок див startBlock
   	startBlock = document.createElement("div");
    // блоку див даём свой id
	startBlock.id = "start-block"
	// создаём блок для кнопки =>"start-knopka"
 	startKnopka2 = document.createElement("button");
 	// блоку для кнопки => "start-knopka" даём свой id
	startKnopka2.id = "start-knopka";
	// кнопке =>"start-knopka" внутрь вписываем текст "Try again"
	startKnopka2.innerText = "Try again";
	// помещаем в блок див =>startBlock этот блок =>"start-knopka"
	startBlock.appendChild(startKnopka2);
	// помещаем в игровое поле блок див =>startBlock с блоком =>"start-knopka" (ведь я выше прописал)
	gamePole.appendChild(startBlock);
	startKnopka2.onclick = restartGame;
}


//Рестарт игры
function restartGame () {
	// создание стартовой страницы
	startPage();
	startKnopka.onclick = goGame;
	udalenieKonecIgra();
	// обнуление переменных
	status = "start";
	score = 0;
	numbLife = 3;
	startX = 100;
	startY = 60;
	level = 1;
}


/*-------------------------
	Функции удаления
===========================*/

// удаление блока очков
function udalenieOchki() {
	ochki.remove();
}

// удаление блока жизней
function udalenieLifes() {
	life.remove();
}

// удаление нашего кораблика
function udalenieShip() {
	ship.remove();
}

// удаление противников
function udalenieEnemy() {
	var parent = document.getElementById("gamePole");
	while (parent.firstChild) {
	    parent.firstChild.remove();
	}
}

// удаление стартовой страницы
function udelanieStartPage(){
	startBlockGame.remove();
}

// удаление финального блока
function udalenieKonecIgra(){
	div.remove();
	startBlock.remove();
}

//очистка интервала
function stopInterval(){
	clearInterval(timerPullEnemy);
}