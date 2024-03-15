import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // schema
  //
  //                 ..................
  //   avg load --- /.                . \
  //               / .                .  \
  //              /  .                .   \
  //         time 0 4s               44s 48s
  // stages are used define different load
  stages: [
    {
      duration: '4s', // ramping up users up to 100
      target: 100 // much more users than avarage-load
    },
    {
      duration: '40s', // staying with 100 users for 40s
      target: 100
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
  http.get('http://test.k6.io/contacts.php');
  sleep(1);
  http.get('http://test.k6.io/news.php');
  sleep(1);
}
