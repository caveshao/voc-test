const fs = require('fs')
const mysql = require('mysql')
const xlsx = require('node-xlsx')



let sql = 'SELECT * from vocs'

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let getVoc = {
    voc(req, res) {
        let resData = [];
        res.writeHeader(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET",
            "X-Powered-By": "3.2.1",
            "Content-Type": "application/json;charset=utf-8"
        })

        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '3306',
            database: 'voctest'
        });

        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            let vocs = [];
            for (let i = 0; i < 20; i++) {
                let index = 1000 * i + getRandomInt(1000);
                vocs.push(result[index].voc)
            }
            resData = result[0].password;
            let json = JSON.stringify({
                vocs
            })
            res.write(json);
            res.end();
        });
        connection.end();
    }
}

module.exports = getVoc