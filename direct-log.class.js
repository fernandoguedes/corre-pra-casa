const rp = require('request-promise');
const cheerio = require('cheerio');
const tidy = require('htmltidy').tidy;

module.exports = class DirectLog {

    isPartiuCasa() {
        return new Promise((resolve, reject) => {
            this._getReport()
                .then(isPartiu => resolve(isPartiu))
                .catch(error => reject(error));
        });
    }

    _formatHtml(body) {
        return new Promise((resolve, reject) => {
            tidy(body, (error, html) => {
                resolve(html)
            });
        });
    }

    _getReport() {
        const url = 'https://www.directlog.com.br/tracking/index.asp?tipo=2&valor=349689537201&cod=24477';

        return new Promise((resolve, reject) => {
            rp(url)
                .then(this._formatHtml)
                .then(html => {
                    let $ = cheerio.load(html);
                    let trLength = $('html body center a table tbody tr td center table tbody tr').length;
                    let partiu = trLength > 22 ? true : false;

                    resolve(partiu);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
