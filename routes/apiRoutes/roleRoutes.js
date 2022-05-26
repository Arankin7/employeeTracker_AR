const express = require('express');
const { restoreDefaultPrompts } = require('inquirer');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../../config/connection');

// Get all roles
router.get('/roles', (req, res) =>{
    const sql = `SELECT * FROM roles`;

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

// Get role by ID
router.get('/role/:id', (req, res) =>{
    const sql = `SELECT * FROM roles WHERE id = ?`;
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