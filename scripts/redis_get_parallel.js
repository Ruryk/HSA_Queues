const Redis = require('redis');
const client = Redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis Client Error', err));

async function getMessages(count) {
    await client.connect();
    console.time('RedisBulkGet');

    // Array of promises to execute rPop in parallel
    const promises = [];
    for (let i = 0; i < count; i++) {
        promises.push(client.rPop('queue'));
    }

    const results = await Promise.allSettled(promises);  // Execute all promises in parallel
    console.timeEnd('RedisBulkGet');

    const rejected = results.filter(result => result.status === 'rejected');
    const fulfilled = results.filter(result => result.status === 'fulfilled');

    console.log(`RedisBulkGet rejected: ${rejected.length}`);
    console.log(`RedisBulkGet fulfilled: ${fulfilled.length}`);

    await client.disconnect();
}

getMessages(1000000);
