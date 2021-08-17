const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use (express.urlencoded({extended: false}));
app.use (express.json());

// use apiRoutes
app.use('./api', apiRoutes);

// Default error response of user or client try to access the url with unavialable route (Not Found)
app.use((req,res) => {
    res.status(404).end();
});

// start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database Connected.')

    // listens the server
    app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});