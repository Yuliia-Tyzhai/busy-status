import { validateEmail, validatePhoneNumber, validateName } from './utils';

export function showErrorUnderField(inputField, message) {
  let errorMessageElement =
    inputField.parentElement.querySelector('.error-message');
  if (!errorMessageElement) {
    errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('error-message');
    inputField.parentElement.appendChild(errorMessageElement);
  }
  errorMessageElement.textContent = message;
}

export function clearErrorUnderField(inputField) {
  const errorMessageElement =
    inputField.parentElement.querySelector('.error-message');
  if (errorMessageElement) {
    errorMessageElement.textContent = '';
  }
}

export function validateForm(form, phoneInputField) {
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('.wt-email-input');

  clearErrorUnderField(nameInput);
  clearErrorUnderField(emailInput);
  clearErrorUnderField(phoneInputField);

  const nameError = validateName(nameInput.value);
  if (nameError) {
    showErrorUnderField(nameInput, nameError);
    return false;
  }

  const emailError = validateEmail(emailInput.value.trim());
  if (emailError) {
    showErrorUnderField(emailInput, emailError);
    return false;
  }

  const phoneError = validatePhoneNumber(phoneInputField);
  if (phoneError) {
    showErrorUnderField(phoneInputField, phoneError);
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
      showErrorUnderField(nameInput, nameError);
    } else {
      clearErrorUnderField(nameInput);
    }
  });

  emailInput.addEventListener('blur', () => {
    const emailError = validateEmail(emailInput.value.trim());
    if (emailError) {
      showErrorUnderField(emailInput, emailError);
    } else {
      clearErrorUnderField(emailInput);
    }
  });

  phoneInputField.addEventListener('blur', () => {
    const phoneError = validatePhoneNumber(phoneInputField);
    if (phoneError) {
      showErrorUnderField(phoneInputField, phoneError);
    } else {
      clearErrorUnderField(phoneInputField);
    }
  });
}
