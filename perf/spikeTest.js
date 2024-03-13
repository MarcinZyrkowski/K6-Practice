import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // load schema
  //                .
  //                .
  //  stress   -   /.\
  //              / . \
  // avg load -  /  .  \
  //            /   .   \
  //  time     0   4s    8s
  // stages are used define different load
  stages: [
    {
      duration: '4s', // ramping up users up to 200
      target: 200 // much more users than stress, however duration is much smaller
    },
    {
      duration: '4s',  // scale down to 0
      target: 0
    }
  ]
};

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
