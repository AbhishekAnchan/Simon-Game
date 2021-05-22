let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// $(document).keydown(function(){
//     if(!started){
//         $("#level-title").text("Level "+ level);
//         nextSequence();
//         started = true;  
//     } 
// })

// If the player clicks start button then the game starts
$(".start-button").click(function() {
    if(!started){
        $("#level-title").text("Level "+ level);
        $(".start-button").addClass("hide");
        nextSequence();
        started = true;  
    }     
})

// When a player clicks colors boxes his pattern is stored in @userClickedPattern 
// and checked against the pattern given
$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//random generated color pattern against which the user pattern is checked
function nextSequence() {
    level++;
    $("#level-title").text("Level "+ level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

//playing the sounds
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();  
}

//colored box press animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

//checking @userClickedPattern against @gamePattern
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length-1 == currentLevel){
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];                
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");             
        },200);
        $("#level-title").text("Game Over");
        $(".start-button").removeClass("hide");
        $(".start-button").text("Restart");
        restart();
    }
}

//restart game
function restart() {
    level = 0;
    started = false;
    gamePattern = [];    
}





