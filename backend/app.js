const http = require('http');
const routes = require('./config/routes')
const url = require('url')

const port = 8080;

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    routes.route(pathname, req, res)

})

server.on('err', (err) => {
    console.log(err);
    throw err;
})

server.listen(port, () => {
    console.log('server start', port)
})