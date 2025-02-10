var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Start or Restart game when clicking the Start button
$(".start-btn").click(function() {  
  if (!started) {
    started = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    $(".start-btn").hide();  // 🆕 HIDE BUTTON WHEN GAME STARTS
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over!");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $(".start-btn").text("Restart").show();  // 🆕 SHOW BUTTON AS RESTART
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  started = false;
}

// Redirect to Rules page
$(document).ready(function() {
  $(".rules").click(function() {
    window.location.href = "index2.html";
  });
});
