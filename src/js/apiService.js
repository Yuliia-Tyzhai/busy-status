import axios from 'axios';
import { serverURL } from './constants';

export async function sendFormData(formData) {
  return axios.post(serverURL, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
