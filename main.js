// Declared variables first

var wrapper = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var divQuestions = document.querySelector("#divQuestions");

var timeLeft = 75;
var intervalT = 0;
var penalty = 10;
var unorderedListC = document.createElement("ul");

var marks = 0;
var questionNum = 0;

// Quiz questions, choices and answers

var myQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];


// Triggers timer on button, shows user a display on the screen
document.getElementById("startTime").addEventListener("click", function() {

    if (intervalT === 0) {
        intervalT = setInterval(function () {
            timeLeft--;
            currentTime.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(intervalT);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionNum);
});

// Renders questions and choices to page: 
function render(questionNum) {
    // Clears existing data 
    divQuestions.innerHTML ='';
    unorderedListC.innerHTML ='';

    // For loop - loops through all the info in the array
    for (var i = 0; i < myQuestions.length; i++) {

        // Appends question only
        var userQuestion = myQuestions[questionNum].question;
        var userChoices = myQuestions[questionNum].choices;
        divQuestions.textContent = userQuestion;
    }
    // For each question -choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        divQuestions.appendChild(unorderedListC);
        unorderedListC.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// this event will compare the choices with the answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == myQuestions[questionNum].answer) {
            marks++;
            createDiv.textContent = "Correct!";
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Wrong! ";
        }

    }
    // Question number determines number question user is on
    questionNum++;

    if (questionNum >= myQuestions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "Quiz Complete! ";
    } else {
        render(questionNum);
    }
    divQuestions.appendChild(createDiv);

}
// This will all append to last page
function allDone() {
    divQuestions.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var h1Create = document.createElement("h1");
    h1Create.setAttribute("id", "h1Create");
    h1Create.textContent = "All Done!"

    divQuestions.appendChild(h1Create);

    // Paragraph
    var para = document.createElement("p");
    para.setAttribute("id", "para");

    divQuestions.appendChild(para);

    // Calculates the seconds left which are equivalent to the final score
    if (timeLeft >= 0) {
        var timeLeft = timeLeft
        var paraTwo = document.createElement("p");
        clearInterval(intervalT);
        paraTwo.textContent = "Your final score is: " + timeLeft;

        divQuestions.appendChild(paraTwo);
    }

    // Label for input space
    var label = document.createElement("label");
    label.setAttribute("id", "createLabel");
    label.textContent = "Enter initials: ";

    divQuestions.appendChild(label);

    // input space / text space
    var inputC = document.createElement("input");
    inputC.setAttribute("type", "text");
    inputC.setAttribute("id", "initials");
    inputC.textContent = "";

    divQuestions.appendChild(inputC);
   

    // submit button
    var submitC = document.createElement("button");
    submitC.setAttribute("type", "submit");
    submitC.setAttribute("id", "Submit");
    submitC.textContent = "Submit";

    divQuestions.appendChild(submitC);

    // Event listener to capture user details and local storage for score and initials
    submitC.addEventListener("click", function () {
        var initials = inputC.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalMark = {
                initials: initials,
                marks: timeleft
            }
            console.log(finalMark);
            var allMarks = localStorage.getItem("allMarks");
            if (allMarks === null) {
                allMarks = [];
            } else {
                allMarks = JSON.parse(allMarks);
            }
            allMarks.push(finalMark);
            var newMark = JSON.stringify(allMarks);
            localStorage.setItem("allMarks", newMark);
            
            // Links to final page
            window.location.replace("./lastpage.html");
        }
    });

}
