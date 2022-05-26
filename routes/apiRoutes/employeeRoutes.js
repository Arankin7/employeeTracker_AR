const express = require('express');
const { enable } = require('express/lib/application');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../../config/connection');
const { route } = require('./departmentRoutes');


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

// Post route to add employee
router.post('/employee', ({body}, res) =>{
    const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }        
        res.json({
            message: 'Employee Added Succeessfully',
            data: body
        });
    });
});

// Route to update an employees Role
router.put('/employee/:id', (req, res) =>{
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({
                error: err.message
            });
            return;
        }
        else if(!result.affectedRows){
            res.json({
                message: 'No employee found with this ID.'
            });
        }
        else{
            res.json({
                message: 'Employee role succesfully changed',
                data: req.body, 
                changes: result.affectedRows                
            });
        }
    });
});

// Route to delete an employee
router.delete('/employee/:id', (req, res) =>{
    const sql = `DELETE FROM employees WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) =>{
        if(err){
            res.json({
                error: err.message
            });
            return;
        }
        else if(!result.affectedRows){
            res.json({
                message: 'No Employee found with this ID.'
            });
        }
        else {
            res.json({
                message: 'Employee Terminated successfully',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


module.exports = router;