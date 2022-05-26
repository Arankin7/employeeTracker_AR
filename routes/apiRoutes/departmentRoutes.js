const express = require('express');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../../config/connection');


// get all departments
router.get('/departments', (req, res) =>{
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// Get a department by ID
router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: row
        });
    });
});




module.exports = router;