const ReceivedMailModel = require('./../../../Models/ReceivedMail');
const ReceivedMailResource = require('./../../Resources/ReceivedMailResource');

const index = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const per_page = parseInt(req.query.per_page) || 10;
        const page = parseInt(req.query.page) || 1;
        const order_column = req.query.order_column || "updated_at";
        const order_type = req.query.order_type || "asc";

        const searchQuery = search_value ? { subject: { $regex: search_value, $options: 'i' } } : {};
        const totalCount = await ReceivedMailModel.countDocuments({ ...searchQuery, is_draft: false, recipient_id: req.AuthUser._id, is_spam: false, is_trash: false, deleted_at: null });
        
        const mail_query = await ReceivedMailModel.find({ ...searchQuery, is_draft: false, recipient_id: req.AuthUser._id, is_spam: false, is_trash: false, deleted_at: null })
            .sort({ [order_column]: order_type })
            .skip((page - 1) * per_page)
            .limit(per_page)
            .populate({
                path: 'sent_mail_id',
                populate: {
                    path: 'sender_id',
                    model: 'User'
                }
            });

        const mails = await Promise.all(mail_query.map(async (received_mail) => {
            return ReceivedMailResource.Response(req, received_mail);
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

const show = async (req, res) => {
    try {
        const mail_query = await ReceivedMailModel.findById(req.params.mail_id)
            .populate({
                path: 'sent_mail_id',
                populate: {
                    path: 'sender_id',
                    model: 'User'
                }
            });

        if (mail_query && (mail_query.recipient_id.toString() == req.AuthUser._id.toString()) && (mail_query.deleted_at == null)) {
            if (mail_query.read_at == null) {
                mail_query.read_at = Date.now();

                await mail_query.save();
            }

            const mail = await ReceivedMailResource.Response(req, mail_query);

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

const mark_as_starred = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_starred', true);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const unmark_as_starred = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_starred', false);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const mark_as_important = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_important', true);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const unmark_as_important = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_important', false);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const spam = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const per_page = parseInt(req.query.per_page) || 10;
        const page = parseInt(req.query.page) || 1;
        const order_column = req.query.order_column || "updated_at";
        const order_type = req.query.order_type || "asc";

        const searchQuery = search_value ? { subject: { $regex: search_value, $options: 'i' } } : {};
        const totalCount = await ReceivedMailModel.countDocuments({ ...searchQuery, is_draft: false, recipient_id: req.AuthUser._id, is_spam: true, is_trash: false, deleted_at: null });
        
        const mail_query = await ReceivedMailModel.find({ ...searchQuery, is_draft: false, recipient_id: req.AuthUser._id, is_spam: true, is_trash: false, deleted_at: null })
            .sort({ [order_column]: order_type })
            .skip((page - 1) * per_page)
            .limit(per_page)
            .populate({
                path: 'sent_mail_id',
                populate: {
                    path: 'sender_id',
                    model: 'User'
                }
            });

        const mails = await Promise.all(mail_query.map(async (received_mail) => {
            return ReceivedMailResource.Response(req, received_mail);
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

const move_to_spam = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_spam', true);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const move_to_received_mails_from_spam = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_spam', false);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const move_to_trash = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_trash', true);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const move_to_sent_mails_from_trash = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'is_trash', false);

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const permanently_delete_from_trash = async (req, res) => {
    try {
        const updated_result = await update_received_mail_single_data(req, 'deleted_at', Date.now());

        return res.status(200).json(updated_result);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const update_received_mail_single_data = async (req, key, value) => {
    try {
        const mail_query = await ReceivedMailModel.findById(req.params.mail_id)
            .populate({
                path: 'sent_mail_id',
                populate: {
                    path: 'sender_id',
                    model: 'User'
                }
            });

        if (mail_query && (mail_query.recipient_id.toString() == req.AuthUser._id.toString())) {
            mail_query[key] = value;

            await mail_query.save();

            const mail = await ReceivedMailResource.Response(req, mail_query);

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
    show,
    mark_as_starred,
    unmark_as_starred,
    mark_as_important,
    unmark_as_important,
    spam,
    move_to_spam,
    move_to_received_mails_from_spam,
    move_to_trash,
    move_to_sent_mails_from_trash,
    permanently_delete_from_trash
};
