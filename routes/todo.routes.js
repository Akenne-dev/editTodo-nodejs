const express = require("express")
const todorouter = express.Router()
const {gettodopage,Addtodo,deletetodo, updatetodo, edittodo,updateedittodo} = require("../controller/todo.controller")

// Middleware to attach userId to request - PROTECTED ROUTE
const userMiddleware = (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      req.userId = req.session.userId;
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Session check error:", error);
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