const express = require('express')
const router = express.Router();
const toDoController = require('../controller/todo.controller')

router.post('/', toDoController.createTodo)

router.get('/', toDoController.getTodo)

module.exports = router