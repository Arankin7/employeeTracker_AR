const express = require("express");
const { append } = require("express/lib/response");
// const inquirer = require('inquirer');
const router = express.Router();

// Use router to grab api routes
router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));



module.exports = router;