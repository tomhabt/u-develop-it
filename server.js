const express = require('express');
const mysql = require ('mysql2');

const inputCheck = require('./utils/inputCheck');

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
app.get('/api/candidates', (req,res) => {
    db.query(`SELECT * FROM candidates`, (err,rows) => {
        if(err) {
            res.status(500).json({error:err.message});
        }
        res.json({
            message:'success',
            data:rows
        });
    });
});

// get selected candidate from the database
app.get ('/api/candidate/:id', (req,res) => {
    db.query(`SELECT * FROM  candidates WHERE id = ?`, req.params.id, (err,row) => {
        if(err) {
            res.status(400).json({error:err.message}); 
        }
        res.json({
            message:'success',
            data:row
        });
    });
});


// delete a selected candidate from the database
app.delete ('/api/candidate/:id', (req,res) => {
    db.query(`DELETE FROM candidates WHERE id = ?`, req.params.id, (err,result) => {
        if(err) {
            res.status(400).json({error:err.message}); 
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        }
        res.json({
            message:'data successfully deleted',
            changes:result.affectedRows,
            id:req.params.id
        });
    });
});

// Post a selected candidate from the database
app.post ('/api/candidate/:id', ({body},res) => {
    if (inputCheck(body,'first_name', 'last_name', 'industry_connected')) {
        res.status(400).json({error:inputCheck(body,'first_name', 'last_name', 'industry_connected')})
    }
    const sql = `INSERT INTO candidates (id,first_name, last_name, industry_connected)
               VALUES (?,?,?,?)`;
    const params = [1,'Ronald', 'Firbank', 1];

            db.query(sql,params, (err,result) => {
                if(err) {
                    res.status(400).json({
                        error:err.message
                    })
                }
                res.json({
                    message: 'data sucessfully added',
                    data:body
                });
            });
    
});


// add a candidate to the database
// const sql = `INSERT INTO candidates (id,first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1,'Ronald', 'Firbank', 1];

// db.query(sql,params, (err,result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

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