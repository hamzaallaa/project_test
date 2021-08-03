import axios from 'axios'
import https from 'https'
let baseURL = 'http://localhost:5000/api';
export default ({ app }, inject) => {
  const http = axios.create({
    baseURL: baseURL,
    headers: {},
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  inject('http', http);
}
