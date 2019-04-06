const fs = require('fs');
const staticPath = __dirname + '../../../dist/'
let getStaticSource = {
    index(req, res) {
        fs.readFile(`${staticPath}index.html`, function (error, file) {
            if (error) {
                console.log(error)
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.write(file, function (err) {
                    res.end();
                });
            }
        })
    },
    source(req, res) {
        if (req.url.indexOf('.js') !== -1) {
            let fileName = req.url.match(/.+\.js/gi)[0]
            fs.readFile(`${staticPath}${fileName}`, function (error, file) {
                if (error) {
                    console.log(error)
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/javascript"
                    });
                    res.write(file, function (err) {
                        res.end();
                    });
                }
            })
        } else {}

        if (req.url.indexOf('.css') !== -1) {
            let fileName = req.url.match(/.+\.css/gi)[0]
            fs.readFile(`${staticPath}${fileName}`, function (error, file) {
                if (error) {
                    console.log(error)
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/css"
                    });
                    res.write(file);
                    res.end();
                }
            })
        } else {}



    }
}

module.exports = getStaticSource