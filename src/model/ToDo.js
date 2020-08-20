const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const ToDoModel = mongoose.model("ToDo", ToDoSchema)

module.exports = ToDoModel;