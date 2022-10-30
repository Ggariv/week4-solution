// Gathering Id HTML Variables
// Main variables
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
// Start game variables
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
// Highscore variables
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
// Endgame & Score variables
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore")
var highscoreDisplayScore = document.getElementById("highscore-score");

// Quiz question
// Quiz alternatives variables
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
//Quiz questions array
var quizQuestions = [    
    {question: "Commonly used data types DO NOT include:", 
    choiceA: "strings", 
    choiceB: "booleans",
    choiceC: "alerts",
    choiceD: "numbers",
    correctAnswer: "c"},

    {question: "The condition in an 'if/else' statement is enclosed within ______.", 
    choiceA: "quotes",
    choiceB: "curly brackets",
    choiceC: "parentheses",
    choiceD: "square brackets", 
    correctAnswer: "c"},

    {question: "Arrays in Javascript can be used to store ______.", 
    choiceA: "numbers & strings",
    choiceB: "other arrays",
    choiceC: "booleans",
    choiceD: "all of the above",
    correctAnswer: "d"},

    {question: "String values must be enclosed within ______ when being assigned to variables.", 
    choiceA: "commas", 
    choiceB: "curly brackets",
    choiceC: "quotes",
    choiceD: "parantheses",
    correctAnswer: "c"},

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
    choiceA: "Javascript",
    choiceB: "terminal/bash",
    choiceC: "for loops",
    choiceD: "console.log", 
    correctAnswer: "b"},
    ];

//Other variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 75; // Starting time
var timerInterval;
var score = 0; // initial score
var correct;

//question & answer generator function.
var generateQuizQuestion = function() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
        }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "<p>"
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
    }

// Starting quiz function -> starts the TimeRanges, hides the start button, and displays the first quiz question.
var startQuiz = function() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
    
    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left " + timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
            }
        }, 1000);
    quizBody.style.display = "block";
    };

// End page screen & score display function once either quiz is completed or time runs out
var showScore = function() {
    quizBody.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " right";
    };

// Save and stringfy function of highscore data
submitScoreBtn.addEventListener("click", function highscore(){
    if (highscoreInputName.value === "") {
        alert("Please state your initials");
        return false;
        }
    else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
            };
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
        }
    });

// clear list and new highscore generator function from local storage
var generateHighscores = function() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan =  document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
        }
    };

// highscore function
var showHighscore = function() {
    startQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
    };

// local storage clear score function (text & score)
var clearScore = function() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
    };

// play again and value reset function
var replayQuiz = function() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
    };    

// Answer check function
var checkAnswer = function(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Correct answer");
        currentQuestionIndex++;
        generateQuizQuestion();
        }
    else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        timeLeft= timeLeft - 10;
        alert("Incorrect answer");
        currentQuestionIndex++;
        generateQuizQuestion();
        }
    else {showScore()};
    }

// Start-game function
startQuizButton.addEventListener("click", startQuiz);