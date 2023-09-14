// snake head initial position
let snake = [{top:200,left:200}];

// setting the direction
let direction = {key:'ArrorRight',dx:20,dy:0};

// adding event listener to the keys(arrow)
window.addEventListener('keydown', e=>{
    const newDirection = getDirection(e.key);
    const allowedChange = Math.abs(direction.dx) !== Math.abs(newDirection.dx);
    if(allowedChange){
        direction = newDirection;
    }
})

// changing the direction of the head according to the keyy pressed
function getDirection(key){
    switch(key){
        case 'ArrowUp':return {key,dx:0,dy:-20};
        case 'ArrowDown':return {key,dx:0,dy:20};
        case 'ArrowLeft': return { key, dx: -20, dy: 0 };
        case 'ArrowRight': return { key, dx: 20, dy: 0 };
        default: return direction;
    }
}

// function to move the snake 
function moveSnake(){
    const head = Object.assign({},snake[0]);
    head.top += direction.dy;
    head.left += direction.dx;
    snake.unshift(head);

    if (snake[0].top < 0) snake[0].top = 380;
    if (snake[0].left < 0) snake[0].left = 380;
    if (snake[0].top > 380) snake[0].top = 0;
    if (snake[0].left > 380) snake[0].left = 0;
}


let food = null;

// function for randomly set the food position 
function randomFood(){
    food = {
        top:Math.floor(Math.random() * 20) *20,
        left:Math.floor(Math.random() * 20) *20
    }
}

// function to check weather the food eaten by snake or not
function eatFood(){
    if(snake[0].top === food.top && snake[0].left === food.left){
        fodd = null;
        randomFood();
        return true;
    }
    return false;
}

let score = 0;
let highScore = 0;

// updating score 
function updateScore(){
    document.getElementById("score").innerText = 'Score:'+score;
    document.getElementById("high-score").innerText = 'High Score:'+highScore;
}

// game ending condition 
function gameOver(){
    for(let i =1;i<snake.length;i++){
        if(snake[i].top === snake[0].top && snake[i].left === snake[0].left){
            return true;
        }
    }
    return false;
}

// main function to call the remaing functions 
function gameLoop() {
    if (gameOver()) {
        if (score > highScore) {
            highScore = score;
            alert("Your Score is "+score)
        }
        score = 0;
        snake = [{ top: 200, left: 200 }];
        direction = { key: 'ArrowRight', dx: 20, dy: 0 };
    }

    setTimeout(() => {
        document.getElementById('game-board').innerHTML = '';
        moveSnake();
        if (!food) randomFood();
        if (eatFood()) {
            score++; 
            drawSnake();
        }
        else{
            snake.pop();
        }
        updateScore();
        drawSnake();
        drawFood();
        gameLoop();
    }, 200);
}

gameLoop();

// creating the snake body and  head

function drawSnake() {
    snake.forEach((part, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.top = `${part.top}px`;
        snakeElement.style.left = `${part.left}px`;
        snakeElement.classList.add('snake');
        if (index === 0) snakeElement.classList.add('head');
        document.getElementById('game-board').appendChild(snakeElement);
    });
}

// creating the food for the snake
function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.top = `${food.top}px`;
    foodElement.style.left = `${food.left}px`;
    foodElement.classList.add('food');
    document.getElementById('game-board').appendChild(foodElement);
}
