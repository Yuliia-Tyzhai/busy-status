import { validateEmail } from './utils';
import { showErrorToast } from './iziToastConfig';
import intlTelInput from 'intl-tel-input';

export function validateForm(form, phoneInputField) {
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('.wt-email-input');

  if (!nameInput.value.trim()) {
    showErrorToast('Please, write your name');
    return false;
  }

  if (!validateEmail(emailInput.value.trim())) {
    showErrorToast('Please, write a correct email');
    return false;
  }

  if (
    !phoneInputField ||
    !intlTelInput.getInstance(phoneInputField).isValidNumber()
  ) {
    showErrorToast(
      'Please, enter a phone number in the correct format, such as +380XXXXXXXXX!'
    );
    return false;
  }

  return true;
}
