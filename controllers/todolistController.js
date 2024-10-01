const asyncHandler = require('express-async-handler');
const Todolist = require('../models/todolistModel');


//@desc get all todolist
//@route GET /api/todolist
//@access private
const getAllTodoList = asyncHandler(async(req, res) => {
  const todolists = await Todolist.find({creator_id: req.user.id});
  res.status(200).json(todolists)
})

//@desc create todolist
//@route POST /api/todolist
//@access private
const createTodoList = asyncHandler(async(req, res) => {
  let { title, description, completed } = req.body;

  if(!title || !description || !completed) {
    res.status(400);
    throw new Error('All fields are mandatory')
  }

  const todo = await Todolist.create({
    creator_id: req.user.id,
    title,
    description,
    completed
  })

  res.status(201).json(todo)
})

//@desc get single todolist
//@route get /api/todolist/:id
//@access private
const getSingleTodolist = asyncHandler(async(req, res) => {
  const todo = await Todolist.findById(req.params.id);

  if(!todo) {
    res.status(400);
    throw new Error('todo not found')
  } else if(todo.creator_id !== req.user.id) {
    res.status(403);
    throw new Error('no access for this user')
  }
  res.status(200).json(todo)
})

//@desc delete todolist
//@route DELETE /api/todolist/:id
//@access private
const deleteTodoList = asyncHandler(async(req, res) => {
  const todo = await Todolist.findById(req.params.id);
  if(!todo) {
    res.status(400);
    throw new Error('todo not found')
  } else if(todo.creator_id !== req.user.id) {
    res.status(403);
    throw new Error('no access for this user')
  }

  await Todolist.deleteOne({ _id: req.params.id });
  res.status(200).json({message: "Deleted successfuly", id: req.params.id})
})

//@desc update todolist
//@route PUT /api/todolist
//@access private
const updateTodoList = asyncHandler(async(req, res) => {
  const todo = await Todolist.findById(req.params.id);
  if(!todo) {
    res.status(400);
    throw new Error('todo not found')
  } else if(todo.creator_id !== req.user.id) {
    res.status(403);
    throw new Error('no access for this user')
  }

  const updatedTodo = await Todolist.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updatedTodo)
})

module.exports = {
  getAllTodoList,
  createTodoList,
  getSingleTodolist,
  deleteTodoList,
  updateTodoList
}