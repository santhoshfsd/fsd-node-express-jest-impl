const express = require('express');
const todoRoute = require('./routes/todoRoutes');
const db = require('../src/mongodb/mongodb.connect')

db.connect();

const app = express();
app.use(express.json());

app.use('/todos', todoRoute)
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
})

app.get('/', (req, res) => {
    let data = {
        "response": "OK"
    }
    res.json(data)
})

module.exports = app