let express = require('express')
let cors = require('cors')
let app = express()
const auth = require('./server/routes/auth')
const pharmacy = require('./server/routes/Pharmacy')
const chatBox = require('./server/routes/chatBox')
app.use(express.json())
app.use(cors())

const server = require('http').Server(app);

const io = require('socket.io')(server, {origins: '*:*'});

app.io = io;

let mongoose = require('mongoose')
let mongoDB = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use('/auth', auth)
app.use('/pharmacy', pharmacy)
app.use('/chatBox', chatBox)
server.listen(process.env.PORT, function () {
    console.log('Express server listening on port ' + process.env.PORT)
  })