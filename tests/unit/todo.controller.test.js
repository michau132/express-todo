const TodoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')
const collection = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn()
TodoModel.find = jest.fn()
TodoModel.findById = jest.fn()
let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
});

describe('TodoController.deleteTodo', () => {
  it('should have deleteTodo', () => {
    expect(typeof TodoController.deleteTodo).toBe('function')
  });
});

describe('TodoController.updateTodo', () => {
  it('should be defined', () => {
    expect(typeof TodoController.updateTodo).toBe('function')
  });
  it('should update witht TodoModel.findByIdAndUpdate', async () => {
    TodoModel.findByIdAndUpdate = jest.fn()
    req.params.todoId = '32'
    req.body = newTodo
    await TodoController.updateTodo(req, res,next)
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith('32', newTodo)
  });
  it('should update with TodoModel.findByIdAndUpdate and return json data', async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo)
    req.params.todoId = '32'
    req.body = newTodo
    await TodoController.updateTodo(req, res,next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(newTodo)
  });
  it('should return 404 if item not exist', async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue(null)
    await TodoController.updateTodo(req,res,next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  });
  it('should handle error', async () => {
    const errorMessage = {message: 'Property missing'}
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)
    await TodoController.updateTodo(req,res,next)
    expect(next).toBeCalledWith(errorMessage)
  });
});

describe('TodoController.getTodoById', () => {
  it('should have getTodoById', () => {
    expect(typeof TodoController.getTodoById).toBe('function')
  });
  it('should call TodoModel.findById', async () => {
    req.params.todoId = '134'
    await TodoController.getTodoById(req,res,next)
    expect(TodoModel.findById).toHaveBeenCalledWith('134')
  });
  it('should return json body and response code 200', async () => {
    TodoModel.findById.mockReturnValue(newTodo)
    await TodoController.getTodoById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(newTodo)
    expect(res._isEndCalled()).toBeTruthy()
  });
  it('should handle error', async () => {
    const errorMessage = {message: 'Property missing'}
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.findById.mockReturnValue(rejectedPromise)
    await TodoController.getTodoById(req,res,next)
    expect(next).toBeCalledWith(errorMessage)
  });
  it('should return 404 if item not exist', async () => {
    TodoModel.findById.mockReturnValue(null)
    await TodoController.getTodoById(req,res,next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  });
});

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo
  });
  it('should have a createTood fn', () => {
    expect(typeof TodoController.createTodo).toBe('function')
  });

  it('should call TodoMode.create', () => {
    TodoController.createTodo(req, res, next)
    expect(TodoModel.create).toBeCalledWith(newTodo)
  });

  it('should reutrn 201 response code', async () => {
    await TodoController.createTodo(req,res,next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  });

  it('should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo)
    await TodoController.createTodo(req,res,next)
    expect(res._getJSONData()).toEqual(newTodo)
  });

  it('should handle errors', async () => {
    const errorMessage = {message: 'Property missing'}
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.create.mockReturnValue(rejectedPromise)
    await TodoController.createTodo(req,res,next)
    expect(next).toBeCalledWith(errorMessage)
  });
});

describe('TodoController.getTodos', () => {
  beforeEach(() => {
    req.body= collection
  });
  it('should have getTodos', () => {
    expect(typeof TodoController.getTodos).toBe('function')
  });
  it('should call TodoModel.find({})', async () => {
    await TodoController.getTodos(req,res,next)
    expect(TodoModel.find).toHaveBeenCalledWith({})
  });
  it('should return status 200 and all todos', async () => {
    TodoModel.find.mockReturnValue(collection)
    await TodoController.getTodos(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toEqual(collection)
  });
  it('should handle error', async () => {
    const errorMessage = {message: 'Property missing'}
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.find.mockReturnValue(rejectedPromise)
    await TodoController.getTodos(req,res,next)
    expect(next).toBeCalledWith(errorMessage)
  });
});