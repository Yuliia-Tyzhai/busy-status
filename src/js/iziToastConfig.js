import iziToast from 'izitoast';

export function showSuccessToast(message) {
  iziToast.success({
    position: 'center',
    theme: 'dark',
    messageColor: 'green',
    message: message,
    progressBarColor: 'green',
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    timeout: 3000,
  });
}

export function showErrorToast(message) {
  iziToast.error({
    position: 'topRight',
    theme: 'dark',
    messageColor: 'red',
    message: message,
    progressBarColor: 'red',
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    timeout: 5000,
  });
}
