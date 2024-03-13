import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // schema
  //
  //         .............................................
  //        /.                                           . \
  //       / .                                           .  \
  //  time 0 4s                                         5m4s 5m8s
  // stages are used define different load
  stages: [
    {
      duration: '4s', // ramping up users up to 30
      target: 30
    },
    {
      duration: '5m', // staying with 30 users for 5m (endurance test)
      target: 30
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
