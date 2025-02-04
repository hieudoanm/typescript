import { createServer } from 'node:http';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'kafka-client-id',
  brokers: ['localhost:9092'],
});

const KAFKA_GROUP = process.env.KAFKA_GROUP ?? 'kafka-group';
const KAFKA_TOPIC = process.env.KAFKA_TOPIC ?? 'kafka-topic';

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: KAFKA_GROUP });

const server = createServer(async (request, response) => {
  await producer.connect();
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.info({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString() ?? '',
      });
    },
  });

  if (request.method === 'POST') {
    let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', async () => {
      const { message } = JSON.parse(body);
      await producer.send({
        topic: 'test-topic',
        messages: [{ value: message }],
      });
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message }));
    });
    return;
  }
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World!\n');
});

const PORT: number = parseInt(process.env.PORT ?? '8080') ?? 8080;

// starts a simple http server locally on port 8080
server.listen(PORT, '127.0.0.1', () => {
  console.info(`Listening on 127.0.0.1:${PORT}`);
});

// run with `node server.mjs`
