const Redis = require('redis');
const client = Redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis Client Error', err));

async function getMessages(count) {
    await client.connect();
    console.time('RedisBulkGet');
    for (let i = 0; i < count; i++) {
        const message = await client.rPop('queue');
        if (!message) {
            console.log(`No more messages after ${i} iterations`);
            break;
        }
    }
    console.timeEnd('RedisBulkGet');
    await client.disconnect();
}

getMessages(100000);
