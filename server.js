require ('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')
const directoryRouter = require('./routes/directoryRouter')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("client/build"));

//ROUTES
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)
app.use('/directory', directoryRouter)

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Listen Server
const PORT = process.env.PORT
const URI = process.env.MONGODB_URL
app.listen(PORT, () => {
    console.log('Server running on port', PORT ,'Senpai!')
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('~Connected to the database!~');
      })
      .catch((error) => {
        console.error('~Error connecting to the database:', error, '~');
      });
})