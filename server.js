const express = require('express');

const mysql = require ('mysql2');

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use (express.urlencoded({extended: false}));
app.use (express.json());

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
// get all candidates from the database
// db.query(`select * from candidates`, (err,rows) => {
//     console.log(rows);
// })

// get selected candidate from the database
db.query(`SELECT * FROM  candidates WHERE id = 1`, (err,row) => {
    if (err) {
        console.log();         
    }
    console.log(row);
});

// delete a selected candidate from the database
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// add a candidate to the database
const sql = `INSERT INTO candidates (id,first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
const params = [1,'Ronald', 'Firbank', 1];

db.query(sql,params, (err,result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
});

app.get('/', (req,res) => {
    res.json({
        messgae: 'Hello World!'
    });
});

app.use((req,res) => {
    res.status(404).end();
});

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})