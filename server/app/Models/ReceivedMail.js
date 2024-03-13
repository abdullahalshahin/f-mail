const mongoose = require('mongoose');

const receivedMailSchema = new mongoose.Schema({
    recipient_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    sent_mail_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SentMail', required: true
    },
    subject: {
        type: String, minlength: 1, maxlength: 150, required: true
    },
    body: {
        type: String, required: false
    },
    read_at: {
        type: Date, default: null
    },
    is_starred: {
        type: Boolean, default: false
    },
    is_important: {
        type: Boolean, default: false
    },
    is_spam: {
        type: Boolean, default: false
    },
    is_draft: {
        type: Boolean, default: false
    },
    label: {
        type: mongoose.Schema.Types.ObjectId, ref: 'ReceivedMailLabel', default: null
    },
    is_trash: {
        type: Boolean, default: false
    },
    created_at: {
        type: Date, default: Date.now
    },
    updated_at: {
        type: Date, default: null
    },
    deleted_at: {
        type: Date, default: null
    }
});

const ReceivedMail = mongoose.model('ReceivedMail', receivedMailSchema);

module.exports = ReceivedMail;
