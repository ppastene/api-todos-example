const express = require('express')
const app = express()
const db = require('./models');
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 4000
const auth = require('./routes/auth')
const todos = require('./routes/todos')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', auth);
app.use('/todos', todos);

app.listen(port, () => {
    console.log("Servidor operativo en puerto "+port)
    //db.sequelize.sync();
})