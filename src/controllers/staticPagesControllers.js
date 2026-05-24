import getPage from '../libs/getPage.js';

const htmlHeader = new Headers({
    'content-type': 'text/html; charset=utf-8',
});

export default class StaticPagesControllers {
    static homePage(req, res) {
        res.setHeaders(htmlHeader).status(200).sendFile(getPage('home'));
    }

    static rankPage(req, res) {
        res.setHeaders(htmlHeader).status(200).sendFile(getPage('rank'));
    }

    static gamePage(req, res) {
        res.setHeaders(htmlHeader).status(200).sendFile(getPage('game'));
    }
}
