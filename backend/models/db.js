const mongoose = require("mongoose")

const DB_URL = process.env.MON_CN;

mongoose.connect(DB_URL).then((res)=>{
    console.log("DB CONNECTED...")
}).catch((error)=>{
    console.log("DB error")
})