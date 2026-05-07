import { join } from 'node:path';

/**
 * Obtem o caminho absoluto para uma página html em public/pages com base no caminho relativo a 'routes.js'.
 * @param {string} fileName Nome do arquivo a ser procurado (não é necessário a extensão).
 * @returns Caminho absoluto para o arquivo.
 */
export default function getPage(fileName) {
    return join(
        import.meta.dirname,
        '..',
        '..',
        'public',
        'pages',
        fileName.replace('.html', '') + '.html',
    );
}
