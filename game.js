console.log("hello");

var gameWidth = 1290,
	gameHeight = 600;

var paddleWidth = 60,
	paddleHeight = 150,
	paddleSpeed = 16;
var ballWidth = 60,
	ballHeight = 40,
	ballSpeedStart = 16,
	ballSpeed = ballSpeedStart;

var scoreMax = 5;

var paddlePlayer = {
	elem: document.querySelector('.paddle-player'),
	x: 0,
	y: gameHeight / 2 - paddleHeight / 2,
	width: paddleWidth,
	height: paddleHeight,
	speed: paddleSpeed,
	moveUp: false,
	moveDown: false
};

var paddleEnemy = {
	elem: document.querySelector('.paddle-enemy'),
	x: gameWidth - paddleWidth,
	y: gameHeight / 2 - paddleHeight / 2,
	width: paddleWidth,
	height: paddleHeight,
	speed: paddleSpeed,
	moveUp: false,
	moveDown: false
};
var ball = {
	elem: document.querySelector('.ball'),
	x: gameWidth / 2 - ballWidth / 2,
	y: gameHeight / 2 - ballHeight / 2,
	vx: ballSpeed,
	vy: ballSpeed,
	width: ballWidth,
	height: ballHeight
};
var scorePlayer = {
	elem: document.querySelector('.score-player'),
	value: 0
};

var scoreEnemy = {
	elem: document.querySelector('.score-enemy'),
	value: 0
};



function addEventListeners() {
	window.addEventListener('keydown', function(e) {
		if (e.which === 38) { paddlePlayer.moveUp = true; }
		if (e.which === 40) { paddlePlayer.moveDown = true; }
	});

	window.addEventListener('keyup', function(e) {
		if (e.which === 38) { paddlePlayer.moveUp = false; }
		if (e.which === 40) { paddlePlayer.moveDown = false; }
	});
}






function moveBall() {
	ball.x += ball.vx;
	ball.y += ball.vy;
}




function resetBall() {
	ball.x = gameWidth / 2 - ballWidth / 2;
	ball.y = gameHeight / 2 - ballHeight / 2;
	ball.vx = 0;
	ball.vy = 0;
	setTimeout(function() {
		ball.vx = ballSpeed;
		ball.vy = ballSpeed;
	}, 1000);
}



function containBall() {



	if (ball.y <= 0) {
		
		ball.y = 0;
		ball.vy = -ball.vy;
	} else if (ball.y + ball.height >= gameHeight) {
		ball.y = gameHeight - ball.height;
		ball.vy = -ball.vy;
	}

	if (ball.x <= 0) {
		scoreEnemy.value += 1;
		ball.x = 0;
		ball.vx = -ball.vx;
		ballSpeed += 1;
		resetBall();
		
		
	} else if (ball.x + ball.width >= gameWidth) {
		scorePlayer.value += 1;
		ball.x = gameWidth - ball.width;
		ball.vx = -ball.vx;
		ballSpeed += 1;
		resetBall();
	}
	

	
}




function movePlayer() {
	if (paddlePlayer.moveUp) {
		paddlePlayer.y -= paddlePlayer.speed;
	} else if (paddlePlayer.moveDown) {
		paddlePlayer.y += paddlePlayer.speed;
	}
}




function addEventListeners() {
	window.addEventListener('keydown', function(e) {
		if (e.which === 38) { paddlePlayer.moveUp = true; }
		if (e.which === 40) { paddlePlayer.moveDown = true; }
	});

	window.addEventListener('keyup', function(e) {
		if (e.which === 38) { paddlePlayer.moveUp = false; }
		if (e.which === 40) { paddlePlayer.moveDown = false; }
	});
}


function moveEnemy() {
	if (Math.random() < 0.2) {
		paddleEnemy.moveUp = false;
		paddleEnemy.moveDown = false;
		if (ball.y + ballHeight < paddleEnemy.y + paddleEnemy.height / 2) {
			paddleEnemy.moveUp = true;
		} else if (ball.y > paddleEnemy.y + paddleEnemy.height / 2) {
			paddleEnemy.moveDown = true;
		}
	}

	if (paddleEnemy.moveUp) {
		paddleEnemy.y -= paddleEnemy.speed;
	} else if (paddleEnemy.moveDown) {
		paddleEnemy.y += paddleEnemy.speed;
	}
}

function containPaddles() {
	paddlePlayer.y = Math.max(0, paddlePlayer.y);
	paddlePlayer.y = Math.min(gameHeight - paddlePlayer.height, paddlePlayer.y);

	paddleEnemy.y = Math.max(0, paddleEnemy.y);
	paddleEnemy.y = Math.min(gameHeight - paddleEnemy.height, paddleEnemy.y);
}


function collisionAABB(r1, r2) {
	if (!(
		r1.y + r1.height < r2.y || // rect1 is above rect2
		r1.x > r2.x + r2.width ||  // rect1 is on the right of rect2
		r1.y > r2.y + r2.height || // rect1 is below rect2
		r1.x + r1.width < r2.x     // rect1 is on the left of rect2
	)) {
		return true;
	}
}
function checkCollisions() {
	if (collisionAABB(ball, paddlePlayer)) {
		ball.x = paddlePlayer.x + paddlePlayer.width;
		ball.vx = -ball.vx;
	}

	if (collisionAABB(ball, paddleEnemy)) {
		ball.x = paddleEnemy.x - ball.width;
		ball.vx = -ball.vx;
	}
}

function checkWinState() {
	if (scorePlayer.value === scoreMax) {
		console.log('You win!');
		resetGame();
	} else if (scoreEnemy.value === scoreMax) {
		console.log('You get nothing! You lose! Good day, sir!');
		resetGame();
	}
}

function resetGame() {
	ballSpeed = ballSpeedStart;
	scorePlayer.value = 0;
	scoreEnemy.value = 0;
	resetBall();
}





function init() {
	+ addEventListeners();
	+ loop();
}

function update() {
	+ moveBall();
	+ containBall();
	+ movePlayer();
	+ moveEnemy();
	+ containPaddles();
	+checkCollisions();
	+checkWinState();
}

function render() {
	paddlePlayer.elem.style.transform =
		'translate(' + paddlePlayer.x + 'px, ' + paddlePlayer.y + 'px)';

	paddleEnemy.elem.style.transform =
		'translate(' + paddleEnemy.x + 'px, ' + paddleEnemy.y + 'px)';

	ball.elem.style.transform =
		'translate(' + ball.x + 'px, ' + ball.y + 'px)';

	scorePlayer.elem.innerHTML = scorePlayer.value;
	scoreEnemy.elem.innerHTML = scoreEnemy.value;
}


	function loop() {
	+ requestAnimationFrame(loop);
	+ update();
	+ render();
}





init();

//render();
//moveBall();
//loop();