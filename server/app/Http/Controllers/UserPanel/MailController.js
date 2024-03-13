const SentMailModel = require('./../../../Models/SentMail');
const ReceivedMailModel = require('./../../../Models/ReceivedMail');

const starred = async (req, res) => {
    try {
        //
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const important = async (req, res) => {
    try {
        //
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const trash = async (req, res) => {
    try {
        //
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    starred,
    important,
    trash
}