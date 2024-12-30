const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDb = require('./config/db');


// dot env configuration
dotenv.config();
// db connection
connectDb();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// route
app.use('/test', require('./routes/testRoutes'));
app.use('/auth', require('./routes/authRoutes'));


app.get('/',  (req, res) =>{
  return res.status(200).send("<h1>welcome to food server App api based project</h1>")
}) 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server running on ${PORT}'.white.bgMagenta);
}) 

