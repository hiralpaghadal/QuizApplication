
var nextButton = document.getElementById("next");
var quizSpace = document.getElementById("quiz");
var questionSpace = document.getElementById("question");
var answerSpace = document.getElementById("answer");
var score = 0;
var questionNumber = 0;
var answerCache = [];
function setQuestion(questionNumber) {
    var q = document.createTextNode(questions[questionNumber].question);
    $(questionSpace).hide().append(q).show("slow");
}

function setAnswer(questionNumber) {

    var frag = document.createDocumentFragment();
    var input = null;
    var value = null;
    var name = null;
    for (var i = 0; i < 4; i++) {
        name = document.createTextNode(questions[questionNumber].choices[i]);
        input = document.createElement("input");
        input.type = "radio";
        input.name = "answers";
        input.value = i;
        frag.appendChild(input);
        frag.appendChild(name);
    }
    $(answerSpace).hide().append(frag).show("slow");


}

 function removeAll() {
     questionSpace.innerHTML = "";
     answerSpace.innerHTML = "";
 }


function checker(questionNumber) {
    for (var i = 0; i < 4; i++) {
        if (answerSpace.children[i].checked && i === questions[questionNumber].correctAnswer) {
            score++;
            answerCache[questionNumber] = answerSpace.children[i].value;
        } else if (answerSpace.children[i].checked) {
            answerCache[questionNumber] = answerSpace.children[i].value;
        }
    }

}


function buttons(questionNumber) {
    var nextButton = document.getElementById("next");
    var restart = document.getElementById("restart");
    var backButton = document.getElementById("back");
    nextButton.onclick = function () {
        checker(questionNumber);
        if (isNaN(answerCache[questionNumber])) {
            alert("Please choose an answer");   
        } else {
            questionNumber++;
             removeAll();

    
            if (questionNumber < 5) {
                setQuestion(questionNumber);
                setAnswer(questionNumber);
                if (!(isNaN(answerCache[questionNumber]))) {
                    var radioAnswers = document.getElementsByName("answers");
                    var key = answerCache[questionNumber];
                    radioAnswers[key].checked = true;
                }

            } else {
                $(questionSpace).hide().append("Your score is: ").show("slow");
                $(answerSpace).hide().append(score + " out of 5.").show("slow");
                $(nextButton).hide();
                $(backButton).hide();

            }
        }
    };

    
    backButton.onclick = function () {
        if (questionNumber > 0) {
            questionNumber--;
            removeAll();
            setQuestion(questionNumber);
            setAnswer(questionNumber);
            var radioAnswers = document.getElementsByName("answers");
            var key = answerCache[questionNumber];
            radioAnswers[key].checked = true;
        }
    };
    
    restart.onclick = function () {
    
        answerCache = [];
        questionNumber = 0;
        score = 0;
        removeAll();
    
        theQuiz();
        $(backButton).show();
        $(nextButton).show();

    };
}

function theQuiz() {
    setQuestion(questionNumber);
    setAnswer(questionNumber);
    buttons(questionNumber);
    console.log(answerCache);
}


theQuiz();