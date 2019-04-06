const xlsx = require('node-xlsx');
const mysql = require('mysql')

const wordSheets = xlsx.parse(`${__dirname}/../src/words20000.xlsx`);

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'voctest'
});


let sql = `create table if not exists vocs(
                        id int primary key auto_increment,
                        voc varchar(255)not null)`;

let vocs = [];

wordSheets.forEach(function (sheet) {
    console.log(sheet['name']);
    for (var rowId in sheet['data']) {
        var row = sheet['data'][rowId];
        vocs.push(row[1])
    }
});


connection.query(sql, function (err, result) {
    if (err) {
        console.log(err.message);
        return;
    }
});

vocs.forEach(voc => {
    connection.query(`insert into vocs (id,voc) values (NULL,\"${voc}\")`, function (err) {
        if (err) {
            console.log(err)
        }
    })
})