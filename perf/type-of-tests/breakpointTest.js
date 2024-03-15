import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // schema
  //                
  //                /.
  //               / .
  //              /  .
  //             /   .
  //            /    .
  //  time     0     5m
  // stages are used define different load
  stages: [
    {
      duration: '5m', // ramping up users up to 200
      target: 1000 // much more users than everything else. purpose is to see when app crashs
    }
  ]
};

export default function () {
  // the body of method is commented to not run that test against k6, even unintentionally
  // http.get('http://test.k6.io');
  // sleep(1);
}
