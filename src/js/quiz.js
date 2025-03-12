import axios from 'axios';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/utils.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let phoneInput;
const serverURL = 'https://jsonplaceholder.typicode.com/posts';

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
  console.log('phoneInputField:', phoneInputField);
  if (phoneInputField) {
    console.log('intlTelInput:', intlTelInput);
    try {
      phoneInput = intlTelInput(phoneInputField, {
        initialCountry: 'ua',
        utilsScript: 'intl-tel-input/build/js/utils.js',
      });

      console.log('phoneInput:', phoneInput);

      if (phoneInput && phoneInput.getNumber) {
        console.log(`intl-tel-input ініціалізовано: ${phoneInput}`);
        console.log('intl-tel-input initialized');
      } else {
        console.error('intl-tel-input не ініціалізовано!');
      }
    } catch (error) {
      console.error('Помилка при ініціалізації intlTelInput:', error);
    }

    phoneInputField.addEventListener('blur', function () {
      setTimeout(() => {
        if (
          phoneInput &&
          typeof phoneInput.getNumber === 'function' &&
          intlTelInput.numberFormat
        ) {
          try {
            const nationalFormat = phoneInput.getNumber(
              intlTelInput.numberFormat.NATIONAL
            );
            const internationalFormat = phoneInput.getNumber(
              intlTelInput.numberFormat.INTERNATIONAL
            );
            console.log(`Національний формат: ${nationalFormat}`);
            console.log(`Міжнародний формат: ${internationalFormat}`);
          } catch (error) {
            console.error('Помилка при отриманні форматів:', error);
          }
        } else {
          console.error(
            'intl-tel-input не ініціалізовано, метод getNumber не доступний або intlTelInput.numberFormat не визначено.'
          );
        }
      }, 0);
    });
  } else {
    console.error('Елемент #phone не знайдено.');
  }
});

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  document.querySelector('button[type="submit"]').disabled = true;
  document.querySelector('button[type="submit"]').textContent = 'Sending...';

  if (!phoneInput || !phoneInput.getNumber()) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      message: 'Please, write a correct phone number!',
    });
    document.querySelector('button[type="submit"]').disabled = false;
    document.querySelector('button[type="submit"]').textContent = 'Send';
    return;
  }

  const phoneNumber = phoneInput.getNumber();
  const isValid = phoneInput.isValidNumber();

  if (!isValid) {
    iziToast.error({
      position: 'topRight',
      theme: 'dark',
      messageColor: 'white',
      backgroundColor: '#ef4040',
      message: 'Please, write a correct phone number',
    });
    document.querySelector('button[type="submit"]').disabled = false;
    document.querySelector('button[type="submit"]').textContent = 'Відправити';
    return;
  }

  const formData = {
    name: document.getElementById('name').value,
    email: formEmail.value.trim(),
    phone: phoneNumber,
    answers: answers,
  };

  console.log('Формдані:', formData);

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
      message: 'Дані відправлено для тестування.',
    });
    document.getElementById('registration-container').innerHTML =
      '<p>Дані відправлено для тестування. Вони не зберігаються на постійній основі.</p>';
    form.reset();
  } catch (error) {
    console.error('Помилка відправки даних:', error);
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
    document.querySelector('button[type="submit"]').disabled = false;
    document.querySelector('button[type="submit"]').textContent = 'Send';
  }
});

showQuestion();
