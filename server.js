import express from "express";
import router from "./routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(router);

const porta = 8080;
app.listen(8080, () => {
    console.log(`Rodando em http://localhost:${porta}`);
});
