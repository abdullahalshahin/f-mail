const SentMailModel = require('./../../../Models/SentMail');
const ReceivedMailModel = require('./../../../Models/ReceivedMail');

const starred = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const search_by = search_value ? { subject: { $regex: search_value, $options: 'i' } } : {};

        const starred_mails = await mail_query(req, search_by, 'is_starred', true);

        return res.status(200).json({
            success: true,
            message: 'Data successfully!!!',
            result: {
                mails: starred_mails
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const important = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const search_by = search_value ? { subject: { $regex: search_value, $options: 'i' } } : {};

        const starred_mails = await mail_query(req, search_by, 'is_important', true);

        return res.status(200).json({
            success: true,
            message: 'Data successfully!!!',
            result: {
                mails: starred_mails
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const trash = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const search_by = search_value ? { subject: { $regex: search_value, $options: 'i' } } : {};

        const sent_mail_query = await SentMailModel.find({ ...search_by, is_draft: false, sender_id: req.AuthUser._id, is_trash: true, deleted_at: null })
            .populate({
                path: 'received_mails',
                populate: {
                    path: 'recipient_id',
                    model: 'User'
                }
            });

        const sent_mails = await Promise.all(sent_mail_query.map(async (sent_mail) => {
            const updated_at = sent_mail.updated_at
                ? new Date(sent_mail.updated_at).toLocaleString()
                : "";

            return {
                id: sent_mail._id,
                subject: sent_mail.subject || null,
                body: sent_mail.body || null,
                users: (sent_mail.received_mails) ? (await Promise.all(sent_mail.received_mails.map(async (received_mail) => {
                    return received_mail.recipient_id.name;
                }))) : [],
                type: "sent",
                updated_at: updated_at
            };
        }));

        const received_mail_query = await ReceivedMailModel.find({ ...search_by, is_draft: false, recipient_id: req.AuthUser._id, is_spam: false, is_trash: true, deleted_at: null })
            .populate({
                path: 'sent_mail_id',
                populate: {
                    path: 'sender_id',
                    model: 'User'
                }
            });

        const received_mails = await Promise.all(received_mail_query.map(async (received_mail) => {
            const updated_at = received_mail.updated_at
                ? new Date(received_mail.updated_at).toLocaleString()
                : "";

            return {
                id: received_mail._id,
                subject: received_mail.subject || null,
                body: received_mail.body || null,
                users: ["Me"],
                type: "received",
                updated_at: updated_at
            };
        }));

        const allMails = [...sent_mails, ...received_mails];

        const mails = allMails.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            
            return dateA - dateB;
        });

        return res.status(200).json({
            success: true,
            message: 'Data successfully!!!',
            result: {
                trash_mails: mails
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const mail_query = async (req, search_by, key, value) => {
    try {
        const sent_mail_query = await SentMailModel.find({ ...search_by, is_draft: false, sender_id: req.AuthUser._id, [key]: value, is_trash: false, deleted_at: null })
            .populate({
                path: 'received_mails',
                populate: {
                    path: 'recipient_id',
                    model: 'User'
                }
            });

        const sent_mails = await Promise.all(sent_mail_query.map(async (sent_mail) => {
            const updated_at = sent_mail.updated_at
                ? new Date(sent_mail.updated_at).toLocaleString()
                : "";

            return {
                id: sent_mail._id,
                subject: sent_mail.subject || null,
                body: sent_mail.body || null,
                users: (sent_mail.received_mails) ? (await Promise.all(sent_mail.received_mails.map(async (received_mail) => {
                    return received_mail.recipient_id.name;
                }))) : [],
                type: "sent",
                updated_at: updated_at
            };
        }));

        const received_mail_query = await ReceivedMailModel.find({ ...search_by, is_draft: false, recipient_id: req.AuthUser._id, [key]: value, is_spam: false, is_trash: false, deleted_at: null })
            .populate({
                path: 'sent_mail_id',
                populate: {
                    path: 'sender_id',
                    model: 'User'
                }
            });

        const received_mails = await Promise.all(received_mail_query.map(async (received_mail) => {
            const updated_at = received_mail.updated_at
                ? new Date(received_mail.updated_at).toLocaleString()
                : "";

            return {
                id: received_mail._id,
                subject: received_mail.subject || null,
                body: received_mail.body || null,
                users: ["Me"],
                type: "received",
                updated_at: updated_at
            };
        }));

        const allMails = [...sent_mails, ...received_mails];

        const mails = allMails.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            
            return dateA - dateB;
        });

        return mails;
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    starred,
    important,
    trash
}