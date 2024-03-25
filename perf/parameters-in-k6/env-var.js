import http from 'k6/http';

export default function () {

    // using env parameter for k6
    // to use it run k6 script by below command:
    // k6 run -e BASE_URL=https://test-api.k6.io env-var.js
    // -e stands for environment variable
    // BASE_URL is custom env variable visible under __ENV (k6)
    http.get(`${__ENV.BASE_URL}/public/crocodiles/`); 
}