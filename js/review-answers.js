document.addEventListener('DOMContentLoaded', function () {
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
 ];  
        const urlParams = new URLSearchParams(window.location.search);
         const userAnswers = urlParams.getAll('userAnswer');
        const correctAnswers = urlParams.getAll('correctAnswer');


         const reviewContainer = document.getElementById('review-container');
        
         for (let i = 0; i < quizData.length; i++) {
            const question = quizData[i].question;
            const userAnswer = userAnswers[i];
            const correctAnswer = correctAnswers[i];

            const reviewItem = document.createElement('div');
             reviewItem.innerHTML = `
                 <p>${question}</p>
                 <p>User Answer: ${userAnswer}</p>
                <p>Correct Answer: ${correctAnswer}</p>
            `;
            reviewContainer.appendChild(reviewItem);
         }
        });
    

