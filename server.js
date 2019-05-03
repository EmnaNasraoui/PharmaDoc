let express = require('express')
let cors = require('cors')
let app = express()
const auth = require('./server/routes/auth')
const socketIO = require('socket.io');
const path = require('path');
const pharmacy = require('./server/routes/Pharmacy')
const Doctor = require('./server/routes/doctor')
const chatBox = require('./server/routes/chatBox')
const patient = require('./server/routes/patient')
const multer = require("multer");
const passport = require('./server/passport/passport')
app.use(express.json())
app.use(cors())
var http = require('http');


const server = http.createServer(app);
const io = socketIO(server);

app.set('io', io);
app.use(express.static(path.join(__dirname, 'dist')));

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
app.use('/doctor', Doctor)
app.use('/chatBox', chatBox)
app.use('/patient',patient)
server.listen(process.env.PORT, function () {
  console.log('Express server listening on port ' + process.env.PORT)
})

app.get('/user/image/:name', async (req, res) => {
    res.sendFile('C:\\Users\\emna\\Desktop\\PharmaDoc\\PharmaDoc\\server\\uploads\\'+ req.params.name)
 });
