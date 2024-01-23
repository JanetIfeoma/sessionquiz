document.addEventListener('DOMContentLoaded', function () {
    // Get the user answers and correct answers from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const userAnswers = urlParams.getAll('userAnswer');
    const correctAnswers = urlParams.getAll('correctAnswer');

    // Populate the review page with questions and options
    const questionContainer = document.getElementById("review-question");
    const optionsContainer = document.getElementById("review-options");
    const totalQuestionsSpan = document.getElementById("total-questions");
    const currentQuestionSpan = document.getElementById("current-question");

    // Initialize question index
    let currentQuestionIndex = 0;

    // Function to load the current question
    function loadQuestion() {
        // Display the total and current question count
        totalQuestionsSpan.textContent = quizData.length;
        currentQuestionSpan.textContent = currentQuestionIndex + 1;

        // Display the question
        questionContainer.innerHTML = `<h2>${quizData[currentQuestionIndex].question}</h2>`;

        // Display options
        optionsContainer.innerHTML = ""; // Clear previous options

        quizData[currentQuestionIndex].options.forEach((option, optionIndex) => {
            const button = document.createElement("button");
            button.className = "option";
            button.innerHTML = option;

            // Highlight correct answer in green
            if (option === correctAnswers[currentQuestionIndex]) {
                button.classList.add("correct");
            }

            // Highlight user's answer in red if wrong
            if (option !== correctAnswers[currentQuestionIndex]) {
                button.classList.add("wrong");
               
            }

            button.disabled = true; // Disable the button
            optionsContainer.appendChild(button);
        });
    }

    // Load the initial question
    loadQuestion();

    const nextButton = document.getElementById("btn1");
    const homeButton = document.getElementById("btn2");

    nextButton.style.display = "block";
    homeButton.style.display = "none";

    // Function to move to the next question
    function moveToNextQuestion() {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            updateProgressBar();
            loadQuestion();
        } else {
            // Hide the "Next" button and show the "Home" button
            nextButton.style.display = "none";
            homeButton.style.display = "block";
        }
    }

    nextButton.addEventListener("click", moveToNextQuestion);
});
