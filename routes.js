import express from "express";
import { join } from "path";
import RankControllers from "./src/controllers/rankControllers.js";

const router = express.Router();

/**
 * Obtem o caminho absoluto para uma página html em public/pages com base no caminho relativo a 'routes.js'.
 * @param {string} fileName Nome do arquivo a ser procurado (não é necessário a extensão).
 * @returns Caminho absoluto para o arquivo.
 */
function getPage(fileName) {
    return join(
        import.meta.dirname,
        "public",
        "pages",
        fileName.replace(".html", "") + ".html",
    );
}

// =======================Pagina Inicial=======================
router.get("/", (req, res) => {
    res.sendFile(getPage("index"));
});

// =======================Ranking=======================
router.get("/rank", RankControllers.getRanking);
router.post("/rank", RankControllers.insertRecord);

// =======================Arquivos estaticos=======================
router.use("/styles", express.static("/public/styles"));
router.use("/scripts", express.static("/public/scripts"));
router.use("/media", express.static("/public/media"));

export default router;
