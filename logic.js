
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var titleScreen = document.querySelector("#title-section");
var questionScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");
var questionTitle = document.querySelector("#question-title");


var sfxRight = new Audio("assets/correct.wav");
var sfxWrong = new Audio("assets/incorrect.wav");

function startQuiz() {
  

  titleScreen.setAttribute("class" , "hide");
  

  questionScreen.setAttribute("class" , "show")

  

  timerId = setInterval(clockTick , 1000);



  timerEl.html = time ;

  getQuestion();
}

function getQuestion() {

  var currentQuestion = questions[currentQuestionIndex];
  
  questionTitle.textContent = currentQuestion.title;

  
  choicesEl.textContent = " ";
 
  currentQuestion.choices.forEach(function(choiceOptions, i){
 
  var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choiceOptions);
  

      choiceNode.textContent = i + 1 + ". " + choiceOptions;
  
      
      choiceNode.onclick = questionClick;
  
      
      choicesEl.appendChild(choiceNode);

  })
 
  
}


function questionClick() {
 
  if (this.value !== questions[currentQuestionIndex].answer) {

    time -= 15;


    timerEl.html = time;

    
    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
  } else {

    feedbackEl.textContent = "Correct!";
    sfxRight.play();
  }

  
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}


function quizEnd() {
  
  clearInterval(timerId);
  
  endScreen.setAttribute("class" , "show");
  
  questionScreen.setAttribute("class" , "hide");
}

function clockTick() {
  
  time-- ;
  timerEl.textContent = time ;
  
  if ( time < 0 ){
    quizEnd();
  }
}



function saveHighscore() {
    
    var initials = initialsEl.value.trim();
  
    
    if (initials !== "") {
      
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      
      var newScore = {
        score: time,
        initials: initials
      };
  
      
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      
      window.location.href = "highscore.html";
    }
  }

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}


submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
