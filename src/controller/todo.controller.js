
const ToDoModel = require('../model/ToDo')

// req res and middleware
module.exports.createTodo = async (req, res, next) => {
    try {
        const createModel = await ToDoModel.create(req.body);
        res.status(201).json(createModel);
    } catch (err) {
        next(err)
    }

}


module.exports.getTodo = async (req, res, next) => {
    try {
        const list = await ToDoModel.find({});
        console.log(list);
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}