const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const difficulty = urlParams.get('difficulty');
const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById('question').innerText = question.question;

    const options = [...question.incorrect_answers, question.correct_answer];
    options.sort(() => Math.random() - 0.5);

    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';
    options.forEach(option => {
        const li = document.createElement('li');
        li.innerText = option;
        li.onclick = () => {
            userAnswers.push(option);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        };
        optionsList.appendChild(li);
    });
}

async function fetchQuestions() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.results;
    loadQuestion();
}

function endQuiz() {
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === questions[index].correct_answer
    ).length;
    location.href = `result.html?correct=${correctAnswers}&total=${questions.length}`;
}

fetchQuestions();
