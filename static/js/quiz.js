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
            throw new Error('Gagal fetch questions.json');
        }

        questionsData = await response.json();

    } catch (error) {
        console.error(error);
        alert('Gagal memuat soal quiz.');
    }
}

// Quiz Start
async function startQuiz() {
    await loadQuestions();

    questionsData = shuffleArray(questionsData);

    score = 0;
    currentQuestionIndex = 0;
    historyAnswers = [];

    switchScreen('play-screen');

    showQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// Jawaban
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

    progressBarFill.style.width =
        `${progressPercent}%`;

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
    const currentQ = questionsData[currentQuestionIndex];

    const isCorrect =
        userSelectedAnswer === currentQ.answer;

    historyAnswers.push({
        question: currentQ.question,
        userAnswer: userSelectedAnswer,
        correctAnswer: currentQ.answer,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        score += 10;
    }

    if (currentQuestionIndex < questionsData.length - 1) {
        currentQuestionIndex++;

        showQuestion();

    } else {
        showResult();
    }
}


// Hasil
function showResult() {
    switchScreen('result-screen');

    document.getElementById('final-score').innerText =
        `${score} / 100`;

    const correctCount =
        historyAnswers.filter(item => item.isCorrect).length;

    document.getElementById('stat-correct').innerText =
        correctCount;

    document.getElementById('stat-wrong').innerText =
        questionsData.length - correctCount;

    const feedbackElement =
        document.getElementById('score-feedback');

    if (score < 70) {
        feedbackElement.innerHTML = `
            <p style="color:red; font-weight:600;">
                ⚠️ Literasi digital Anda masih perlu ditingkatkan.
            </p>
            <p>
                Anda disarankan untuk lebih berhati-hati dalam menerima dan menyebarkan informasi.
                Selalu cek sumber berita, verifikasi fakta, dan hindari langsung mempercayai judul provokatif
                agar tidak mudah terpengaruh berita bohong (hoax).
            </p>
        `;
    } else {
        feedbackElement.innerHTML = `
            <p style="color:green; font-weight:600;">
                ✅ Bagus! Anda cukup memahami literasi anti-hoax.
            </p>
            <p>
                Pertahankan kebiasaan Anda dalam memverifikasi informasi sebelum mempercayai atau membagikannya.
                Tetap kritis terhadap berita yang beredar agar dapat membantu mencegah penyebaran hoax di masyarakat.
            </p>
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

        reviewItem.innerHTML = `
            <p><strong>${index + 1}. ${item.question}</strong></p>
            <p>
                Jawaban Anda:
                <span style="color:${item.isCorrect ? 'green' : 'red'}">
                    ${item.userAnswer}
                </span>
            </p>
            ${
                !item.isCorrect
                ? `<p>Jawaban Benar: <strong>${item.correctAnswer}</strong></p>`
                : ''
            }
            <hr>
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

    document
        .getElementById(screenId)
        .classList.add('active');
}