
function showSideBar() {
    const sideBar=document.querySelector('.sidebar')
    sideBar.style.display='flex'
    
}
function hideSideBar() {
    const sideBar=document.querySelector('.sidebar')
    sideBar.style.display='none'
}


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
        question: "Among th core phases of Product Management, which is the first?",
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

    // Disable click events to prevent further clicks
    for (const div of optionsDivs) {
        div.style.pointerEvents = "none";
        if (div.textContent === selectedAnswer) {
            div.classList.add("selected"); // Apply the "selected" class to the clicked answer
        }
    }

    // Update the userAnswer property in the quizData object
    quizData[currentQuestion].userAnswer = selectedAnswer;

    const scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.textContent = calculateScore();
    }
    // Add a slight delay before moving to the next question to allow users to see the color change
    const nextButton = document.getElementById("btn2");
    nextButton.style.display = "block";
}



function moveToPreviousQuestion() {
if (currentQuestion > 0) {
    currentQuestion--;
    updateProgressBar();
    loadQuestion();
}
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
function finishQuiz() {
    const score = calculateScore();
    const totalQuestions = quizData.length;
    // Check if the element with ID "score" exists in the current HTML
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.textContent = `${score}/${totalQuestions}`;
    }
   

    // Redirect to the finish quiz page with the score
    window.location.href = `finish-quiz.html?score=${score}&totalQuestions=${totalQuestions}`;

}



function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const currentQuestionSpan = document.getElementById("current-question");
    
    
    console.log("progressBar:", progressBar);
    console.log("currentQuestionSpan:", currentQuestionSpan);

    // Check if required elements exist
    if (!progressBar || !currentQuestionSpan) {
        console.error("Required elements not found.");
        return;
    }

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


function calculateScore() {
    // Implement your scoring logic here
    // For simplicity, let's assume 1 point for each correct answer
    let score = 0;
    for (const question of quizData) {
        if (question.userAnswer !== null && question.userAnswer === question.correctAnswer) {
            score++;
        }
    }
    return score;
}
// Initial load
loadQuestion();
updateProgressBar();
