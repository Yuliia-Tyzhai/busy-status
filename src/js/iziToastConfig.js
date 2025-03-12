import iziToast from 'izitoast';

export function showSuccessToast(message) {
  iziToast.success({
    position: 'center',
    theme: 'dark',
    messageColor: 'green',
    message: message,
  });
}

export function showErrorToast(message) {
  iziToast.error({
    position: 'topRight',
    theme: 'dark',
    messageColor: 'red',
    message: message,
  });
}
