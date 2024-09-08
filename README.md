# HSA12 13. Queues

## Installation

1. Install dependencies:

````bash
npm install
````

2. Start Redis and Beanstalkd containers:

````bash
docker-compose up --build
````

## Running the Scripts

1. To add 100000 messages to Redis:

````bash
node scripts/redis_put.js
````

2. To retrieve 100000 messages from Redis:

````bash
node scripts/redis_get.js
````

3. To retrieve 100000 messages to Beanstalkd:

````bash
node scripts/beanstalkd_put.js
````

4. To retrieve 100000 messages from Beanstalkd:

````bash
node scripts/beanstalkd_get.js
````

## Results (Consistent requests)

### Redis Pub/Sub

[

- Consumer Throughput: 10000 / 5.862s = 1705,902 req/sec
- Producer Throughput: 10000 / 6.060s = 1650,165 req/sec
- Consumer Throughput: 100000 / 59.115s = 1691,618 req/sec
- Producer Throughput: 100000 / 58.898s = 1697,850 req/sec

### Beanstalkd Pub/Sub

- Consumer Throughput: 10000 / 8.891s = 1124,732 req/sec
- Producer Throughput: 10000 / 4.668s = 2142,245 req/sec
- Consumer Throughput: 100000 / 90.088s = 1110,026 req/sec
- Producer Throughput: 100000 / 45.110s = 2216,803 req/sec

## Results (Parallel requests)

### Redis Pub/Sub

- Consumer Throughput: 10000 / 0.075313s = 132779 req/sec
- Producer Throughput: 10000 / 0.087239s = 114628 req/sec
- Consumer Throughput: 100000 / 0.474128s = 210914 req/sec
- Producer Throughput: 100000 / 0.482715s = 207162 req/sec
- Consumer Throughput: 1000000 / 4.829s = 207082 req/sec
- Producer Throughput: 1000000 / 5.018s = 199283 req/sec

### Beanstalkd Pub/Sub

- Consumer Throughput: 10000 / 0.210348s = 47540 req/sec
- Producer Throughput: 10000 / 0.260243s = 38426 req/sec
- Consumer Throughput: 100000 / 9.08686s = 4594 req/sec
- Producer Throughput: 100000 / 7.823s = 12783 req/sec
- Consumer Throughput: 500000 / 108.829s = 5381 req/sec
- Producer Throughput: 500000 / 92.928s = 4594 req/sec

Unfortunately, more than 500,000 Beanstalkd requests simply crashed. After a few rounds of tests, it stopped responding
to reads altogether

### Conclusion

- Redis: Performs consistently well, handling both sequential and parallel requests with high throughput.
- Beanstalkd: Performance deteriorates significantly as the number of requests increases.
- Redis outperforms Beanstalkd in both sequential and parallel scenarios, making it the better choice for
  high-performance and concurrent workloads.