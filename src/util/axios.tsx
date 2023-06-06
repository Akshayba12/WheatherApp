import axios from 'axios';

const axiosinstance = axios.create({
  baseURL:
    'http://api.weatherapi.com/v1/forecast.json?key=1e3bdb6c5faa46d9bb3110928230506&q=bangalore&days=1&aqi=no&alerts=no',
  timeout: 2000,
  headers: {'X-Custom-Header': 'foobar'},
});

export default axiosinstance;
