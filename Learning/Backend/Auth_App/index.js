const express = require('express');
const app = express();

require('dotenv').config()
//this loads the .env file ka data into the process object

const PORT = 3000;

app.use(express.json());

require('./config/database').connectDb();

//routes importing and mounting


const user = require('./routes/user');
app.use("/api/v1", user);

 
//activating the server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
})