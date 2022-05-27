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

// Post route to add a role

router.post('/role', ({body}, res) =>{
    const sql = `INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'Role added Successfully!',
            data: body
        });
    });
});

// Route to delete a role
router.delete('/role/:id', (req, res) =>{
    const sql = `DELETE FROM roles WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) =>{
        if(err){
            res.json({
                error: err.message
            });
            return;
        }
        else if(!result.affectedRows){
            res.json({
                message: 'No Role found with this ID.'
            });
        }
        else {
            res.json({
                message: 'Role deleted successfully',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;