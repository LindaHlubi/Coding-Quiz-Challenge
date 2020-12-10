// Declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var allMarks = localStorage.getItem("allMarks");
allMarks = JSON.parse(allMarks);

if (allMarks !== null) {

    for (var i = 0; i < allMarks.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allMarks[i].initials + " " + allMarks[i].marks;
        highScore.appendChild(createLi);

    }
}
// Event listener to move to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});
