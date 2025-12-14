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

const start = async () => {
    try {
        await server.register(cors, {
            origin: true,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        });

        console.log('CORS registered (in start)');

        await server.register(authRoutes, { prefix: '/api/v1' });

        const port = 3001;
        await server.listen({ port, host: '0.0.0.0' });
        console.log(`Server listening on ${port}`);
        console.log('Routes available:');
        console.log(server.printRoutes());
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
