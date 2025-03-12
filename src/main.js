import initIntlTelInput from './js/intlTelInput';
import { showQuestion, getAnswers } from './js/quizLogic';
import { sendFormData } from './js/apiService';
import { validateForm } from './js/formValidation';
import { showSuccessToast, showErrorToast } from './js/iziToastConfig';
import intlTelInput from 'intl-tel-input';

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
  initIntlTelInput(document.querySelector('.wt-phone-input'));

  const form = document.querySelector('.wt-form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    } else {
      return;
    }

    const phoneInputField = document.querySelector('.wt-phone-input');

    if (!validateForm(form, phoneInputField)) {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send';
      }
      return;
    }

    const phoneNumber = intlTelInput.getInstance(phoneInputField).getNumber();
    const formData = {
      name: form.querySelector('#name').value,
      email: form.querySelector('.wt-email-input').value.trim(),
      phone: phoneNumber,
      answers: getAnswers(),
    };

    try {
      await sendFormData(formData);
      showSuccessToast('You have successfully sent your answers!');
      document.getElementById('registration-container').innerHTML =
        '<p>You have successfully sent your answers!</p>';
      form.reset();
    } catch (error) {
      showErrorToast(
        'Error: ' +
          (error.response?.data?.message ||
            'Something went wrong. Please, try again!')
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send';
      }
    }
  });
});
