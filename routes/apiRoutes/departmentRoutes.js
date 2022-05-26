const express = require('express');
const res = require('express/lib/response');
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
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: row
        });
    });
});


// Post route to add a department
router.post('/department', ({body}, res) =>{
    const sql = `INSERT INTO departments(name) VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'Department added Successfully!',
            data: body
        });
    });
});

// Route to delete a department
router.delete('/department/:id', (req, res) =>{
    const sql = `DELETE FROM departments WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) =>{
        if(err){
            res.json({
                error: err.message
            });
            return;
        }
        else if(!result.affectedRows){
            res.json({
                message: 'No department found with this ID.'
            });
        }
        else {
            res.json({
                message: 'Department deleted successfully',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


module.exports = router;