const Redis = require('redis');
const client = Redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis Client Error', err));

async function putMessages(count) {
    await client.connect();
    console.time('RedisBulkPut');
    for (let i = 0; i < count; i++) {
        await client.lPush('queue', `Message ${i}`);
    }
    console.timeEnd('RedisBulkPut');
    await client.disconnect();
}

putMessages(100000);
