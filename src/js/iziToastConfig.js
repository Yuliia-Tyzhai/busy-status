import iziToast from 'izitoast';

export function showSuccessToast(message) {
  iziToast.success({
    position: 'topRight',
    theme: 'dark',
    messageColor: 'white',
    backgroundColor: '#4CAF50',
    message: message,
  });
}

export function showErrorToast(message) {
  iziToast.error({
    position: 'topRight',
    theme: 'dark',
    messageColor: 'white',
    backgroundColor: '#ef4040',
    message: message,
  });
}
