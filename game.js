var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function() {
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }

  } else {
    console.log("wrong");
    $(document.body).addClass("game-over");
    setTimeout(function() {
      $(document.body).removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();



  }

}



function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // random number between 0-4

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
