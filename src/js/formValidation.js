import { validateEmail, validatePhoneNumber, validateName } from './utils';
import { showErrorToast } from './iziToastConfig';

export function validateForm(form, phoneInputField) {
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('.wt-email-input');

  const nameError = validateName(nameInput.value);
  if (nameError) {
    showErrorToast(nameError);
    return false;
  }

  if (!validateEmail(emailInput.value.trim())) {
    showErrorToast('Please, write a correct email (e.g., example@domain.com)');
    return false;
  }

  if (!phoneInputField || !validatePhoneNumber(phoneInputField)) {
    showErrorToast(
      'Please, enter a phone number in the correct format, such as +380XXXXXXXXX!'
    );
    return false;
  }

  return true;
}

export function initFormValidation(form, phoneInputField) {
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('.wt-email-input');

  nameInput.addEventListener('blur', () => {
    const nameError = validateName(nameInput.value);
    if (nameError) {
      showErrorToast(nameError);
    }
  });

  emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value.trim())) {
      showErrorToast(
        'Please, write a correct email (e.g., example@domain.com)'
      );
    }
  });

  phoneInputField.addEventListener('blur', () => {
    if (!validatePhoneNumber(phoneInputField)) {
      showErrorToast(
        'Please, enter a phone number in the correct format, such as +380XXXXXXXXX!'
      );
    }
  });
}
