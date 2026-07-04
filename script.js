// --------------------
// Элементы
// --------------------

const player = document.getElementById("player");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const game = document.getElementById("game");
const gameOver = document.getElementById("gameOver");
const music = document.getElementById("music");

let playerY = 0;
let velocity = 0;

const gravity = 0.8;
const jumpPower = -20;

let jumping = false;

let cactusX = window.innerWidth;

let speed = 8;

let score = 0;

let playing = true;

let musicStarted = false;

// --------------------
// Музыка
// --------------------

function startMusic(){

    if(musicStarted) return;

    music.volume = 0.5;

    music.play().catch(()=>{});

    musicStarted = true;

}

// --------------------
// Прыжок
// --------------------

function jump(){

    if(!playing) return;

    startMusic();

    if(jumping) return;

    velocity = jumpPower;

    jumping = true;

}

// ПК

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space" || e.code==="ArrowUp"){

        jump();

    }

});

// Телефон

game.addEventListener("touchstart",jump);

game.addEventListener("mousedown",jump);

// --------------------
// GAME OVER
// --------------------

gameOver.style.display="none";

function lose(){

    playing=false;

    gameOver.style.display="flex";

}

// Перезапуск

gameOver.onclick=()=>{

    location.reload();

}

// --------------------
// Игровой цикл
// --------------------

function update(){

    if(playing){

        // Прыжок

        velocity += gravity;

        playerY += velocity;

        if(playerY>0){

            playerY=0;

            velocity=0;

            jumping=false;

        }

        player.style.bottom=(130-playerY)+"px";

        // Кактус

        cactusX-=speed;

        cactus.style.left=cactusX+"px";

        if(cactusX<-60){

            cactusX=window.innerWidth+Math.random()*300;

            score++;

            scoreText.innerHTML=score;

        }

        // Столкновение

        const p=player.getBoundingClientRect();

        const c=cactus.getBoundingClientRect();

        if(

            p.right>c.left+5 &&

            p.left<c.right-5 &&

            p.bottom>c.top+10

        ){

            lose();

        }

    }

    requestAnimationFrame(update);

}

update();