const express = require('express');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../../config/connection');


// Get all employees
router.get('/employees', (req, res) =>{
    const sql = `SELECT * FROM employees ORDER BY role_id`;
    
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

// Get an employee by ID
router.get('/employee/:id', (req, res) =>{
    const sql = `SELECT * FROM employees WHERE id = ?`;
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