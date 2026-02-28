const mongoose = require("mongoose")

const todoschema = new mongoose.Schema({
  title:{type:String, required:true, trim:true},
  description:{type:String, required:true, trim:true},
  completed:{type:Boolean, default:false},
  userId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'user-collection'},
  createdAt:{type:Date, default:Date.now}
})
const todomodel = mongoose.model("todo-collection", todoschema)

module.exports = todomodel
