const express = require("express");
// const inquirer = require('inquirer');
const router = express.Router();

// Use router to grab api routes
router.use(require('./apiRoutes/departmentRoutes'));
router.use(require('./apiRoutes/employeeRoutes'));
router.use(require('./apiRoutes/roleRoutes'));



module.exports = router;