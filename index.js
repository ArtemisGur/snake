var example = document.getElementById("example");
 addEventListener("keydown", input);
 let width=document.body.clientWidth / 42; // ширина  
 let height=document.body.clientHeight / 44;
 ctx = example.getContext('2d');
 ctx.fillRect(0, 0, width, height)
        

let gameFalse = false
function randomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

let snake = []
let length = 4

class Chank{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

function init()
{
    snake = []
    length = 4
    for(let i = 0; i < length; i++)
    {
        snake[i] = new Chank(64.5, 64 +i*8 + 0.5)
    }
}


var lastCode;
var HideTail = new Chank(-100, -100);

class Food{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        //this.color = color;
    }
}

var fruit = new Food(
    randomInt(1, width - 8) * 8 + 0.5,
    randomInt(1, height - 8) * 8 + 0.5);

    
    function draw()
    {
    for (i = 0; i < height; i++){
        for (j = 0; j < width; j++){
            ctx.fillStyle = "black";
            ctx.fillRect(j*8, i*8, 8, 8);
           // ctx.strokeStyle = 'cyan'
           // ctx.strokeRect(j*8 + 0.5, i*8 + 0.5, 8, 8)
        }
    }
    ctx.fillStyle = "green";
    ctx.fillRect(fruit.x, fruit.y, 8, 8);
    ctx.fillStyle = "red";
    ctx.fillRect(snake[0].x, snake[0].y, 8, 8);
    ctx.fillStyle = "brown";
    for(let i = 1; i < length; i++)
    {
       ctx.fillRect(snake[i].x, snake[i].y, 8, 8);

    }
}
    
    

function input(e){
    move(e.keyCode);
}

function move(code)
{
    if(code == 65 && lastCode != 68)
    {
        var temp = new Chank(snake[0].x, snake[0].y)
        snake[0].x -= 8;
        HideTail = snake[length-1];
        for(let i = 1; i < length; i++)
        {
            var tmp = snake[i];
            snake[i] = temp;
            temp = tmp;
        }
        lastCode = code;
    }
    else if(code == 87 && lastCode != 83)
    {
        var temp = new Chank(snake[0].x, snake[0].y)
        snake[0].y -= 8;
        HideTail = snake[length-1];
        for(let i = 1; i < length; i++)
        {
            var tmp = snake[i];
            snake[i] = temp;
            temp = tmp;
        }
        lastCode = code;
    }
    else if(code == 68 && lastCode != 65)
    {
        var temp = new Chank(snake[0].x, snake[0].y)
        snake[0].x += 8;
        HideTail = snake[length-1];
        for(let i = 1; i < length; i++)
        {
            var tmp = snake[i];
            snake[i] = temp;
            temp = tmp;
        }
        lastCode = code;
    } 
    else if(code == 83&& lastCode != 87) 
    {
        var temp = new Chank(snake[0].x, snake[0].y)
        snake[0].y += 8;
        HideTail = snake[length-1];
        for(let i = 1; i < length; i++)
        {
            var tmp = snake[i];
            snake[i] = temp;
            temp = tmp;
        }
        lastCode = code;
    }
}

function IsCollide()
{
    for(let i = 0; i < length; i++){
    if(snake[i].x == fruit.x && snake[i].y == fruit.y)
    {
        snake[length] = HideTail;
        length++;
        randomFruit();
        break;
    }
 }
}

function gameOver()
{

    if ((snake[0].x > (width) * 8)
    ||(snake[0].x < 0)
    ||(snake[0].y < 0)
    ||(snake[0].y > (height) * 8))
    {
        gameFalse = true
    }
    
}
function bodyCollide()
{
    for(let i = 1; i < length; i++)
    {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            gameFalse = true
        }
    }
}
var mousePosX;
var mousePosY;
onmousemove = function(e)
{
    console.log("mouse location:", e.clientX, e.clientY)
    mousePosX = e.clientX;
    mousePosY = e.clientY;
}
var mouseDown = 0;
document.body.onmousedown = function() { 
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

function randomFruit()
{
    fruit.x = randomInt(1, width - 1) * 8 + 0.5;
    fruit.y = randomInt(1, height - 1) * 8 + 0.5;
}

function game()
{
    if(gameFalse == false){
    update();
    draw();
    }
    else{
        init();
        draw();
        //
        ctx.fillRect(width * 2.1, height * 1.8, width * 8 / 2, height * 8 / 2)
        ctx.textAlign = "center";
        ctx.font = "12px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("Game over. Click on",148, 68);
        if (mouseDown == 1)
        {
            gameFalse = false;
        }
    }
}



function update()
{
    IsCollide();
    move(lastCode);
    bodyCollide()
    gameOver()
}

setInterval(game, 120); 
init()




