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
db.query(`select * from candidates`, (err,rows) => {
    console.log(rows);
})

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