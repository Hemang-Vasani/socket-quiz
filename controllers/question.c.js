const qModel = require("../models/question.m");

const getQuestion = async (req, res) => {
    try {
        let Qs = await qModel.find();

        if (!Qs) res.status(404).json({});

        res.status(200).send(Qs);
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}
const showQuestion = async (req, res) => {
    try {
        let Qs = await qModel.find()

        if (!Qs) res.status(404).json({}).sort({_id : -1});

        res.status(200).render('adminQ', {ques : Qs});
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}
const addQuestion = async (req, res) => {
    try {
        let newQ = new qModel(req.body);
        newQ.alternatives.push({ text: req.body.optionA })
        newQ.alternatives.push({ text: req.body.optionB })
        newQ.alternatives.push({ text: req.body.optionC })
        newQ.alternatives.push({ text: req.body.optionD })

        await newQ.save();

        res.status(200).redirect('/q/showQues')
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}

const updateQuestion = async (req, res) => {
    try {

    } catch (error) {
        res.status(401).send(error.messsage);
    }
}

const deleteQuestion = async (req, res) => {
    try {
        var items = []
        for(var key in req.body){
            items = req.body[key]
        }
        await qModel.deleteMany({ _id: { $in: items } }, function (err, data) {
            if (err) throw err;
            res.json(data)
        })
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}

const deleteAll = async (req, res) => {
    try {
        let docs = await qModel.remove();

        res.send(docs);
    } catch (error) {
        res.status(401).send(error.messsage);
    }
}

module.exports = {
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    deleteAll,
    showQuestion
}