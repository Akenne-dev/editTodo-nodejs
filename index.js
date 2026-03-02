const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
require("dotenv").config()
const connect = require("./Database/db.connect")
const todorouter = require("./routes/todo.routes")

console.log("🚀 App starting...")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Use simple MemoryStore for sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key-12345",
  resave: false,
  saveUninitialized: false,
  store: new session.MemoryStore(),
  cookie: { 
    secure: false,  // Allow http for development
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24  // 24 hours
  }
}))

console.log("✅ Session middleware configured")

app.use("/", todorouter)

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "✅ App is running", timestamp: new Date() })
})

// CRUD?
// CREATE READ UPDATE DELETE
const userSchema = new mongoose.Schema({
username:{type:String, required:true, trim:true},
email :{type:String, unique:true, required:true, trim:true},
password :{type:String, required:true}
})
const usermodel = mongoose.model("user-collection", userSchema)




app.get("/",( req,res)=>{
  console.log("📍 GET / - User session:", req.session.userId ? "logged in" : "not logged in")
  
  if (req.session && req.session.userId) {
    console.log("Redirecting logged-in user to /todo")
    return res.redirect("/todo")
  }
  
  console.log("Rendering landing page")
  res.render('landing')
})

let todos = []
const users = []
let currUser =""
let currentUser = null
const alluser = [
           {"id":"1" ,"name": "Olaide", "class":"NodeJS"},
           { "id":"2", "name": "Lanre", "class":"ReactJS"},
           { "id":"3","name": "Kareem", "class":"AngularJS"},
           { "id":"4","name": "Olamide", "class":"NodeJS"},
           { "id":"5","name": "Titilayo", "class":"ReactJS"},
           { "id":"6","name": "Ayomide", "class":"NodeJS"},
           { "id":"7","name": "Fredrick", "class":"AngularJS"},
           { "id":"8","name": "Evans", "class":"NodeJS"},
           { "id":"9","name": "Temi", "class":"ReactJS"},
           { "id":"10","name": "Anu", "class":"VueJS"},
           { "id":"11","name": "Kenny", "class":"AngularJS"},
           { "id":"12","name": "Hammed", "class":"NodeJS"},
           { "id":"13","name": "Quadri", "class":"ReactJS"},
           {"id":"14","name": "Richard", "class":"VueJS"},
           {"id":"15","name": "Richard", "class":"VueJS"},
]

app.get("/user",( req,res)=>{
  res.json({"user": alluser
})
})

app.get("/user/:id/",( req,res)=>{
  console.log(req.params);
  const {id} = req.params
  const oneuser = alluser.find(user => user.id === id);
  console.log(oneuser);
  res.send(oneuser)
  
})

app.get("/home",(req, res)=>{
  res.render('index', {name: "shola",alluser,gender:"Male"})
})




app.get("/signup",(req,res)=>{
  try {
    if (req.session && req.session.userId) {
      return res.redirect("/todo")
    }
  } catch (e) {
    console.log("Session check error on /signup:", e.message)
  }
  res.render('signup')
})
app.get("/dashboard",(req,res)=>{
  if (req.session && req.session.userId) {
     const username = req.session.username
     return res.render('dashboard',{name: username})
  }
  return res.redirect("/login")
})

app.post("/user/signup", async (req, res)=>{

  try {
    const { username, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      return res.send("Passwords do not match")
    }
    
    console.log(req.body);
    const newuser = await usermodel.create({ username, email, password })
    console.log(newuser);
    if (newuser) {
      console.log("✅ User created successfully, redirecting to login")
      return res.redirect("/login")
    }
    return res.send("error occured")
    
  } catch (error) {
    console.log(error.message);
    if (error.code == 11000) {
      return res.send("Email already exists. Please use a different email or login.")
    }
    if (error.message.includes("user_collection validation failed")) {
            return res.send("All fields are mandatory")

    }
  }
})

app.get("/login", (req, res) => {
  try {
    if (req.session && req.session.userId) {
      return res.redirect("/todo")
    }
  } catch (e) {
    console.log("Session check error on /login:", e.message)
  }
  res.render('login', { error: null }); 
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.post("/usersLogin", async (req,res)=>{
  const { email, password } = req.body

  console.log(email);
  console.log(password);
  

  if (!email || !password) {
    res.send('All fields are mandatory')
    return
  }

  const find = await usermodel.findOne({
    email: email,
    password: password,
  })

  
  if (find) {
    req.session.userId = find._id
    req.session.username = find.username
    res.redirect("/todo")
  } else {
    // Render login page with professional error message
    res.render("login", { error: "User not found. Please check your credentials." })
  }

})

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message)
  console.error(err.stack)
  res.status(500).send("Something went wrong: " + err.message)
})

// Self-ping to keep Render free tier awake (every 14 minutes)
const RENDER_URL = process.env.RENDER_EXTERNAL_URL // Render sets this automatically
if (RENDER_URL) {
  const https = require("https")
  const http = require("http")
  setInterval(() => {
    const lib = RENDER_URL.startsWith("https") ? https : http
    lib.get(`${RENDER_URL}/health`, (res) => {
      console.log(`🏓 Self-ping: ${res.statusCode}`)
    }).on("error", (err) => {
      console.log("🏓 Self-ping failed:", err.message)
    })
  }, 14 * 60 * 1000) // Every 14 minutes
  console.log("🏓 Self-ping enabled to keep service awake")
}

// Start server
connect()
const port = process.env.PORT || 8004
app.listen(port,()=>{
console.log(`server is on port ${port}`);

})













// const username = "Shla"

// console.log(username, "show the value of username");

// let names = ["AYO", "Bola", "Delroy"]
// names.push("sola")
// console.log(names, "All user information");


//         // HOMEWORK PRACTICE

// const express = require("express");
// const app = express();

// const students = [
//   { id: "1", name: "Ayo", course: "NodeJS" },
//   { id: "2", name: "Blessing", course: "ReactJS" },
//   { id: "3", name: "Samuel", course: "AngularJS" },
//   { id: "4", name: "Fatima", course: "VueJS" },
//   { id: "5", name: "Daniel", course: "NodeJS" }
// ];

// // QUESTION 1: GET ALL STUDENTS
// app.get("/students", (req, res) => {
//   res.send(students);
// });

// // QUESTION 2: GET ONE STUDENT BY ID (WITH DESTRUCTURING)
// app.get("/students/:id", (req, res) => {
//   console.log(req.params); // { id: "3" }

//   const { id } = req.params; // DESTRUCTURING

//   const oneuser = students.find(student => student.id === id);

//   // QUESTION 4: IF STUDENT NOT FOUND
//   if (!oneuser) {
//     return res.send({ message: "Student not found" });
//   }

//   res.send(oneuser);
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });


// // FILTER
// app.get("/students/nodejs", (req, res) => {
//   const nodeStudents = students.filter(student => student.course === "NodeJS");
//   res.send(nodeStudents);
// });
