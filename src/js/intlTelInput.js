import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

export default function initIntlTelInput(phoneInputField) {
  if (phoneInputField) {
    intlTelInput(phoneInputField, {
      initialCountry: 'all',
      loadUtils: () => import('intl-tel-input/utils'),
    });
  } else {
    console.error('Елемент #phone не знайдено.');
  }
}
