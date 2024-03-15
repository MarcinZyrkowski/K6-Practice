import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options = {
  vus: 1, 
  duration: '1s',
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

