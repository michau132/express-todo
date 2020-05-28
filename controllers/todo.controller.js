const TodoModel = require('../model/todo.model');

const createTodo = async (req, res, next) => {
  try {
    const todo = await TodoModel.create(req.body)
    res.status(201).json(todo)
  } catch (error) {
    next(error)
  }

}


const getTodos = async (req,res,next) => {
  try {
    const collection = await TodoModel.find({})
    res.status(200).json(collection)
  } catch (error) {
    next(error)
  }
}

const getTodoById = async (req,res,next) => {
  try {
    const todoModel = await TodoModel.findById(req.params.todoId)
    if(!todoModel) {
      res.status(404).send()
      return
    }
    res.status(200).json(todoModel)
  } catch (error) {
    next(error)
  }
}

const updateTodo = async (req, res,next) => {
  try {
    const todoModel = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body)
    if(todoModel) {
      res.status(200).json(todoModel)
      return
    }
    res.status(404).send()
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (req,res,next) => {
  try {
    const todoModel = await TodoModel.findByIdAndDelete(req.params.todoId)
    if(todoModel) {
      res.status(200).send()
    }
    res.status(404).send()
  } catch (error) {
    next(error)
  }
}

module.exports= {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
}
