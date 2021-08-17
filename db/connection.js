const mysql = require ('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Mysql@124727117372',
        database:'election'
    },
    console.log('Connected to the election database.')
);



module.export = db