const mongoose = require('mongoose');

const sentMailLabelSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }
});

const SentMailLabel = mongoose.model('SentMailLabel', sentMailLabelSchema);

module.exports = SentMailLabel;
