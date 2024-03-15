import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options = {
  vus: 10, 
  duration: '5s',
  // defining thresholds
  thresholds: {
    http_req_duration: ['p(90)<200'], // 95% of requests should take less or equal than 500
    http_req_failed: ['rate<0.05'], // only 5% of tests can fail
    http_reqs: ['count>10']
  }
};

// standardChecks is an object
export const standardChecks = {
  'response is 200': (response) => response.status === 200,
  'latency is lower than warning threshold': (response) => response.timings.duration < 2000
}

export default function () {
  const res = http.get('http://test.k6.io');
  sleep(1);

  // trivial check
  check(true, {
    'name-of-first-check': (value) => value === true
  });

  // res is dynamic value
  check(res, standardChecks);
}

