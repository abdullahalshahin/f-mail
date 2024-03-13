const express = require('express');
const authenticatedUserMiddleware = require('../app/Http/Middleware/AuthenticatedUser');
const DashboardController = require('./../app/Http/Controllers/UserPanel/DashboardController');
const MailController = require('./../app/Http/Controllers/UserPanel/MailController');
const SentMailController = require('./../app/Http/Controllers/UserPanel/SentMailController');
const ReceivedMailController = require('./../app/Http/Controllers/UserPanel/ReceivedMailController');
const MyAccountController = require('./../app/Http/Controllers/UserPanel/MyAccountController');

const Route = express.Router();

Route.get('/user-panel/dashboard/', authenticatedUserMiddleware, DashboardController.index);

Route.get('/user-panel/dashboard/sent-mails/index', authenticatedUserMiddleware, SentMailController.index);
Route.get('/user-panel/dashboard/sent-mails/draft', authenticatedUserMiddleware, SentMailController.draft);
Route.get('/user-panel/dashboard/sent-mails/:mail_id/draft-to-mail', authenticatedUserMiddleware, SentMailController.draft_to_mail);
Route.get('/user-panel/dashboard/sent-mails/:mail_id/show', authenticatedUserMiddleware, SentMailController.show);
Route.get('/user-panel/dashboard/sent-mails/create', authenticatedUserMiddleware, SentMailController.create);
Route.post('/user-panel/dashboard/sent-mails/sent', authenticatedUserMiddleware, SentMailController.sent);

Route.get('/user-panel/dashboard/received-mails/index', authenticatedUserMiddleware, ReceivedMailController.index);
Route.get('/user-panel/dashboard/received-mails/:mail_id/show', authenticatedUserMiddleware, ReceivedMailController.show);

// Route.get('/user-panel/dashboard/mails/starred', authenticatedUserMiddleware, MailController.starred);
// Route.get('/user-panel/dashboard/mails/important', authenticatedUserMiddleware, MailController.important);
// Route.get('/user-panel/dashboard/mails/trash', authenticatedUserMiddleware, MailController.trash);

Route.post('/user-panel/dashboard/sent-mails/:mail_id/mark-as-starred', authenticatedUserMiddleware, SentMailController.mark_as_starred);
Route.post('/user-panel/dashboard/sent-mails/:mail_id/unmark-as-starred', authenticatedUserMiddleware, SentMailController.unmark_as_starred);
Route.post('/user-panel/dashboard/received-mails/:mail_id/mark-as-starred', authenticatedUserMiddleware, ReceivedMailController.mark_as_starred);
Route.post('/user-panel/dashboard/received-mails/:mail_id/unmark-as-starred', authenticatedUserMiddleware, ReceivedMailController.unmark_as_starred);

Route.post('/user-panel/dashboard/sent-mails/:mail_id/mark-as-important', authenticatedUserMiddleware, SentMailController.mark_as_important);
Route.post('/user-panel/dashboard/sent-mails/:mail_id/unmark-as-important', authenticatedUserMiddleware, SentMailController.unmark_as_important);
// Route.post('/user-panel/dashboard/received-mails/:mail_id/mark-as-important', authenticatedUserMiddleware, ReceivedMailController.mark_as_important);
// Route.post('/user-panel/dashboard/received-mails/:mail_id/unmark-as-important', authenticatedUserMiddleware, ReceivedMailController.unmark_as_important);

// Route.get('/user-panel/dashboard/received-mails/spam', authenticatedUserMiddleware, ReceivedMailController.spam);
// Route.post('/user-panel/dashboard/received-mails/:mail_id/move-to-spam', authenticatedUserMiddleware, ReceivedMailController.move_to_spam);
// Route.post('/user-panel/dashboard/received-mails/:mail_id/move-to-received-mails', authenticatedUserMiddleware, ReceivedMailController.move_to_received_mails);

Route.post('/user-panel/dashboard/sent-mails/:mail_id/move-to-trash', authenticatedUserMiddleware, SentMailController.move_to_trash);
Route.post('/user-panel/dashboard/sent-mails/:mail_id/move-to-sent-mail-from-trash', authenticatedUserMiddleware, SentMailController.move_to_sent_mails);
Route.post('/user-panel/dashboard/sent-mails/:mail_id/permanently-delete-from-trash', authenticatedUserMiddleware, SentMailController.permanently_delete_from_trash);
// Route.post('/user-panel/dashboard/received-mails/:mail_id/move-to-trash', authenticatedUserMiddleware, ReceivedMailController.move_to_trash);
// Route.post('/user-panel/dashboard/received-mails/:mail_id/move-to-received-mail-from-trash', authenticatedUserMiddleware, ReceivedMailController.move_to_sent_mails);
// Route.post('/user-panel/dashboard/received-mails/:mail_id/permanently-delete-from-trash', authenticatedUserMiddleware, ReceivedMailController.permanently_delete_from_trash);

Route.get('/user-panel/dashboard/my-account', authenticatedUserMiddleware, MyAccountController.index);
Route.post('/user-panel/dashboard/my-account-update', authenticatedUserMiddleware, MyAccountController.update);

module.exports = {
	routes: Route
}
