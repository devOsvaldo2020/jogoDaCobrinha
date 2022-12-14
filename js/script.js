let canvas = document.getElementById('snake');
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let jogo = setInterval(iniciarJogo, 500);

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,     
}

snake[0] = {
    x: 8 * box,
    y: 8 * box
}


function criarBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}      

function movimento(){
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;

    if(direction == 'down') snakeY += box;
    if(direction == 'up') snakeY -= box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();        
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 65 && direction != 'right') direction = 'left';
    if(event.keyCode == 87 && direction != 'down') direction = 'up';
    if(event.keyCode == 68 && direction != 'left') direction = 'right';
    if(event.keyCode == 83 && direction != 'up') direction = 'down';  
    
}

function paredes(){
    if(snake[0].x >= 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x <= 2  && direction == 'left') snake[0].x = 15 * box;

    if(snake[0].y >= 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y <= 2  && direction == 'up') snake[0].y = 15 * box;

    
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function gameOver(){
    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Fim do jogo");                   
        }        
    }
}
function iniciarJogo(){
    criarBG();//1    
    criarCobrinha();//2
    gameOver();//3
    paredes();//4
    movimento();//5
    drawFood();//6
    update();//7       
}
