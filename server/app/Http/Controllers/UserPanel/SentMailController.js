const joi = require('joi');
const UserModel = require('./../../../Models/User');
const SentMailModel = require('./../../../Models/SentMail');
const ReceivedMailModel = require('./../../../Models/ReceivedMail');
const SentMailResource = require('./../../Resources/SentMailResource');
const UserResource = require('./../../Resources/UserResource');

const index = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const per_page = parseInt(req.query.per_page) || 10;
        const page = parseInt(req.query.page) || 1;
        const order_column = req.query.order_column || "id";
        const order_type = req.query.order_type || "asc";

        const searchQuery = search_value ? { subject: { $regex: search_value, $options: 'i' } } : {};
        const totalCount = await SentMailModel.countDocuments({ ...searchQuery, is_draft: false, sender_id: req.AuthUser._id, is_trash: false, deleted_at: null });
        
        const mail_query = await SentMailModel.find({ ...searchQuery, is_draft: false, sender_id: req.AuthUser._id, is_trash: false, deleted_at: null })
            .sort({ [order_column]: order_type })
            .skip((page - 1) * per_page)
            .limit(per_page)
            .populate({
                path: 'received_mails',
                populate: {
                    path: 'recipient_id',
                    model: 'User'
                }
            });

        const mails = await Promise.all(mail_query.map(async (mail) => {
            return SentMailResource.Response(req, mail);
        }));

        const pagination = {
            total_items: totalCount,
            per_page: per_page,
            current_page: page,
            last_page: Math.ceil(totalCount / per_page),
            from: (page - 1) * per_page + 1,
            to: Math.min(page * per_page, totalCount)
        };

        res.status(200).json({
            success: true,
            message: 'Data successfully!!!',
            result: {
                mails: mails,
                pagination: pagination
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const draft = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const per_page = parseInt(req.query.per_page) || 10;
        const page = parseInt(req.query.page) || 1;
        const order_column = req.query.order_column || "id";
        const order_type = req.query.order_type || "asc";

        const searchQuery = search_value ? { subject: { $regex: search_value, $options: 'i' } } : {};
        const totalCount = await SentMailModel.countDocuments({ ...searchQuery, is_draft: true, sender_id: req.AuthUser._id, is_trash: false, deleted_at: null });
        
        const mail_query = await SentMailModel.find({ ...searchQuery, is_draft: true, sender_id: req.AuthUser._id, is_trash: false, deleted_at: null })
            .sort({ [order_column]: order_type })
            .skip((page - 1) * per_page)
            .limit(per_page)
            .populate({
                path: 'received_mails',
                populate: {
                    path: 'recipient_id',
                    model: 'User'
                }
            });

        const mails = await Promise.all(mail_query.map(async (mail) => {
            return SentMailResource.Response(req, mail);
        }));

        const pagination = {
            total_items: totalCount,
            per_page: per_page,
            current_page: page,
            last_page: Math.ceil(totalCount / per_page),
            from: (page - 1) * per_page + 1,
            to: Math.min(page * per_page, totalCount)
        };

        res.status(200).json({
            success: true,
            message: 'Data successfully!!!',
            result: {
                mails: mails,
                pagination: pagination
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const draft_to_mail = async (req, res) => {
    try {
        const mail_query = await SentMailModel.findById(req.params.mail_id)
            .populate({
                path: 'received_mails',
                populate: {
                    path: 'recipient_id',
                    model: 'User'
                }
            });

        if (mail_query && (mail_query.sender_id.toString() == req.AuthUser._id.toString()) && (mail_query.is_trash == false) && (mail_query.deleted_at == null)) {
            mail_query.is_draft = false;
            mail_query.updated_at = Date.now();
            await mail_query.save();

            await ReceivedMailModel.updateMany({ sent_mail_id: req.params.mail_id }, { is_draft: false,  updated_at: Date.now()});

            const mail = await SentMailResource.Response(req, mail_query);

            return res.status(200).json({
                success: true,
                message: 'Sent successfully!!!',
                result: {
                    mail: mail
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Not Found!!!',
                result: {
                    mail: null
                }
            });
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const show = async (req, res) => {
    try {
        const mail_query = await SentMailModel.findById(req.params.mail_id)
            .populate({
                path: 'received_mails',
                populate: {
                    path: 'recipient_id',
                    model: 'User'
                }
            });

        if (mail_query && (mail_query.sender_id.toString() == req.AuthUser._id.toString()) && (mail_query.is_trash == false) && (mail_query.deleted_at == null)) {
            const mail = await SentMailResource.Response(req, mail_query);

            return res.status(200).json({
                success: true,
                message: 'Show successfully!!!',
                result: {
                    mail: mail
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Not Found!!!',
                result: {
                    mail: null
                }
            });
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const create = async (req, res) => {
    try {
        const user_query = await UserModel.find();

        const users = await Promise.all(user_query.map(async (user) => {
            return {
                id: user._id || null,
                name: user.name || null,
                username: user.username || null,
            }
        }));

        const dynamic_variables = [
            "{full_name}", "{date_of_birth}", "{phone_number}", "{mail}"
        ];

        return res.status(200).json({
            success: true,
            message: 'Show successfully!!!',
            result: {
                users,
                dynamic_variables,
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const search_users = async (req, res) => {
    try {
        const search_value = req.query.search || null;

        const user_query = await UserModel.find({
            $or: [
                { name: { $regex: new RegExp(search_value, "i") } },
                { username: { $regex: new RegExp(search_value, "i") } }
            ]
        });

        const users = await Promise.all(user_query.map(async (user) => {
            return {
                id: user._id || null,
                name: user.name || null,
                username: user.username || null,
            }
        }));

        return res.status(200).json({
            success: true,
            message: 'Show successfully!!!',
            result: {
                users
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const sent = async (req, res) => {
    try {
        const schema = joi.object({
            recipient_ids: joi.array().items(joi.string()).required(),
            subject: joi.string().min(5).max(150).required(),
            body: joi.string().allow('').optional(),
            attachments: joi.array().items(joi.string()).optional(),
            is_draft: joi.boolean().required().valid(true, false)
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!!!',
                errors: error.details.map(err => err.message) 
            });
        }

        const { recipient_ids, subject, body, attachments, is_draft } = value;

        const sentMail = new SentMailModel({
            sender_id: req.AuthUser._id,
            subject: subject,
            body: body,
            attachments: attachments,
            is_starred: false,
            is_important: false,
            is_draft: is_draft,
            is_trash: false,
            updated_at: Date.now()
        });

        await sentMail.save();

        for (const recipient_id of recipient_ids) {
            const recipient_user = await UserModel.findById(recipient_id);

            if (recipient_user) {
                console.log(recipient_user);
                let customized_body = body
                    .replace("{full_name}", recipient_user.name ?? "")
                    .replace("{date_of_birth}", recipient_user.date_of_birth ?? "")
                    .replace("{phone_number}", recipient_user.phone_number ?? "")
                    .replace("{mail}", recipient_user.username ?? "");

                const receivedMail = new ReceivedMailModel({
                    recipient_id: recipient_user._id,
                    sent_mail_id: sentMail._id,
                    subject: subject,
                    body: customized_body,
                    read_at: null,
                    is_starred: false,
                    is_important: false,
                    is_spam: false,
                    updated_at: (is_draft == false) ? Date.now() : null,
                    is_draft: is_draft
                });
    
                await receivedMail.save();

                sentMail.received_mails.push(receivedMail._id);
            }

            await sentMail.save();
        }

        return res.status(200).json({
            success: true,
            message: "Sent Successfully!!!"
        })
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const mark_as_starred = async (req, res) => {
    try {
        const updated_result = await update_sent_mail_single_data(req, 'is_starred', true);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const unmark_as_starred = async (req, res) => {
    try {
        const updated_result = await update_sent_mail_single_data(req, 'is_starred', false);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const mark_as_important = async (req, res) => {
    try {
        const updated_result = await update_sent_mail_single_data(req, 'is_important', true);
        
        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const unmark_as_important = async (req, res) => {
    try {
        const updated_result = await update_sent_mail_single_data(req, 'is_important', false);
        
        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const move_to_trash = async (req, res) => {
    try {
        const updated_result = await update_sent_mail_single_data(req, 'is_trash', true);
        
        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const move_to_sent_mails = async (req, res) => {
    try {
        const updated_result = await update_sent_mail_single_data(req, 'is_trash', false);
        
        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const permanently_delete_from_trash = async (req, res) => {
    try {
        const updated_result = await update_sent_mail_single_data(req, 'deleted_at', Date.now());
        
        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const update_sent_mail_single_data = async (req, key, value) => {
    try {
        const mail_query = await SentMailModel.findById(req.params.mail_id)
            .populate({
                path: 'received_mails',
                populate: {
                    path: 'recipient_id',
                    model: 'User'
                }
            });

        if (mail_query && (mail_query.sender_id.toString() == req.AuthUser._id.toString())) {
            mail_query[key] = value;
            await mail_query.save();

            const mail = await SentMailResource.Response(req, mail_query);

            return {
                success: true,
                message: 'Updated successfully!!!',
                result: {
                    mail: mail
                }
            };
        } else {
            return {
                success: false,
                message: 'Not Found!!!',
                result: {
                    mail: null
                }
            };
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    index,
    draft,
    draft_to_mail,
    show,
    create,
    search_users,
    sent,
    mark_as_starred,
    unmark_as_starred,
    mark_as_important,
    unmark_as_important,
    move_to_trash,
    move_to_sent_mails,
    permanently_delete_from_trash
};
