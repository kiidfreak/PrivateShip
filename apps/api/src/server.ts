import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();
import { db } from './db';
import { sql } from 'drizzle-orm';
import { redis } from './lib/redis';
import { authRoutes } from './domains/identity/routes/auth.routes';


console.log('DB URL:', process.env.DATABASE_URL ? 'Set' : 'Not Set');

const server = Fastify({
    logger: {
        level: 'info'
    }
});

server.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

console.log('CORS registered for: http://localhost:3000');

server.register(authRoutes, { prefix: '/api/v1' });

server.get('/health', async (request, reply) => {
    try {
        const [dbResult, redisResult] = await Promise.all([
            db.execute(sql`SELECT 1`),
            redis.ping()
        ]);

        return {
            status: 'ok',
            db: 'connected',
            redis: redisResult === 'PONG' ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString()
        };
    } catch (err) {
        request.log.error(err);
        return reply.status(500).send({ status: 'error', error: err });
    }
});

const start = async () => {
    try {
        const port = 3001;
        await server.listen({ port, host: '0.0.0.0' });
        console.log(`Server listening on ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
