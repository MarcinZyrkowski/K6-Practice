import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export const options = {
  vus: 5, 
  duration: '3s',
  // defining thresholds
  thresholds: {
    http_req_duration: ['p(90)<2000'], // 95% of requests should take less or equal than 2000
    http_req_failed: ['rate<0.05'], // only 5% of tests can fail
    http_reqs: ['count>10'],
    checks: ['rate>=0.99'],
    my_counter: ['count>1'],
    response_time_news_page: ['p(95)<2000', 'p(99)<3000'] // p(99) works even if not displayed
  }
};

// creating onw metric of type Counter
let myCounter = new Counter('my_counter');
let newsPageResponseTime = new Trend('response_time_news_page');

// standardChecks is an object
export const standardChecks = {
  'response is 200': (response) => response.status === 200,
  'latency is lower than warning threshold': (response) => response.timings.duration < 2000
}

export default function () {
  let res = http.get('http://test.k6.io');
  // defining logic to custom metric
  myCounter.add(1);
  sleep(1);

  // trivial check
  check(true, {
    'name-of-first-check': (value) => value === true
  });

  // res is dynamic value
  check(res, standardChecks);

  res = http.get('https://test.k6.io/news.php');
  newsPageResponseTime.add(res.timings.duration);
  sleep(1);
}
