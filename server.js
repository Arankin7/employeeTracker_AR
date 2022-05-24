const express = require('express');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./config/connection');
const apiRoutes = require('./routes/apiRoutes');


// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (NOT FOUND)
app.use((req, res) =>{
    res.status(404).end();
});

// start server after DB connection
db.connect(err=>{
    if(err) throw err;
    console.log('Database Connected');
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`);
    });
});