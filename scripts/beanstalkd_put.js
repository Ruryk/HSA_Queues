const Jackd = require('jackd');
const client = new Jackd();

async function putMessages(count) {
    await client.connect({ host: 'localhost', port: 11300 });
    console.time('BeanstalkdBulkPut');
    for (let i = 0; i < count; i++) {
        await client.put(`Message ${i}`, 0, 0, 60);
    }
    console.timeEnd('BeanstalkdBulkPut');
    client.quit();
}

putMessages(100000);
