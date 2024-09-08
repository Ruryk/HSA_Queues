const Jackd = require('jackd');
const client = new Jackd();

async function getMessages(count) {
    await client.connect({ host: 'localhost', port: 11300 });
    console.time('BeanstalkdBulkGet');
    for (let i = 0; i < count; i++) {
        const job = await client.reserve();
        if (!job) {
            console.log(`No more jobs after ${i} iterations`);
            break;
        }
        await client.delete(job.id);
    }
    console.timeEnd('BeanstalkdBulkGet');
    client.quit();
}

getMessages(100000);
