import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '5s'
}

console.log(' -- init stage --');

// there are 4 stages of k6 test lifecycle
// init, setup, function, teardown
// everything what is outside those 3 functions is executed in init phase
// the signature of functions should be exactly as listed below. otherwise k6 will not recognize them

// the execution of setup, function and teardown is per VU
// this is called iteration

export default function (data) {
    console.log('-- VU stage --');
    // console.log(data);
    sleep(1);
}

export function setup() {
    console.log('-- setup stage --');
    sleep(3);
    const data = { foo: 'bar' }; // we can pass data to function(). k6 allows that
    return data;
}

export function teardown(data) {
    console.log('-- Teardown stage --');
}