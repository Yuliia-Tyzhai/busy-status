// src/quizLogic.js
import { questions } from './constants';
import { showErrorToast } from './iziToastConfig';

let currentQuestion = 0;
let answers = [];

export function showQuestion() {
  const quiz = document.getElementById('quiz');
  const currentOptions = questions[currentQuestion].options;

  const optionsHtml = currentOptions
    .map(
      (option, index) => `
        <li data-value="${option}">
          ${option}
        </li>
      `
    )
    .join('');

  quiz.innerHTML = `
    <h2>${questions[currentQuestion].question}</h2>
    <ul class="options">
      ${optionsHtml}
    </ul>
  `;

  const options = quiz.querySelectorAll('.options li');
  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      handleNextQuestion(); // Викликаємо автоматично
    });
  });

  updateProgress(); // Оновлюємо прогрес
}

export function handleNextQuestion() {
  const selectedOption = document.querySelector('.options li.selected');
  if (selectedOption) {
    answers.push(selectedOption.dataset.value);
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      document.getElementById('quiz-container').style.display = 'none';
      document.getElementById('registration-container').style.display = 'block';
    }
  } else {
    showErrorToast('Please, choose an option');
  }
}

export function getAnswers() {
  return answers;
}

function updateProgress() {
  const progress = document.getElementById('progress');
  if (progress) {
    progress.innerHTML = `<span style="color: black;">${
      currentQuestion + 1
    }</span><span style="color: rgb(68, 67, 67);">/${questions.length}</span>`;
  }
}
