const express = require("express")
const todorouter = express.Router()
const {gettodopage,Addtodo,deletetodo, updatetodo, edittodo,updateedittodo} = require("../controller/todo.controller")
const { getCurrentUser } = require("../context/userContext")

// Middleware to attach userId to request
const userMiddleware = (req, res, next) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    req.userId = currentUser._id;
  }
  next();
}

todorouter.use(userMiddleware)

todorouter.get('/todo',gettodopage)
todorouter.post('/addtodo', Addtodo)
todorouter.post('/deletetodo/:id', deletetodo)
todorouter.post("/updatetodo/:id", updatetodo)
todorouter.get("/edit-todo/:id", edittodo)
todorouter.post("/edit-todo/:id", updateedittodo)

module.exports = todorouter