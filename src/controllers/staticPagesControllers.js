import getPage from '../libs/getPage.js';

export default class StaticPagesControllers {
    static htmlHeader = new Headers({
        'content-type': 'text/html; charset=utf-8',
    });

    static homePage(req, res) {
        res.setHeaders(this.htmlHeader).status(200).sendFile(getPage('index'));
    }

    static rankPage(req, res) {
        res.setHeaders(this.htmlHeader).status(200).sendFile(getPage('rank'));
    }

    static gamePage(req, res) {
        res.setHeaders(this.htmlHeader).status(200).sendFile(getPage('game'));
    }
}
