var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var level = 0
function nextSequence(){
    level++;
    $("h1").text("Level "+ level );
    var randomNumber = Math.floor(Math.random()*4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    blink(chosenColor);
    makeSound(chosenColor);
}
function checkAnswer(pressNumber){
    if(userClickedPattern[pressNumber] == gamePattern[pressNumber]){
        if(userClickedPattern.length==gamePattern.length){
            userClickedPattern = [];
            nextSequence();
        }
    }else{
        failure();
    }
}
function failure(){
    $("h1").text("You Failed, Press Any Button To Start Again.");
    var failSound = new Audio("./sounds/wrong.mp3");
    failSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    level = 0;
}
function blink(color){
    $("#" + color).fadeOut().fadeIn();
}
function makeSound(color){
    if(color == "green"){
       var greenSound = new Audio("./sounds/green.mp3");
        greenSound.play(); 
    } else if (color == "blue"){
        var blueSound = new Audio("./sounds/blue.mp3");
        blueSound.play();
    } else if (color == "red"){
         var redSound = new Audio("./sounds/red.mp3");
        redSound.play();
    } else if (color == "yellow"){
       var yellowSound = new Audio("./sounds/yellow.mp3");
        yellowSound.play(); 
    }
}
$(".btn").on("click", function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animateClick(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function animateClick(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
};
$("html").keydown(function(){
    if(level == 0){
        gamePattern = []
        userClickedPattern = []
        nextSequence();
    };
})