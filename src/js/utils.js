import intlTelInput from 'intl-tel-input';

export function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return 'Please, write a correct email (e.g., example@domain.com)';
  }
  return null;
}

export function validatePhoneNumber(phoneInputField) {
  if (!phoneInputField) {
    return 'Phone input field is not provided';
  }

  const iti = intlTelInput.getInstance(phoneInputField);
  if (!iti.isValidNumber()) {
    return 'Please, enter a phone number in the correct format, such as +380XXXXXXXXX!';
  }
  return null;
}

export function validateName(name) {
  if (!name.trim()) {
    return 'Please, write your name';
  }

  const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\-]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'Name can only contain letters and special characters like apostrophes or dashes';
  }

  if (name.trim().length < 2 || name.trim().length > 50) {
    return 'Name must be between 2 and 50 characters';
  }

  return null;
}
