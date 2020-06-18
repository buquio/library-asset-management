const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;

//connect db
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/LAMS';
//mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// middleware for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // goes to next route
});

router.get('/', (req, res) => {
    res.json({message: 'Hello World!!'});
});

app.use('/', router);

// other routes
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);



app.listen(port, (error) => {
    console.log(`Listening on Port ${port}...`)
    })