// TODO CLASSWORK 👇

const todomodel = require("../model/todo.model")
const bcrypt = require("bcryptjs")


const gettodopage = async(req, res)=>{
    try {
         const userId = req.userId;
         if (!userId) {
           return res.redirect("/login");
         }
         const todos = await todomodel.find({ userId: userId });
         res.render('todo', { todos }); 
    } catch (error) {
       console.log(error);
        
    }

}

const Addtodo = async(req, res)=>{
console.log(req.body);  
try {
  const userId = req.userId;
  if (!userId) {
    return res.redirect("/login");
  }
  const newTodo = await todomodel.create({
    ...req.body,
    userId: userId
  })
  if (newTodo) {
    return res.redirect("/todo")
  }
  return res.send("unable to add todo")
} catch (error) {
  console.log(error);
  
}
}

const deletetodo = async(req,res)=>{
      try {
    const userId = req.userId;
    if (!userId) {
      return res.redirect("/login");
    }
    const todo = await todomodel.findById(req.params.id);
    if (!todo || todo.userId.toString() !== userId.toString()) {
      return res.send("Unauthorized");
    }
    await todomodel.findByIdAndDelete(req.params.id);
    res.redirect("/todo");
  } catch (error) {
    console.log(error);
    res.send("Unable to delete todo");
  }
}
 const updatetodo = async(req, res)=>{
  try {
    const userId = req.userId;
    if (!userId) {
      return res.redirect("/login");
    }
    const todo = await todomodel.findById(req.params.id);
    if (!todo || todo.userId.toString() !== userId.toString()) {
      return res.send("Unauthorized");
    }
    await todomodel.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed === "on"
      }
    );

    res.redirect("/todo");
  } catch (error) {
    console.log(error);
    res.send("Unable to update todo");
  }
 }

const edittodo = async (req, res)=>{
        try {
        const userId = req.userId;
        if (!userId) {
          return res.redirect("/login");
        }
        const todo = await todomodel.findById(req.params.id);
        if (!todo || todo.userId.toString() !== userId.toString()) {
          return res.send("Unauthorized");
        }
        console.log("Found todo:", todo); // Debug
        res.render('edit-todo', { todo });
    } catch (error) {
        console.log("Error:", error);
        res.send("Error finding todo");
    }
}

const updateedittodo = async (req, res) => {
        try {
        const userId = req.userId;
        if (!userId) {
          return res.redirect("/login");
        }
        const todo = await todomodel.findById(req.params.id);
        if (!todo || todo.userId.toString() !== userId.toString()) {
          return res.send("Unauthorized");
        }
        await todomodel.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description
        });
        res.redirect('/todo');
    } catch (error) {
        console.log("Error:", error);
        res.send("Error updating todo");
    }
}


// TODO CLASSWORK ☝️

module.exports = {gettodopage,Addtodo,deletetodo,updatetodo,edittodo,updateedittodo}