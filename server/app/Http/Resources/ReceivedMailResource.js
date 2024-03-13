const UserResource = require('./../Resources/UserResource');

const Response = async (req = null, data) => {
    const base_url = req.protocol + '://' + req.get('host');

    const created_at = data.created_at
        ? new Date(data.created_at).toLocaleString()
        : "";

    const attachments_array = (data.sent_mail_id) ? (data.sent_mail_id.attachments || null) : null;
    const attachments = attachments_array.map(filename => {
        return `${base_url}/attachment_files/${filename}`;
    });

    const sender = ((data.sent_mail_id) && (data.sent_mail_id.sender_id)) ? data.sent_mail_id.sender_id : null;

    return {
        id: data._id,
        subject: data.subject || null,
        body: data.body || null,
        attachments: attachments,
        read_at: data.read_at || null,
        is_starred: (data.is_starred) ? true : false,
        is_important: (data.is_important) ? true : false,
        label: data.label || null,
        created_at: data.created_at || null,
        updated_at: data.updated_at || null,
        sender_info: (sender) ? UserResource.Response(req, sender) : null,
    };
}

module.exports = {
    Response
};
