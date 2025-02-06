import { PrismaClient } from '@prisma/client';
import { createServer } from 'node:http';

const prismaClient = new PrismaClient();

const server = createServer(async (req, res) => {
  await prismaClient.$connect();
  const users = await prismaClient.user.findMany();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ users }));
  await prismaClient.$disconnect();
});

// starts a simple http server locally on port 8080
server.listen(8080, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:8080');
});
