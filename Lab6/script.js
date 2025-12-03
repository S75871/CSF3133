// Questions Array: Stores the questions, possible options, and the correct answer.
const questions = [
    {
        question: "Which HTML tag is used to define the largest heading?",
        options: ["&lt;heading&gt;", "&lt;h6&gt;", "&lt;h1&gt;", "&lt;head&gt;"],
        correct: 2       // <h1>
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["&lt;link&gt;", "&lt;href&gt;", "&lt;a&gt;", "&lt;url&gt;"],
        correct: 2       // <a>
    },
    {
        question: "Which attribute is used to specify an image source?",
        options: ["alt", "href", "src", "title"],
        correct: 2       // src
    },
    {
        question: "Which tag is used to insert a line break in HTML?",
        options: ["&lt;break&gt;", "&lt;lb&gt;", "&lt;br&gt;", "&lt;newline&gt;"],
        correct: 2       // <br>
    },
    {
        question: "Which HTML element is used to define a paragraph?",
        options: ["&lt;para&gt;", "&lt;text&gt;", "&lt;paragraph&gt;", "&lt;p&gt;"],
        correct: 3       // <p>
    },
    {
        question: "Which HTML tag is used to insert an image?",
        options: ["&lt;image&gt;", "&lt;img&gt;", "&lt;picture&gt;", "&lt;src&gt;"],
        correct: 1       // <img>
    },
    {
        question: "Which HTML element is used to create an unordered list?",
        options: ["&lt;li&gt;", "&lt;list&gt;", "&lt;ol&gt;", "&lt;ul&gt;"],
        correct: 3       // <ul>
    }
];


// Variables to track quiz progress
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let shuffledQuestions = []; // will hold shuffled questions

document.addEventListener('DOMContentLoaded', function() {
    const startBtn   = document.getElementById('start-btn');
    const nextBtn    = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    // shuffleQuestions(): Randomly shuffles the questions.
    function shuffleQuestions() {
        const copy = [...questions];
        copy.sort(() => Math.random() - 0.5);
        return copy;
    }

    // startQuiz(): shuffles questions, shows first question, starts timer.
    function startQuiz() {
        document.getElementById('start-container').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');

        score = 0;
        currentQuestion = 0;
        document.getElementById('current-score').textContent = score;

        shuffledQuestions = shuffleQuestions();
        displayQuestion();        // NOT showQuestion()
    }

    // displayQuestion(): Displays the current question and answer options.
    function displayQuestion() {
        const q = shuffledQuestions[currentQuestion];

        document.getElementById('question-number').innerHTML  =
            `Question ${currentQuestion + 1} of 5`;
        document.getElementById('question-text').innerHTML = q.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        for (let i = 0; i < q.options.length; i++) {
            const button = document.createElement('button');
            button.innerHTML = q.options[i];
            button.classList.add('option-btn');
            button.onclick = function () {
                checkAnswer(i);
            };
            optionsContainer.appendChild(button);
        }

        document.getElementById('feedback-container').classList.add('hidden');
        document.getElementById('next-btn').classList.add('hidden');

        startTimer();
    }

    // startTimer(): Sets a countdown timer for answering each question.
    function startTimer() {
        timeLeft = 30;
        document.getElementById('timer').textContent = timeLeft;
        clearInterval(timer);

        timer = setInterval(function () {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                timeUp();
            }
        }, 1000);
    }

    function timeUp() {
        const buttons = document.querySelectorAll('.option-btn');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        showFeedback(false, "&#x23F1; Time's up!");
        document.getElementById('next-btn').classList.remove('hidden');
    }

    // checkAnswer(): 
    // Checks whether the selected answer is correct and updates the score.
    function checkAnswer(selectedAnswer) {
        clearInterval(timer);

        const q = shuffledQuestions[currentQuestion];
        const buttons = document.querySelectorAll('.option-btn');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        if (selectedAnswer === q.correct) {
            score++;
            document.getElementById('current-score').textContent = score;
            buttons[selectedAnswer].classList.add('correct');
            showFeedback(true, "&#x2705; Correct! Well done!");
        } else {
            buttons[selectedAnswer].classList.add('incorrect');
            buttons[q.correct].classList.add('correct');
            showFeedback(false, `&#x274C; Incorrect. The correct answer is: 
                ${q.options[q.correct]}`);
        }

        document.getElementById('next-btn').classList.remove('hidden');
    }

    function showFeedback(isCorrect, message) {
        const feedbackBox = document.getElementById('feedback-container');
        feedbackBox.classList.remove('hidden');
        document.getElementById('feedback-message').innerHTML = message;

        if (isCorrect) {
            feedbackBox.classList.add('correct');
            feedbackBox.classList.remove('incorrect');
        } else {
            feedbackBox.classList.add('incorrect');
            feedbackBox.classList.remove('correct');
        }
    }

    // nextQuestion(): Moves to the next question, 
    // resetting the timer and updating the score.
    function nextQuestion() {
        currentQuestion++;

        if (currentQuestion < 5) {
            displayQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        clearInterval(timer);
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('result-container').classList.remove('hidden');

        document.getElementById('final-score').textContent = `${score} / 5`;

        let message;
        if (score === 5) {
            message = "&#x1F3C6; Perfect Score! You're a genius!";
        } else if (score >= 4) {
            message = "&#x1F31F; Excellent work! Keep it up!";
        } else if (score >= 3) {
            message = "&#x1F44D; Good job! Room for improvement!";
        } else if (score >= 2) {
            message = "&#x1F4DA; Not bad, but try studying more!";
        } else {
            message = "&#x1F4AA; Keep practicing, you'll get better!";
        }

        document.getElementById('performance-message').innerHTML = message;
    }

    function restartQuiz() {
        clearInterval(timer);
        document.getElementById('result-container').classList.add('hidden');
        document.getElementById('start-container').classList.remove('hidden');

        currentQuestion = 0;
        score = 0;
        document.getElementById('current-score').textContent = score;
    }
});