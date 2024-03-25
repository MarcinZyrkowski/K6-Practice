import http from 'k6/http';
import { sleep } from 'k6';

// first we need to create k6 cloud account
// then create a project

export const options = {
    vus: 1,
    duration: '30s',
    ext: {
        loadimpact: {
            projectID: 0 // here should be project id from cloud
        }
    }
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
