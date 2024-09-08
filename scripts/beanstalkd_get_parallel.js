const Jackd = require('jackd');
const client = new Jackd();

async function getMessages(count) {
    await client.connect({ host: 'localhost', port: 11300 });
    console.time('BeanstalkdBulkGet');

    const func = () => {
        return client.reserve().then((job) =>  {
            console.log('job', job)
            if (!job) {
                return true;
            }
            return client.delete(job.id)
        }); // Reserve the job
    };

    // Array of promises to execute reserve and destroy in parallel
    const promises = [];
    for (let i = 0; i < count; i++) {
        promises.push(client.reserveWithTimeout(100));
    }

    const results = await Promise.allSettled(promises);  // Execute all promises in parallel
    console.timeEnd('BeanstalkdBulkGet');

    const rejected = results.filter(result => result.status === 'rejected');
    const fulfilled = results.filter(result => result.status === 'fulfilled');

    console.log(`BeanstalkdBulkGet rejected: ${ rejected.length }`);
    console.log(`BeanstalkdBulkGet fulfilled: ${ fulfilled.length }`);

    client.quit();
}

getMessages(10);
