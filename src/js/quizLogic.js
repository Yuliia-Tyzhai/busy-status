import { questions } from './constants';
import { showErrorToast } from './iziToastConfig';

let currentQuestion = 0;
let answers = [];

export function showQuestion() {
  const quiz = document.getElementById('quiz');
  quiz.innerHTML = `
    <h2>${questions[currentQuestion].question}</h2>
    <ul>
      ${questions[currentQuestion].options
        .map(
          (option, index) => `
            <li>
              <input type="radio" name="answer" value="${option}" id="option${index}">
              <label for="option${index}">${option}</label>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}

export function handleNextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    answers.push(selectedOption.value);
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
