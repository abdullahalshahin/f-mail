const mongoose = require('mongoose');

const sentMailSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    received_mails: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'ReceivedMail' 
    }],
    subject: {
        type: String, minlength: 1, maxlength: 150, required: true
    },
    body: {
        type: String, required: false
    },
    attachments: {
        type: [String], default: []
    },
    is_starred: {
        type: Boolean, default: false
    },
    is_important: {
        type: Boolean, default: false
    },
    is_draft: {
        type: Boolean, default: false
    },
    label: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SentMailLabel', default: null
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

const SentMail = mongoose.model('SentMail', sentMailSchema);

module.exports = SentMail;
