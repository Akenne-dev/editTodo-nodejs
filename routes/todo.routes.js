const express = require("express")
const todorouter = express.Router()
const {gettodopage,Addtodo,deletetodo, updatetodo, edittodo,updateedittodo} = require("../controller/todo.controller")

// Middleware to attach userId to request - PROTECTED ROUTE
const userMiddleware = (req, res, next) => {
  if (req.session.userId) {
    req.userId = req.session.userId;
    next();
  } else {
    res.redirect("/login");
  }
}

todorouter.use(userMiddleware)

todorouter.get('/todo',gettodopage)
todorouter.post('/addtodo', Addtodo)
todorouter.post('/deletetodo/:id', deletetodo)
todorouter.post("/updatetodo/:id", updatetodo)
todorouter.get("/edit-todo/:id", edittodo)
todorouter.post("/edit-todo/:id", updateedittodo)

module.exports = todorouter