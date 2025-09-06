// index.js
require('dotenv').config();
const express = require('express');
const app = express();
require('./models/db')
const router = require("./Routes/TaskRoute")
const bodyParser = require("body-parser")
const cors = require("cors")

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use("/task",router)




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
