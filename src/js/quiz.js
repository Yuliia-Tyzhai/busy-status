import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const serverURL = 'https://jsonplaceholder.typicode.com/posts'; // JSONPlaceholder URL

const questions = [
  { question: 'Question 1', options: ['option 1', 'option 2', 'option 3'] },
  { question: 'Question 2', options: ['option 1', 'option 2', 'option 3'] },
  { question: 'Question 3', options: ['option 1', 'option 2', 'option 3'] },
  { question: 'Question 4', options: ['option 1', 'option 2', 'option 3'] },
  { question: 'Question 5', options: ['option 1', 'option 2', 'option 3'] },
];

let currentQuestion = 0;
let answers = [];

function showQuestion() {
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

document.getElementById('next').addEventListener('click', () => {
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
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      message: 'Please, choose an option',
    });
  }
});

const form = document.querySelector('.wt-form');
const formEmail = document.querySelector('.wt-email-input');
const phoneInputField = document.querySelector('.wt-phone-input');
const successMessage = document.querySelector('.wt-success-message');
const errorMessage = document.querySelector('.wt-error-message');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

formEmail.addEventListener('input', function () {
  const email = formEmail.value.trim();
  if (emailPattern.test(email)) {
    formEmail.classList.add('success');
    formEmail.classList.remove('error');
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
  } else {
    formEmail.classList.add('error');
    formEmail.classList.remove('success');
    successMessage.style.display = 'none';
    errorMessage.style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  if (phoneInputField) {
    intlTelInput(phoneInputField, {
      initialCountry: 'ua',
      loadUtils: () => import('intl-tel-input/utils'),
    });
  }
});

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const submitButton = document.getElementById('submitButton');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  } else {
    return;
  }

  const nameInput = document.getElementById('name');

  if (!nameInput.value.trim()) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      message: 'Please, write your name',
    });
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send';
    }
    return;
  }

  if (
    !phoneInputField ||
    !intlTelInput.getInstance(phoneInputField).isValidNumber()
  ) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      message: 'Please, write a correct phone number!',
    });
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send';
    }
    return;
  }

  const phoneNumber = intlTelInput.getInstance(phoneInputField).getNumber();

  const formData = {
    name: nameInput.value,
    email: formEmail.value.trim(),
    phone: phoneNumber,
    answers: answers,
  };

  try {
    await axios.post(serverURL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    iziToast.success({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#4CAF50',
      message: 'You have successfully sent your answers!',
    });
    document.getElementById('registration-container').innerHTML =
      '<p>You have successfully sent your answers!</p>';
    form.reset();
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      message:
        'Error: ' +
        (error.response?.data?.message ||
          'Something went wrong. Please, try again!'),
    });
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send';
    }
  }
});

showQuestion();
