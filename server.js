import express from 'express';
import router from './routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const porta = process.env.PORT || 8080;
const ip = process.env.IP || 'localhost';
app.listen(porta, ip, () => {
    console.log(`Rodando em http://${ip}:${porta}`);
});
