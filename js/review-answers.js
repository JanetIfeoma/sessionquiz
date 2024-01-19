document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userAnswers = urlParams.getAll('userAnswer');
    const correctAnswers = urlParams.getAll('correctAnswer');

    const questionContainer = document.getElementById('question-container');

    // Iterate through quizData and create elements for each question
    quizData.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'review-question';

        const questionText = document.createElement('h2');
        questionText.textContent = question.question;

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'review-options';

        // Iterate through options and create buttons for each
        question.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.innerHTML = option;

            // Highlight correct and user answers
            if (correctAnswers[index] === option) {
                button.classList.add('correct-answer');
            }
            if (userAnswers[index] === option) {
                button.classList.add('user-answer');
            }

            // Disable the button
            button.disabled = true;

            optionsContainer.appendChild(button);
        });

        questionElement.appendChild(questionText);
        questionElement.appendChild(optionsContainer);
        questionContainer.appendChild(questionElement);
    });
});
