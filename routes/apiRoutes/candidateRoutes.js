const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// 1. get all candidates from the database
router.get('/api/candidates', (req,res) => {
    db.query(`SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id`, (err,rows) => {
        if(err) {
            res.status(500).json({error:err.message});
        }
        res.json({
            message:'success',
            data:rows
        });
    });
});


// 2. get selected candidate from the database
router.get ('/api/candidate/:id', (req,res) => {
    db.query(`SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE id = ?`, req.params.id, (err,row) => {
        if(err) {
            res.status(400).json({error:err.message}); 
        }
        res.json({
            message:'success',
            data:row
        });
    });
});


// 3. Post a selected candidate from the database
router.post ('/api/candidate/:id', ({body},res) => {
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
                    message: 'candidate sucessfully added',
                    data:body
                });
            });
    
});


// 4. Update a candidate's party
router.put('/api/candidate/:id', (req, res) => {
    if (inputCheck(req.body, 'party_id')) {
        res.status(400).json({error:errors})
    }
    const sql = `UPDATE candidates SET party_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });


// 5. delete a selected candidate from the database
router.delete ('/api/candidate/:id', (req,res) => {
    db.query(`DELETE FROM candidates WHERE id = ?`, req.params.id, (err,result) => {
        if(err) {
            res.status(400).json({error:err.message}); 
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        }
        res.json({
            message:'candidate successfully deleted',
            changes:result.affectedRows,
            id:req.params.id
        });
    });
});


  module.exports = router;