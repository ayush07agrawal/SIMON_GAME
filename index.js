
let gamePattern = [];
let userchoosenColor = [];

let level = 0;
let started = false;

let btnColors = ["red", "yellow", "green", "blue"];

$(document).on("keydown",function(){
    if(!started){
        started = true;
        updateGameSequence();
    }
})

function updateGameSequence() {
    userchoosenColor = [];
    ++level;
    $("#level-title").text("Level "+level);
    let randomColor = btnColors[randomNumber()];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}


$(".btn").on("click",function(event){
    userchoosenColor.push(event.target.id);
    animatePressedKey(event.target.id);
    checkAnswer(userchoosenColor.length-1);
})

function checkAnswer(currentLevel){
    if(userchoosenColor[currentLevel] != gamePattern[currentLevel]){
        gameover();
        $("#level-title").text("Game Over! Press Enter key to Restart.");
        level = 0;
        started = false;
    }

    else if(userchoosenColor.length === gamePattern.length){
        setTimeout(() => {
            updateGameSequence();
        }, 1000);
    }        
}

function animatePressedKey(pressedkey){
    $("#"+pressedkey).addClass("pressed");
    setTimeout(function(){
        $("#"+pressedkey).removeClass("pressed");
    }, 100);
    playSound(pressedkey);
}

function gameover(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(()=>{
        $("body").removeClass("game-over");
    },200);
    gamePattern = [];
}

function playSound(color){
    let audio1 = new Audio("./sounds/"+color+".mp3");
    audio1.play();
}

function randomNumber() {
    return Math.floor(Math.random() * 4);
}