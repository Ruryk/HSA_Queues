const Jackd = require('jackd');
const client = new Jackd();

async function putMessages(count) {
    await client.connect({ host: 'localhost', port: 11300 });
    console.time('BeanstalkdBulkPut');

    // Array of promises to execute put in parallel
    const promises = [];
    for (let i = 0; i < count; i++) {
        promises.push(client.put(`Message ${i}`, 0, 0, 60));
    }
    await Promise.all(promises);  // Execute all promises in parallel
    console.timeEnd('BeanstalkdBulkPut');
    client.quit();
}

putMessages(10);
