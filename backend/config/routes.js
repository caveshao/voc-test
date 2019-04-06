const getStaticSource = require('../controllers/getStaticSouce')
const getVoc = require('../controllers/getVoc')

function route(pathname, req, res) {
    if (req.method === 'GET') {
        switch (pathname) {
            case '/':
                getStaticSource.index(req, res);
                break;
            case '/voc':
                getVoc.voc(req, res);
                break;
            default:
                getStaticSource.source(req, res);
                break;
        }
    } else if (req.method === 'POST') {

    }
}

exports.route = route;