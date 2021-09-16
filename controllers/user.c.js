const uModel = require("../models/user.m");
const { use } = require("../routes/question.r");

const getUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const getAll = async (req, res) => {
    try {
        let user = await uModel.find().sort({point : -1})
        res.render('user', {users: user})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const addUser = async (req, res) => {
    try {
        console.log(req.body.mobile_number);
        let user = await uModel.find({ mobile_number: req.body.mobile_number });
        console.log(user);
        if (user.length > 0) {
            res.send({ status: false, message: 'mobile_number already use.' });
        } else {
            var newuser = new uModel(req.body);

            await newuser.save((err, docs) => {
                if(err) throw new Error(err.message);
                if(docs) {
                    res.send({ status: true, user:docs });
                } else{
                    res.send({ status: true, user: "else" });
                }
            });
        }
    } catch (error) {
        res.status(500).send("error" + error.messsage);
    }
}

const updateUser = async (req, res) => {
    try {

    } catch (error) {

    }
}

const deleteUser = async (req, res) => {
    try {
        for(var key in req.body){
            items = req.body[key]
        }

        await uModel.deleteMany({ _id: { $in: items } }, function (err, data) {
            if (err) throw err;
            res.json(data)
        })
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}
const deleteAll = async (req, res) => {
    try {
        let docs = await uModel.remove();

        res.send(docs);
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}

module.exports = {
    getUser,
    getAll,
    addUser,
    updateUser,
    deleteUser,
    deleteAll
}