const qModel = require("../models/question.m");
const uModel = require("../models/user.m");

const start = async (req, res) => {
    try {
        let Qs = await qModel.find();
        
        if (!Qs) res.status(404).json({});

        // res.status(200).send(Qs);
        res.render("home", { Qs : Qs})
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}

const start2 = async (req, res) => {
    try {
        let Qs = await qModel.find();
        if (!Qs) res.status(404).json({});
        
        res.render("home2", { Qs: Qs })
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}
const addQuestion = async (req, res) => {
    try {
        let newQ = new qModel(req.body);

        await newQ.save();

        if (!newQ) res.status(500).send("error in add");

        res.status(200).send(newQ);
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}
// 
const signup = async (req, res) => {
    try {
        console.log('in sign up');
        console.log(parseInt(req.body.mobile_number));
        let user = await uModel.find({ mobile_number: parseInt(req.body.mobile_number) });
        console.log(user.length);
        if(user.length > 0){
            res.send({ status: false, message: 'nickname already use.'});
        } else {
            var newuser = new uModel(req.body);
            await newuser.save((err, docs) => {
                if (err) throw new Error(err.message);
                if (docs) {
                    res.send({ status: true, user: docs });
                }
            });
        }
    } catch (error) {
        res.send("error" + error.messsage);
    }
}

const home = async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}
// leaderBoard
const leaderBoard = async (req, res) => {
    try {
        let docs = await uModel.find().sort({point : -1});

        res.send({docs: docs });
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}
const rank = async (req, res) => {
    try {
        let docs = await uModel.findById(req.body.userId);

        res.send({ rank: docs.rank });
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}

module.exports = {
    start,
    start2,
    signup,
    home,
    leaderBoard,
    rank
}