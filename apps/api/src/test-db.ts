import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(client => {
        console.log('Connected successfully');
        client.release();
        pool.end();
    })
    .catch(err => {
        console.error('Connection failed', err);
        pool.end();
    });
