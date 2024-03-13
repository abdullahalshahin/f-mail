const mongoose = require('mongoose');

const receivedMailLabelSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }
});

const ReceivedMailLabel = mongoose.model('ReceivedMailLabel', receivedMailLabelSchema);

module.exports = ReceivedMailLabel;
