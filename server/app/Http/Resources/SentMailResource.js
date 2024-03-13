const UserResource = require('./../Resources/UserResource');

const Response = async (req = null, data) => {
    const base_url = req.protocol + '://' + req.get('host');

    const created_at = data.created_at
        ? new Date(data.created_at).toLocaleString()
        : null;

    const attachments_array = data.attachments || null;
    const attachments = attachments_array.map(filename => {
        return `${base_url}/attachment_files/${filename}`;
    });

    return {
        _id: data.id || null,
        subject: data.subject || null,
        body: data.body || null,
        attachments: attachments,
        is_starred: (data.is_starred) ? true : false,
        is_important: (data.is_important) ? true : false,
        label: data.label || null,
        created_at: data.created_at || null,
        updated_at: data.updated_at || null,
        sent_users: (data.received_mails) ? (await Promise.all(data.received_mails.map(async (received_mail) => {
            return {
                _id: received_mail.recipient_id._id,
                name: received_mail.recipient_id.name,
                username: received_mail.recipient_id.username,
                profile_image: (received_mail.recipient_id.profile_image) ? `${base_url}/images/users/${received_mail.recipient_id.profile_image}` : `${base_url}/images/avator.png`,
                read_at: (received_mail.recipient_id.read_at) ? (new Date(received_mail.recipient_id.read_at).toLocaleString()) : null 
            }
        }))) : []
    };
}

module.exports = {
    Response
};
