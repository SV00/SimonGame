
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern;

var level = 0;

var step = 0;

$(".btn").on("click", function(){
    // get the color
    var userChosenColour = $(this).attr("id");

    // add to the pattern player
    userClickedPattern = userChosenColour;

    // make a sound of the button
    playSound(userChosenColour);

    // animete the press
    animatePress(userChosenColour);

    // check if it's the right choosen
    if (!checkAnswer(step)){
        // wrong button
        error();
    }
});

$(document).on("keydown", function(){
    // if the gamepattern is empty any key you press doesn't do anything
    if (gamePattern.length === 0){
        $("h1").text("level" + level);
        nextSequence();
    }
});

function nextSequence(){
  // increase the level to 1
  level++;
  $("h1").text("level " + level);

  // set current levet to 0
  step = 0; 

  // choose the next button   
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // animate the next button 
  setTimeout(function() { $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); }, 750);

  // make sound
  playSound(randomChosenColour);
}

function playSound(name){
    // make sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    // add class pressed to the button 
    $("#" + currentColor).addClass("pressed");

    // remove after 100 millsec class pressed to the button
    setTimeout(function(){ $("#" + currentColor).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel){
    // check if it's the right button
    if (gamePattern[currentLevel] === userClickedPattern){
        // increase the step level
        step++;
        // check if you get the level up
        if ((gamePattern.length - 1) === currentLevel){
            nextSequence();
        }
        return true;
    }
    else {
        // the wrong button
        return false;
    }
}

function error(){
    // set step to 0
    step = 0;

    // set level to 0
    level = 0;

    // set gamePattern
    gamePattern = [];

    // make the wrong sound
    playSound("wrong");

    // error display
    $("body").addClass("game-over");
    setTimeout(function() { $("body").removeClass("game-over"); }, 200);

    // set the instruction
    $("h1").text("Game Over, Press Any Key to Restart");
}
