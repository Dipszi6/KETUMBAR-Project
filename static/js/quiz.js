let questionsData = [];
let currentQuestionIndex = 0;
let score = 0;
let userSelectedAnswer = null;
let historyAnswers = [];

const screens = document.querySelectorAll('.quiz-content');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressBarFill = document.getElementById('progress-bar-fill');

async function loadQuestions() {
    try {
        const response = await fetch('/static/questions.json');

        if (!response.ok) {
            throw new Error('Fetch gagal');
        }

        questionsData = await response.json();

    } catch (error) {
        console.error(error);

        document.getElementById('question-text').innerText =
            "Gagal memuat soal. Silakan refresh.";
    }
}

// START QUIZ
async function startQuiz() {

    if (questionsData.length === 0) {
        await loadQuestions();
    }

    questionsData = shuffleArray(questionsData);

    score = 0;
    currentQuestionIndex = 0;
    historyAnswers = [];

    switchScreen('play-screen');
    showQuestion();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
    userSelectedAnswer = null;
    nextBtn.disabled = true;

    const currentQ = questionsData[currentQuestionIndex];

    document.getElementById('question-text').innerText =
        currentQ.question;

    document.getElementById('question-count').innerText =
        `Soal ${currentQuestionIndex + 1} dari ${questionsData.length}`;

    const progressPercent =
        ((currentQuestionIndex + 1) / questionsData.length) * 100;

    progressBarFill.style.width = `${progressPercent}%`;

    optionsContainer.innerHTML = '';

    const shuffledOptions = shuffleArray([...currentQ.options]);

    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');

        btn.classList.add('option-btn');
        btn.innerText = option;

        btn.onclick = () => selectAnswer(option, btn);

        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(option, element) {
    userSelectedAnswer = option;

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    element.classList.add('selected');
    nextBtn.disabled = false;
}

function nextQuestion() {

    if (!userSelectedAnswer) return;

    const currentQ = questionsData[currentQuestionIndex];

    const isCorrect =
        userSelectedAnswer === currentQ.answer;

    historyAnswers.push({
        question: currentQ.question,
        userAnswer: userSelectedAnswer,
        correctAnswer: currentQ.answer,
        isCorrect: isCorrect
    });

    const scorePerQuestion = 100 / questionsData.length;

    if (isCorrect) {
        score += scorePerQuestion;
    }

    if (currentQuestionIndex < questionsData.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {

    switchScreen('result-screen');

    document.getElementById('final-score').innerText =
        `${Math.round(score)} / 100`;

    const correctCount =
        historyAnswers.filter(item => item.isCorrect).length;

    document.getElementById('stat-correct').innerText =
        correctCount;

    document.getElementById('stat-wrong').innerText =
        questionsData.length - correctCount;

    const feedbackElement =
        document.getElementById('score-feedback');

    if (score < 50) {
        feedbackElement.innerHTML = `
            <p style="color:red; font-weight:600;">
                ⚠️ Pemahaman masih rendah
            </p>
            <p>Pelajari kembali modul agar lebih kritis terhadap hoaks.</p>
        `;
    } else if (score < 80) {
        feedbackElement.innerHTML = `
            <p style="color:orange; font-weight:600;">
                👍 Cukup baik
            </p>
            <p>Anda sudah cukup memahami, tapi masih bisa ditingkatkan.</p>
        `;
    } else {
        feedbackElement.innerHTML = `
            <p style="color:green; font-weight:600;">
                🔥 Sangat baik!
            </p>
            <p>Anda sudah sangat paham literasi anti-hoaks, terus tingkatkan!.</p>
        `;
    }

    showAnswerReview();
}

function showAnswerReview() {
    const reviewContainer =
        document.getElementById('review-container');

    reviewContainer.innerHTML = '';

    historyAnswers.forEach((item, index) => {

        const reviewItem =
            document.createElement('div');

        reviewItem.classList.add('review-item');
        reviewItem.classList.add(item.isCorrect ? 'correct' : 'wrong');

        reviewItem.innerHTML = `
            <p class="review-q">${index + 1}. ${item.question}</p>

            <p class="review-ans">
                Jawaban Anda:
                <span style="color:${item.isCorrect ? 'green' : 'red'}">
                    ${item.userAnswer}
                </span>
            </p>

            ${
                !item.isCorrect
                ? `<p class="correct-reveal">Jawaban benar: ${item.correctAnswer}</p>`
                : ''
            }
        `;

        reviewContainer.appendChild(reviewItem);
    });
}

function restartQuiz() {
    switchScreen('start-screen');
}

function switchScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById(screenId).classList.add('active');
}