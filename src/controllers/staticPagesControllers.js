import { join } from 'node:path';
export default class StaticPagesControllers {
    /**
     * Obtem o caminho absoluto para uma página html em public/pages com base no caminho relativo a 'routes.js'.
     * @param {string} fileName Nome do arquivo a ser procurado (não é necessário a extensão).
     * @returns Caminho absoluto para o arquivo.
     */
    getPage(fileName) {
        return join(
            import.meta.dirname,
            '..',
            '..',
            'public',
            'pages',
            fileName.replace('.html', '') + '.html',
        );
    }

    static htmlHeader = new Headers({
        'content-type': 'text/html; charset=utf-8',
    });

    static homePage(req, res) {
        res.setHeaders(this.htmlHeader).status(200).sendFile(this.getPage('index'));
    }

    static rankPage(req, res) {
        res.setHeaders(this.htmlHeader).status(200).sendFile(this.sendFile('rank'));
    }

    static gamePage(req, res) {
        res.setHeaders(this.htmlHeader).status(200).sendFile(this.sendFile('game'));
    }
}
