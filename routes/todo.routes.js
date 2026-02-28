const express = require("express")
const todorouter = express.Router()

const {
  gettodopage,
  Addtodo,
  deletetodo,
  updatetodo,
  edittodo,
  updateedittodo
} = require("../controller/todo.controller")

// Middleware to check if user is logged in
const authMiddleware = (req, res, next) => {
  console.log("🔐 Checking auth for:", req.path, "- Session ID:", req.sessionID)

  if (!req.session || !req.session.userId) {
    console.log("❌ No session/userId, redirecting to login")
    return res.redirect("/login")
  }

  console.log("✅ User authenticated:", req.session.userId)
  req.userId = req.session.userId
  next()
}

// 🔐 Apply middleware ONLY to protected routes
todorouter.get('/todo', authMiddleware, gettodopage)
todorouter.post('/addtodo', authMiddleware, Addtodo)
todorouter.post('/deletetodo/:id', authMiddleware, deletetodo)
todorouter.post("/updatetodo/:id", authMiddleware, updatetodo)
todorouter.get("/edit-todo/:id", authMiddleware, edittodo)
todorouter.post("/edit-todo/:id", authMiddleware, updateedittodo)

module.exports = todorouter