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

// creating an array Question and passing the questions, options, and answers
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
  {
    question: "How do you create a function in JavaScript?",
    answer: "function myFunction()",
    options: [
      "function myFunction()",
      "function=myFunction()",
      "function:myFunction()",
      "var function=myFunction()",
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answer: "script tag",
    options: ["js tag", "javascript tag", "script tag", "scripting tag"],
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answer: 'alert("Hello World");',
    options: [
      'msg("Hello World");',
      'alert("Hello World");',
      'msgBox("Hello World");',
      'alertBox("Hello World");',
    ],
  },
  {
    question:
      'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    answer: "if(i!=5)",
    options: ["if i <>5", "if(i!=5)", "if i=! 5 then", "if(i<>5)"],
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answer: "Math.round(7.25)",
    options: ["Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)", "rnd(7.25)"],
  },
  {
    question: "How does a FOR loop start?",
    answer: "for (i=0;i<=5;i++)",
    options: [
      "for (i=0;i<=5;i++)",
      "for i = 1 to 5",
      "for (i=0;i<=5)",
      "for (i <=5;i++)",
    ],
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answer: 'var colors = ["red, "green", "blue"]',
    options: [
      'var colors = ["red, "green", "blue"]',
      'var colors = (1:"red",2:"green",3:"blue")',
      'var colors = "red","green","blue"',
      'var colors = 1=("red),2=("green"),3=("blue")',
    ],
  },
];

// Timer Function

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

// Start button Click function added and checking if there is in the page
if (startButton != null) {
  startButton.addEventListener("click", start);
}

// Start Function which include other function
function start() {
  timer();
  showQuetions(0);
  startquestion();
}

// Suffling the Question
randomQuestion = questions.sort(function () {
  return 0.5 - Math.random();
});

// getting questions and options from array
function showQuetions(index) {
  var que_text = document.querySelector(".question-text");
  clearlist();

  que_text.innerHTML =
    "<h2>" + (que_count + 1) + ". " + questions[index].question + "</h2>";

  for (var i = 0; i < 4; i++) {
    var optional_list = document.createElement("li");
    var optional_answer = questions[index].options[i];
    optional_list.innerHTML = optional_answer;
    optional_list.classList.add("option");
    option_list.append(optional_list);
  }

  var option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Clearlist function
function clearlist() {
  var ol = document.querySelector(".option-list");
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

// NextQuestion Function
function nextQuestion() {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    showQuetions(que_count); //calling showQestions function
  } else {
    tempscoreSection();
  }
}

// Tempscoresction Function
function tempscoreSection() {
  quiz_box.classList.remove("activeInfo"); //show info box
  temp_score.classList.remove("inactiveinfo");
  quiz_box.classList.add("inactiveinfo"); //show info box
  temp_score.classList.add("activeInfo");

  scoredisplay.textContent = userScore;
}

// Start Question Function
function startquestion() {
  info_box.classList.add("inactiveinfo");
  quiz_box.classList.add("activeInfo"); //show info box
  temp_score.classList.add("inactiveinfo");
}

// Submit Button click function checking the condition
if (submit) {
  submit.addEventListener("click", resultArray);
}

var scoreStrd = [];

// Result Array for score display and setting item in localstorage
function resultArray() {
  var existingEntries = JSON.parse(localStorage.getItem("user"));
  if (existingEntries == null) {
    existingEntries = [];
  }
  var score_array = {
    name: scorerName.value,
    score: userScore,
  };

  existingEntries.push(score_array);
  localStorage.setItem("recent", JSON.stringify(scoreStrd));
  localStorage.setItem("user", JSON.stringify(existingEntries));
}

// For Highscore Page
var highscoreList = document.getElementById("highscoreList");
var clearBtn = document.getElementById("clear");
if (clearBtn) {
  clearBtn.addEventListener("click", clearScores);
}
// ClearScore Function
function clearScores() {
  localStorage.clear();
  while (highscoreList.firstChild) {
    highscoreList.removeChild(highscoreList.firstChild);
  }
}
// Pulling the data from localstorage to display in highscore page
var resultList = [] ;
function init() {
  var player = JSON.parse(localStorage.getItem("user"));

  if (player !== null) {
    resultList = player;
  }
  renderResult();
}
function renderResult() {
  resultList.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < resultList.length; i++) {
    if (i > 5) return;
    var resultName = resultList[i].name;
    var resultScore = resultList[i].score;

    var liList = document.createElement("li");

    liList.textContent = i+1 + ". " + resultName + " has scored " + resultScore;

    highscoreList.appendChild(liList);
  }
}
