const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then( ()=> console.log("Mongodb Atlas Connected.") )
.catch(err =>console.log(err));

app.use("/api/todos",todoRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port: ",process.env.PORT);
});



