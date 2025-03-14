import initIntlTelInput from './js/intlTelInput';
import { showQuestion, getAnswers } from './js/quizLogic';
import { sendFormData } from './js/apiService';
import { validateForm, initFormValidation } from './js/formValidation';
import { showSuccessToast, showErrorToast } from './js/iziToastConfig';
import intlTelInput from 'intl-tel-input';

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
  initIntlTelInput(document.querySelector('.wt-phone-input'));
  const form = document.querySelector('.wt-form');
  const phoneInputField = document.querySelector('.wt-phone-input');

  initFormValidation(form, phoneInputField);

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

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
      form.style.display = 'none';
      showSuccessToast('You have successfully sent your answers!');
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
