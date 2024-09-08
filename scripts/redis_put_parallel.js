const Redis = require('redis');
const client = Redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis Client Error', err));

async function putMessages(count) {
    await client.connect();
    console.time('RedisBulkPut');

    // Array of promises to execute lPush in parallel
    const promises = [];
    for (let i = 0; i < count; i++) {
        promises.push(client.lPush('queue', `Message ${i}`));
    }

    await Promise.allSettled(promises);  // Execute all promises in parallel
    console.timeEnd('RedisBulkPut');
    await client.disconnect();
}

putMessages(1000000);
