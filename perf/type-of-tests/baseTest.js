import http from 'k6/http';
import { sleep } from 'k6';

// this modifies default k6 running settings
// const options needs to be exported
export const options = {
  vus: 10, // changing virtual users from default: 1
  duration: '10s',
};

export default function () {
  http.get('http://test.k6.io');
  sleep(1); // VU sends requests as many as he can. We added sleep to better mimic real client
}
