const quizData = [
    {
        question: "What is the other name of this course?",
        options: ["A. Product Bootcamp for new managers", "B. Product Bootcamp for  Beginners", "C. Product Management 101: From Beginner to Mastery", "D. Become a Product Manger", "E.  A & B"],
        correctAnswer: "A. Product Bootcamp for new managers"
    },{
        question: "How best can you describe what Notion does?",
        options: ["A. An application that can manages all sorts of documentations", "B. Content management systems", "C. An app that can be used to manage your sysyems", "D. A planning app"],
        correctAnswer: "A. An application that can manages all sorts of documentations"
    },
    {
        question: "What is the main reason why you should duplicate your notion link?",
        options: ["A. To have your personal note, edit, track and create a personal space", "B. So you don't lose the course you just bought", "C. Gain access to the curriculum", "D. So that you can reasearch on it"],
        correctAnswer: "A. To have your personal note, edit, track and create a personal space"
    },{
        question: "Among the core phases of Product Management, which is the first?",
        options: ["A. Vision Development", "B. Introducing the Idea", "C. Design the Wireframes", "D. Product Development"],
        correctAnswer: "A. Vision Development"
    },
    {
        question: "According to the teacher, another word for 'Product Metrics' is called?",
        options: ["A. Successs Metrics", "B. Data and Analytics", "C. KPI", "D. Objectives and Key Deliverables"],
        correctAnswer: "A. Successs Metrics"
    },
    {
        question: "How many weekly assignments do you have in total?",
        options: ["A. Six", "B. Four", "C. Seven", "D. 48"],
        correctAnswer: "A. Six"
    },{
        question: "The core reasons for the assignments is to?",
        options: ["A. Help me launch a real product after the course","B. Help me create my own dummy project", "C. Have a clear Knowledge of Product development", "D. Have an idea how engineers and designers work","E. Help me study hard"],
        correctAnswer: "B. Help me create my own dummy project"
    },
    {
        question: "These are the numbers of things we will be using the Notion app for except?",
        options: ["A. Tracking the course", "B. Assessing the timetable", "C. Designing Competitive analysis", "D. Submitting assignments"],
        correctAnswer: "C. Designing Competitive analysis"
    }
    
    // Add more quiz data for each question
];

let currentQuestion = 0;
const totalQuestions = quizData.length;

document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const totalQuestionsSpan = document.getElementById("total-questions");

    if (!questionContainer || !optionsContainer || !totalQuestionsSpan) {
        console.error("Required elements not found.");
        return;
    }

    loadQuestion();
});

function loadQuestion() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const totalQuestionsSpan = document.getElementById("total-questions");


   
    // Check if required elements exist
    if (!questionContainer || !optionsContainer || !totalQuestionsSpan) {
        console.error("Required elements not found.");
        return;
    }

    questionContainer.innerHTML = `<h2>${quizData[currentQuestion].question}</h2>`;
    optionsContainer.innerHTML = "";

    quizData[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option";
        button.innerHTML = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
    totalQuestionsSpan.textContent = totalQuestions;
}


function checkAnswer(selectedAnswer) {
    const correctAnswer = quizData[currentQuestion].correctAnswer;
    const optionsContainer = document.getElementById("options");
    const optionsDivs = optionsContainer.getElementsByClassName("option");

    // Enable click events for all options
    for (const div of optionsDivs) {
        div.style.pointerEvents = "auto";
        div.classList.remove("selected");
    }

    // Disable click events for the selected answer to prevent changing it
    const selectedDiv = Array.from(optionsDivs).find(div => div.textContent === selectedAnswer);
    if (selectedDiv) {
        selectedDiv.style.pointerEvents = "none";
        selectedDiv.classList.add("selected");
    }

    // Update the userAnswer property in the quizData object
    quizData[currentQuestion].userAnswer = selectedAnswer;

    const scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.textContent = `${calculateScore()}/${quizData.length}`;
    }

    // Add a slight delay before showing the "Next" button to allow users to see the color change
    const nextButton = document.getElementById("btn2");
    nextButton.style.display = "block";
}



function skipQuestion() {
    showQuizNotification("Question skipped successfully!");
    moveToNextQuestion();
}

function moveToNextQuestion() {
    const nextButton = document.getElementById("btn2");
    nextButton.style.display = "none"; // Hide the "Next" button

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        updateProgressBar();
        loadQuestion();
    } else {
        finishQuiz();  // Redirect to finish-quiz.html when there are no more questions
    }
}
function calculateScore() {
    let score = 0;

    for (const question of quizData) {
        if (question.userAnswer !== undefined && question.userAnswer === question.correctAnswer) {
            score++;
        }
    }

    const totalQuestions = quizData.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    updateScoreElement(score, totalQuestions);
    updateMessageElement(percentage);

    return percentage;
}

function finishQuiz() {
    const score = calculateScore();
    const totalQuestions = quizData.length;

    window.location.href = `finish-quiz.html?score=${score}&totalQuestions=${totalQuestions}`;
}

function updateScoreElement(score, totalQuestions) {
    const scoreElement = document.getElementById("score");

    if (scoreElement) {
        scoreElement.textContent = `${score}/${totalQuestions}`;
    }
}

function updateMessageElement(percentage) {
    let message;
    if (percentage < 25) {
        message = "You can do better!";
    } else if (percentage < 50) {
        message = "Great effort! Keep learning and improving!";
    } else {
        message = "Nice one!";
    }

    createMessageElement(message);
}

function createMessageElement(message) {
    let messageElement = document.getElementById("message");

    if (!messageElement) {
        messageElement = document.createElement("p");
        messageElement.id = "message";
        document.getElementById("total-questions").appendChild(messageElement);
    }

    messageElement.textContent = message;
}

document.addEventListener('DOMContentLoaded', function () {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.textContent = `0/${quizData.length}`;
    }

    const messageElement = document.getElementById("message");
    if (messageElement) {
        messageElement.textContent = "";
    }
});



function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const currentQuestionSpan = document.getElementById("current-question");
    
    const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    currentQuestionSpan.textContent = currentQuestion + 1;
}

function showQuizNotification(message) {
    const notificationElement = document.getElementById("quiz-notification");
    notificationElement.textContent = message;
    notificationElement.style.display = "block";

    // Hide the notification after 3 seconds (adjust as needed)
    setTimeout(() => {
        notificationElement.style.display = "none";
    }, 3000);
}
function startQuiz() {
    window.location.replace("index.html");
}





function reviewAnswers() {
    const userAnswers = quizData.map(question => question.userAnswer || null);
    const correctAnswers = quizData.map(question => question.correctAnswer);

    const queryString = `?userAnswer=${userAnswers.join("&userAnswer=")}&correctAnswer=${correctAnswers.join("&correctAnswer=")}`;
    window.location.href = `review-answers.html${queryString}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const totalQuestions = urlParams.get('totalQuestions');
    

    const quizData = [
{
    question: "Among th core phases of Product Management, which is the first?",
    options: ["A. Vision Development", "B. Introducing the Idea", "C. Design the Wireframes", "D. Product Development"],
    correctAnswer: "A. Vision Development"
},
{
    question: "Who is the Chief Executive Officer for Daba?",
    options: ["A. Paris", "B. Berlin", "C. London", "D. Madrid"],
    correctAnswer: "A. Paris"
},
{
    question: "According to the teacher, another word for 'Product Metrics' is called?",
    options: ["A. Successs Metrics", "B. Data and Analytics", "C. KPI", "D. Objectives and Key Deliverables"],
    correctAnswer: "A. Successs Metrics"
},{
    question: "Who is the Chief Executive Officer for Daba?",
    options: ["A. Paris", "B. Berlin", "C. London", "D. Madrid"],
    correctAnswer: "A. Paris"
},
{
    question: "Who is the Chief Executive Officer for Daba?",
    options: ["A. Paris", "B. Berlin", "C. London", "D. Madrid"],
    correctAnswer: "A. Paris"
},
{
    question: "Who is the Chief Executive Officer for Daba?",
    options: ["A. Paris", "B. Berlin", "C. London", "D. Madrid"],
    correctAnswer: "A. Paris"
}
// Add more quiz data for each question
];
    

    document.getElementById("score").textContent = `${score}%`;
});

function goToHome() {
    window.location.replace("start-quiz.html");
}
function goBackToCourse() {
    // Replace with the correct URL for the course page
    window.location.replace("course.html");
}

// Initial load
loadQuestion();
updateProgressBar();


