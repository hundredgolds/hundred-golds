let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');
const resultTextElement = document.getElementById('resultText');
const restartButton = document.getElementById('restartButton');

// Function to load the questions from the JSON file
function loadQuestions() {
    fetch('quizzes.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            // Once questions are loaded, show the first question
            showQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));
}

// Function to display the current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear existing options
    optionsElement.innerHTML = '';

    // Create buttons for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

// Function to check the selected answer and update the score
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    if (selectedOption === correctAnswer) {
        alert('Correct!');
        score++;
        scoreElement.textContent = `Score: ${score}`; // Update the score label
    } else {
        alert(`Wrong! The correct answer is: ${correctAnswer}`);
    }

    // Move to the next question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Quiz finished, show the result screen
        showResult();
    }
}

// Function to display the final result
function showResult() {
    // Hide the question and options
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    
    // Show the result screen
    resultElement.style.display = 'block';
    resultTextElement.textContent = `You scored ${score} out of ${questions.length}`;

    // Add event listener to restart button
    restartButton.addEventListener('click', restartQuiz);
}

// Function to restart the quiz
function restartQuiz() {
    // Reset the state
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: 0`;

    // Hide the result screen
    resultElement.style.display = 'none';

    // Show the question and options again
    questionElement.style.display = 'block';
    optionsElement.style.display = 'block';

    // Show the first question
    showQuestion();
}

// Initialize the quiz by loading the questions from the JSON file
loadQuestions();
