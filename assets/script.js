// Define your quiz questions and answers here
const questions = [
    {
        question: "What is HTML?",
        choices: ["Hyper Text Markup Language", "Highly Technical Markup Language", "Hyperlink and Text Markup Language"],
        correctAnswer: 0,
    },
    {
        question: "What is a promt?",
        choices: ["dialog box", "an error", "an api"],
        correctAnswer: 0,
    },
    {
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"],
        correctAnswer: 2,
    },
    {
        question: "What does API stand for?",
        choices: ["Application Post Interface", "Apply Program Interface", "Application Program Interface"],
        correctAnswer: 2,
    },
    {
        question: "What does the S represent in HTTPS?",
        choices: ["service", "secure", "solid"],
        correctAnswer: 1,
    }
];

// Variables for tracking quiz progress
let currentQuestionIndex = 0;
let score = 0;
const timerElement = document.querySelector(".timer-count");
const startButton = document.querySelector(".start-button");
const nextButton = document.getElementById("next-button");
const questionElement = document.getElementById("Question");
const choicesUl = document.getElementById("choicesUl");
const initialDiv = document.getElementById("initialDiv");
const submitButton = document.getElementById("submit");
const initials = document.getElementById("initials");
let scoreArray = []


// Timer settings
let timeLeft = 75; // Set the initial time in seconds

// Function to start the quiz
function startQuiz() {
    startButton.style.display = "none";
    displayNextQuestion();
    // Start the timer
    startTimer();
}

// Function to display the next question
function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        choicesUl.innerHTML = ""; // Clear previous choices

        question.choices.forEach((choice, index) => {
            const choiceItem = document.createElement("li");
            choiceItem.textContent = choice;
            choiceItem.addEventListener("click", () => handleChoiceClick(index));
            choicesUl.appendChild(choiceItem);
        });
    } else {
        endQuiz();
    }
}

// Function to handle user's choice selection
function handleChoiceClick(choiceIndex) {
    const question = questions[currentQuestionIndex];
    if (choiceIndex === question.correctAnswer) {
        score++;
    } else {
        // Deduct time for wrong answers (e.g., 10 seconds)
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    displayNextQuestion();
}

// Function to start the timer
function startTimer() {
    const timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000); // Update timer every second
}

function saveUserScore(scoreData) {
    timeLeft
}


// Function to end the quiz
function endQuiz() {
    initialDiv.style.display = "block";
    startButton.style.display = "block"
    // Stop the timer if it's still running
    timerElement.textContent = "0";


    // Save the user's data to localStorage
    //saveUserScore(userScoreData);

    // Redirect to the high scores page
   // window.location.href = "./assets/scores/highscore.html"; // Redirect to the high scores HTML page
    
}



// Event listeners
//figure out why startQuiz isn't restarting after endQuiz
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    displayNextQuestion();
});
submitButton.addEventListener("click", function () {
    const userInitials = initials.value;
    const savedScore = {
        score: timeLeft,
        initials: userInitials
    }
    scoreArray.push(savedScore)

    localStorage.setItem("Score", JSON.stringify(scoreArray));


})

// Initially hide the "Next" button
nextButton.style.display = "none";
initialDiv.style.display = "none";