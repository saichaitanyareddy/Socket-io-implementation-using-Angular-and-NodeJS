const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');
const api=require('./server/routes/api');
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',api);

// app.use(express.static(path.join(__dirname,'dist/Authentication')));

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'dist/Authentication/index.html'));
// });

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    
    socket.on('msg',function(msg){
      
    	socket.broadcast.emit('msg', { msg: "Data has been changed"});
    })
    
});
// app.listen(3000,()=>{
//     console.log('server is running on port:3000');
// })