import express from 'express';
import router from './routes.js';
import { loadEnvFile } from 'node:process';
loadEnvFile();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(router);

const porta = process.env.PORT || 1212;
app.listen(porta, () => {
    console.log(`Rodando em http://localhost:${porta}`);
});
