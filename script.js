
var interactive = document.getElementById("interactive");
var start = document.getElementById("start-button");
start.addEventListener("click", quizStart);

function quizStart() {
    killQuiz = false;
    secondsLeft = 60;
    setTime();
    interactive.innerHTML = `<h1>What is the language that controls the structure and basic content of a page?</h1> <ul><li class="wrong">Javascript</li><li class="right">HTML</li><li class="wrong">CSS</li>`;
    var wrong = document.querySelectorAll('.wrong');
    wrong[0].addEventListener("click", penalty);
    wrong[1].addEventListener("click", penalty);
    var right = document.querySelectorAll('.right');
    right[0].addEventListener("click", ques2);
    function ques2() {
        interactive.innerHTML = `<h1>Where do you add a semicolon?</h1> <ul><li class="right">After every line of execution in javascript</li><li class="wrong">wherever you feel like it</li><li class="wrong">In between CSS properties and property values</li><li class="wrong">At the start of every string</li>`;
        var wrong = document.querySelectorAll('.wrong');
        wrong[0].addEventListener("click", penalty);
        wrong[1].addEventListener("click", penalty);
        wrong[2].addEventListener("click", penalty);
        var right = document.querySelectorAll('.right');
        right[0].addEventListener("click", ques3);
        function ques3() {
            interactive.innerHTML = `<h1>What is the name of a variable that can be accessed by any function</h1> <ul><li class="wrong">Basic</li><li class="wrong">Periodic</li><li class="wrong">Fundamental</li><li class="right">Global</li>`;
            var wrong = document.querySelectorAll('.wrong');
            wrong[0].addEventListener("click", penalty);
            wrong[1].addEventListener("click", penalty);
            wrong[2].addEventListener("click", penalty);
            var right = document.querySelectorAll('.right');
            right[0].addEventListener("click", ques4);
            function ques4() {
                interactive.innerHTML = `<h1>What does DOM stand for?</h1><ul><li class="wrong">Dangling Object Manipulation</li><li class="wrong">Drunk Operation of Motorcycle</li><li class="wrong">Dinner's On Me</li><li class="right">Document-Object Model</li>`;
                var wrong = document.querySelectorAll('.wrong');
                wrong[0].addEventListener("click", penalty);
                wrong[1].addEventListener("click", penalty);
                wrong[2].addEventListener("click", penalty);
                var right = document.querySelectorAll('.right');
                right[0].addEventListener("click", ques5);
                function ques5() {
                    interactive.innerHTML = `<h1>Arrays start at</h1><ul><li class="wrong">1</li><li class="wrong">the top</li><li class="right">0</li><li class="wrong">midnight</li>`;
                    var wrong = document.querySelectorAll('.wrong');
                    wrong[0].addEventListener("click", penalty);
                    wrong[1].addEventListener("click", penalty);
                    wrong[2].addEventListener("click", penalty);
                    var right = document.querySelectorAll('.right');
                    right[0].addEventListener("click", endQuiz);
                }
            }
        };
    };
};
function penalty() {
    secondsLeft -= 5;
}

var secondsLeft = 60
var currentScore = 0
var killQuiz = false
var highScores = []

function scoreGet() {
    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    if (storedScores !== null) {
        highScores = storedScores;
    }
}
scoreGet();

function endQuiz() {
    console.log("quiz ended")
    currentScore = secondsLeft;
    console.log(currentScore);
    killQuiz = true;
    interactive.innerHTML = `Your score ${currentScore}! <form><input type="text" id="initials"><div><button id="submit">submit initials</button></div></form>`;
    document.getElementById("submit").addEventListener("click", submitInitials);
    function submitInitials() {
        var initials = document.getElementById("initials").value;
        console.log(initials);
        highScores.push(`${initials} ${currentScore}`);
        console.log(highScores);
        currentScore = 0;
        localStorage.setItem("highscores", JSON.stringify(highScores));
        interactive.innerHTML = `<p id="again">Click to play again!</p>`;
        document.getElementById("again").addEventListener("click", quizStart);
    }

}

function setTime() {
    var timerInterval = setInterval(function () {
        if (killQuiz) {
            clearInterval(timerInterval);
        }
        secondsLeft--;
        document.getElementById("timer").innerHTML = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        };
    }, 1000);
};

var scoreViewer = document.getElementById("highscore-viewer");
scoreViewer.addEventListener("click", toggleScores);
scoreViewerOn = false

function toggleScores() {
    if (!scoreViewerOn) {
        var scoreList = document.getElementById("score-list");
        scoreList.style.display = "block";
        scoreViewerOn = true;
        for (var i = 0; i < highScores.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = highScores[i];
            scoreList.appendChild(li);
        }
    } else {
        var scoreList = document.getElementById("score-list");
        scoreList.style.display = "none";
        scoreList.innerHTML = "";
        scoreViewerOn = false;
    }
}
