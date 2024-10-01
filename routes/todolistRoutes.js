const express = require('express');
const { getAllTodoList, createTodoList, getSingleTodolist, deleteTodoList, updateTodoList } = require('../controllers/todolistController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.get('/', validateToken, getAllTodoList)

router.route("/").post(validateToken, createTodoList)

router.route("/:id").get(validateToken, getSingleTodolist)

router.route("/:id").delete(validateToken, deleteTodoList)

router.route("/:id").put(validateToken, updateTodoList)

module.exports = router;