var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const mqtt = require('mqtt')
const path = require('path');

const client = mqtt.connect('mqtt://192.168.0.108:1883')

var app = express();
var Port = process.env.PORT || 3000;

app.use(cors());

app.listen(Port);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '/home.html'));
});

app.get('/cmd', (req, res)=>{
  if(req.query.cmd == 'doorLock'){
    client.publish('/doorLock', "a")
    console.log("sent")
  }
  else {
    console.log("response received: " + req.query.cmd)
  }
  res.sendStatus(200);
})

client.on('connect', () => {
    // client.publish('hello', "Hi there")
    console.log("mqtt connected")
})

