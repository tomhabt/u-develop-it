const express = require('express');
const router = express.Router();
const db = require('../../db/connection');



// 1. get all parties from the database
router.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });


  // 2. get selected parties from the database
  router.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// 3. delete a selected candidate from the database
router.delete ('/api/parties/:id', (req,res) => {
    db.query(`DELETE FROM parties WHERE id = ?`, req.params.id, (err,result) => {
        if(err) {
            res.status(400).json({error:err.message}); 
        } else if (!result.affectedRows) {
            res.json({
                message: 'party not found'
            });
        }
        res.json({
            message:'party successfully deleted',
            changes:result.affectedRows,
            id:req.params.id
        });
    });
});

module.exports = router;