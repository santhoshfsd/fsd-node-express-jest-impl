const todoController = require('../../src/controller/todo.controller')
const todoModel = require('../../src/model/ToDo')
const httpMocks = require('node-mocks-http')
const todoMock = require('../mock-data/todo');
const todoListMock = require('../mock-data/all-to-do');
todoModel.create = jest.fn();
todoModel.find = jest.fn();
let req, res, next;
jest.setTimeout(9000);
// write test suites
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    req.body = todoMock;
    next = jest.fn()
});

describe('ToDo test controller - create', () => {

    it('should have a createToDo function', () => {
        expect(typeof (todoController.createTodo)).toBe('function');
    });
    it('should call todomodel.create ', async () => {

        await todoController.createTodo(req, res, next)
        expect(res.statusCode).toBe(201)
        expect(todoModel.create).toBeCalledWith(todoMock)
    });
    it('should return response 201  ', async () => {

        await todoController.createTodo(req, res, next)
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    });
    it('should return json response', async () => {
        todoModel.create.mockReturnValue(todoMock);
        await todoController.createTodo(req, res, null)
        expect(res._getJSONData()).toStrictEqual(todoMock)
    });

    it('shoud handle errors in create todo', async () => {
        const errMsg = "Property missing in the request"
        const promise = Promise.reject(errMsg);
        todoModel.create.mockReturnValue(promise);
        req.body = { title: "test" }
        await todoController.createTodo(req, res, next)
        expect(next).toBeCalledWith(errMsg)
    })
});

describe('ToDo test controller - getTodo', () => {

    it('should have a getTodo', async () => {
        expect(typeof (todoController.getTodo)).toBe('function')

    })

    it('should handle error list while calling  getTodo', async () => {
        const errMessage = "Error in finding";
        const rejectedPromise = Promise.reject(errMessage)
        todoModel.create.mockReturnValue(rejectedPromise);

        await todoController.createTodo(req, res, next)
        expect(next).toHaveBeenCalledWith(errMessage)
    })
    it('should have a call todo find', async () => {
        todoModel.find.mockReturnValue(todoListMock)
        await todoController.getTodo(req, res, next)
        expect(todoModel.find).toHaveBeenCalledWith({})
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(todoListMock)
    })
})