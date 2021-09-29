var timer = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var info_box = document.querySelector("#infobox");
var quiz_box = document.querySelector("#question-box");
var temp_score = document.querySelector("#temp-score");
var option_list = document.querySelector(".option-list");
var result_display = document.querySelector(".instant-result_wrap");
var scoredisplay = document.querySelector(".score");
var submit = document.getElementById("submit");
var scoreList = document.querySelector(".score_list");


var randomQuestion;
var que_count = 0;
var userScore = 0;
var timeleft = 75;

// creating an array and passing the number, questions, options, and answers
var questions = [
  {
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
  },
];

// Restart
function restart(){
  userScore = 0;
  timeleft = 75;
  start();
}

// Timer

var timer = function () {
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.querySelector(".timer").innerHTML = "Times Up";

      tempscoreSection();
    } else {
      document.querySelector(".timer").innerHTML =
        timeleft + " seconds remaining";
    }

    if (!(que_count < questions.length - 1)) {
      //if question count is less than total question length
      clearInterval(downloadTimer);
    }

    timeleft--;
  }, 1000);
};

// if start button clicked
if(startButton != null){
  startButton.addEventListener("click", start);
}

function start() {
  timer();
  showQuetions(0);
  startquestion();
}

// getting questions and options from array
function showQuetions(index) {
  randomQuestion = questions.sort(() => Math.random() - .5)

  console.log(randomQuestion);

  var que_text = document.querySelector(".question-text");
  console.log(que_text);

  clearlist();


  que_text.innerHTML = "<h2>" + (que_count+1) + ". " + questions[index].question + "</h2>";
   

  for (var i = 0; i<4; i++) {
    var optional_list = document.createElement('li');
    var optional_answer = questions[index].options[i];
    optional_list.innerHTML = optional_answer;
    optional_list.classList.add('option');
    option_list.append(optional_list);
  }
  
  

  var option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function clearlist() {
  var ol = document.querySelector('.option-list');
  var listLength = ol.children.length;

  for (i = 0; i < listLength; i++) {
    ol.removeChild(ol.children[0]);
  }
}

//if user clicked on option
function optionSelected(answer) {
  var userAns = answer.textContent; //getting user selected option
  var correcAns = questions[que_count].answer; //getting correct answer from array

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    result_display.innerHTML =
      "<div class='instant-result'>The answer is correct</div>";
    // console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    result_display.innerHTML =
      "<div class='instant-result'>The answer is Incorrect</div>";
    // console.log("Wrong Answer");

    timeleft -= 15;
  }

  nextQuestion();

  setTimeout(function () {
    result_display.textContent = " ";
  }, 2000);
}

function nextQuestion() {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    showQuetions(que_count); //calling showQestions function
  } else {
    tempscoreSection();
  }
}

function tempscoreSection() {
  quiz_box.classList.remove("activeInfo"); //show info box
  temp_score.classList.remove("inactiveinfo");
  quiz_box.classList.add("inactiveinfo"); //show info box
  temp_score.classList.add("activeInfo");

  scoredisplay.textContent = userScore;
};

function startquestion() {
  info_box.classList.add("inactiveinfo");
  quiz_box.classList.add("activeInfo"); //show info box
  temp_score.classList.add("inactiveinfo");
}

if (submit) {
  submit.addEventListener("click", resultArray);
}

var scoreStrd = [];

function resultArray() {
  var existingEntries = JSON.parse(localStorage.getItem("user"));
  if(existingEntries == null) {
    existingEntries = [];
  }
  var score_array = {
    name : scorerName.value,
    score : userScore
  };
  
  localStorage.setItem("scoreStrd", JSON.stringify(scoreStrd));
  scoreStrd.push(score_array);
  // console.log(scoreStrd);

  localStorage.setItem("user", JSON.stringify(scoreStrd));
  
}

// function renderMessage() {
//   var displayScore = JSON.parse(localStorage.getItem("user"));
//   // console.log(user);
//   if (displayScore !== null) {
//     console.log(displayScore);
//     scoreList.textContent = displayScore[0] + " has scored " + displayScore[1];
//   }
// }

// var arName = document.getElementById("scorerName").value;
  // var arScore = userScore;
  // console.log(arName, arScore);
  // console.log(arName, arScore);
  // console.log(score_array);
  var ul = document.getElementById('highscoreList');
  var li = document.createElement("li");
  var clearBtn = document.getElementById("clear");

var playerList = [];
function renderLi() {

  playerList.sort(function(a, b){
      return b.score - a.score;
});

  for (var i = 0; i < playerList.length; i++) {

    var y = playerList[i].name;
    var z = playerList[i].score;
    
    var li = document.createElement("li");
      
    li.textContent = y + " has scored " +  z ;
  
    ul.appendChild(li);

  }

}
function init() {
  var player = JSON.parse(localStorage.getItem("user"));

  if (player !== null) {
    playerList = player;
  }

  renderLi();
}