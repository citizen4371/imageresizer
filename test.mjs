import { strict as assert } from 'assert';
import http from 'http';

function getImage(url, w) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost/img/resize?u=${url}&w=${w}`, res => {
                resolve(res.statusCode)
            })
            .on('error', reject);
    })
}

function test() {
    const url = 'https://images.squarespace-cdn.com/content/v1/5f3541f19bb2e80bcd4b0f98/1597693685065-YLI5UN61MEYJD34C2OIW/CELERA-IMG_1570-editedCG.jpg';
    const url404 = 'https://images.squarespace-cdn.com/content/v1/f3541f19bb2e80bcd4b0f98/1597693685065-YLI5UN61MEYJD34C2OIW/CELERA-IMG_1570-editedCG.jpg';
    
    const testData = [
        [url, 100, 200],
        [url, 200, 200],
        [url, 400, 200],
        [url, 0, 400],
        [url, 10.5, 400],
        [url404, 100, 404],
        ['', 400, 400]
    ];

    const startTime = new Date().valueOf();
    const promises = testData.map(([url, width, expectedStatus]) =>
        getImage(url, width).then(actualStatus => {
            const assertMessage = `expected ${expectedStatus}, got ${actualStatus} for ${url}`;
            try {
                assert.equal(expectedStatus, actualStatus, assertMessage);
            } catch(e) {
                console.warn(e.toString());
            }
        })
    );

    Promise.all(promises).then(() =>
        console.log(`Ran all tests in ${new Date().valueOf() - startTime}`)
    );
}

test();