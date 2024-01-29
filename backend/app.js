const express = require('express')
const bodyParser = require('body-parser')
const connectToMongo = require('./config/mongoose');
const cors = require('cors');

connectToMongo();

const app = express()
const port = 5000;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.use(express.json())

app.use('/api/roles', require('./routes/roleMaster'));
app.use('/api/user', require('./routes/userMaster'));
app.use('/api/project', require('./routes/projectMaster'));
app.use('/api/task', require('./routes/taskType'));
app.use('/api/auth', require('./routes/login'));
app.use('/api/tasklog', require('./routes/taskLog'));

app.listen(port, ()=>{
    console.log(`Task Management System server is on port ${port} Successfully`);
})