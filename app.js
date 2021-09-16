//IMPORT ALL DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var server = require('http').Server(app);
var io = require('socket.io')(server);
const dotenv = require("dotenv");
const path = require('path')
const bodyParser = require("body-parser");
const cors = require("cors")


//DOTENV CONFIGURATION
dotenv.config();


// view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname + '/public')));


//DEFINE BODY-PARSER AS JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.urlencoded({ urlextended: false }));
app.use(bodyParser.json());

var point_count_array = [];
var point_count = 0;


//IMPORT ROUTES
const routes = require("./routes/main.r");
app.use("/", routes);
app.get('/point_count', (req, res) => {
    // console.log('in array')
    res.send(point_count_array)
});

//CONNECTION WITH DATABASE
try {
    let db_path = process.env.db_url;
    if (!db_path) throw new Error();
    connectDB(db_path);
} catch (error) {
    console.log("Path undefined!." + error.message);
}

function connectDB(db_path) {
    mongoose.connect(db_path, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    var db = mongoose.connection;

    db.on("error", console.error.bind(console, "error occur in connectdb"));
    db.once("open", function callback() {
        console.log("connected with database successfully.");
    });
}

//CONNECTION WITH SERVER
try {
    let port = process.env.port;
    if (!port) throw new Error();
    connectServer(port);
} catch (error) {
    console.log("port undefined!." + error.message);
}

function connectServer(port) {
    server.listen(port, () => {
        console.log("server started at : " + port);
    });
}


// socket
var numClients = 0;

const qModel = require('./models/question.m');
const uModel = require('./models/user.m');
const qLeaderModel = require("./models/qleader.m");
const { findOneAndUpdate } = require("./models/question.m");
const qleaderM = require("./models/qleader.m");
const { use } = require("./routes/question.r");

// const controll = async (ws, socket, message) => {
//     console.log("mes" + message.message);
//     const Qs = await qModel.find();
//     return socket.send({Qs:Qs});
// }

const activeUsers = new Set();
let answered_user = 0;
let option = {
    q0: 0,
    q1: 0,
    q2: 0,
    q3: 0
}
var live_point = 0;
var tot_question_point = 0;
var lTime
io.on('connection', async function (socket) {
    numClients++;
    
    io.sockets.emit('client',  numClients);
    console.log("user size ------------",  numClients)

    socket.on("new user", function (data) {
        socket.userId = data.userName;
        console.log("socket id> " + data.userName);
        activeUsers.add(data.userName);
        console.log("letime is at user regi"+ lTime)
        socket.emit('left time frontend', lTime)
        io.emit("active number", activeUsers.size);
    });

    let index = 0;
  
    let q = await qModel.find().sort({ _id: -1 });

    socket.on("start game", async function (data) {
        // console.log("start");
        answered_user = 0;
        point_count = 0;
        tot_question_point = 0;
        point_count_array = [];
        option = {
            q0: 0,
            q1: 0,
            q2: 0,
            q3: 0
        }
        live_point = 2 * activeUsers.size;
        tot_question_point += live_point;
        // console.log(live_point);
        await qModel.findByIdAndUpdate(q[index]._id, { point: live_point });
        // io.emit('game status', { game_status: true });
        // console.log(index, q.length)
        io.emit('question', { q: q[index], index: index, length: q.length });
    });
    //i io send all
    // socket send 
    socket.on('next', async function (data) {
        point_count = 0;
        point_count_array = [];
        // console.log("in next");
        answered_user = 0;
        option = {
            q0: 0,
            q1: 0,
            q2: 0,
            q3: 0
        }
        live_point = 2 * activeUsers.size;
        tot_question_point += live_point;
        // console.log(live_point);
        console.log("next error: " + data.index)
        await qModel.findByIdAndUpdate(q[data.index]._id, { point: live_point });
        io.emit('question', { q: q[data.index], index: data.index, length: q.length });
    });

    socket.on('user add', function (message) {
        // console.log('socker msg: ' + message.message);
    })
    socket.on('left time', function (data) {
        console.log(data)
        lTime = data.time
    
        // io.emit('left time frontend', {time : data.time})
    })
    console.log("ltime is"+ lTime)

    socket.on('early user', function(data){
    console.log("called in early user")
        io.emit('early user frontend', {time : data.time})
    })
    // socket.emit('')
    // console.log("au: " + answered_user);

    socket.on('option click', async function (data) {
        answered_user++;
        // console.log(answered_user);
        if (typeof data.option == 'object') {
            data.option.forEach((ele) => {
                option[ele] += 1;
            })
        } else {
            option[data.option] += 1;
        }
        io.emit('option count', { answered_user: answered_user, option_click: option });
    });

    var user_point;
    socket.on('add point', async function (data) {
        // console.log(point_count);
        // console.log(`point: ${data.point} for user: ${data.userId} .`);
        // console.log("poiint " + data.point);
        // console.log(typeof data.point);
        // user_point = data.point - (point_count*0.5);
        // console.log("user_point: " + user_point);
        console.log('in user point');
        point_count++;
        point_count_array.push(data.userId);
        // await uModel.findByIdAndUpdate(data.userId, { $inc: { point: user_point } })
        let user = await uModel.findById(data.userId);

        // console.log('user point: ' + user.point);
        // user.point = user.point +  user_point;
        console.log('user_previous_point: ', user.point, "right & wrong ", data.right, data.wrong);
        if(data.right){
            console.log('right answer')
            user.point += (live_point - point_count_array.indexOf(data.userId));
            console.log(" user.point: ", user.point, " minus point: ", (live_point - point_count_array.indexOf(data.userId)));
            user.right += 1;
        }
        else{ 
            console.log('wrong answrer');
            user.wrong += 1;
        }
        // console.log('user point after update: ' + user.point);
        await user.save();
    });

    socket.on('index', function (data) {
        io.emit('index admin', { index: data.index });
    })
    socket.on('leaderboard', async function (data) {
        console.log("in hello")
        console.log(data)
        let user = await uModel.find({}).sort({ point: -1 });
        io.emit('get score', { users: user, index: data.index });
    });

    socket.on('rank', async function (data) {
        // console.log("in rank: " + data.rank + "for" + data.userId);
        let user = await uModel.findOneAndUpdate({ _id: data.userId} , {$set : {rank : data.rank }});
        console.log('rank: ' + data.rank + " for user: " + user.name);
        // socket.emit('get rank', { rank: user.rank });
        // await uModel.findByIdAndUpdate(data.userId, { rank: data.rank });
    });

    socket.on('game end', async function(data){
        console.log('in game end');
        let user = await uModel.findById(data.userId);
        let user_count = await uModel.find().count();
        socket.emit('end part', { user: user, tot_question_point: tot_question_point, tot_user: user_count });
    });
    // let Qs= await qModel.find();
    // io.emit("question", { Q : Qs});
    socket.on('disconnect', function () {
        numClients--;
        activeUsers.delete(socket.userId);
    io.sockets.emit('client',  numClients);

        io.emit('user disconnected', socket.userId);

        // console.log('connect: ', numClients);
    })
});