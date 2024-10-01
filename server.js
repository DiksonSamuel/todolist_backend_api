const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dbConnect = require('./config/dbConnection');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json())

app.use('/api/todolist', require('./routes/todolistRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler)
app.use(morgan('dev'));
dbConnect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})