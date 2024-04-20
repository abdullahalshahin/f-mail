import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './views/Landing';
import NotFound from './views/NotFound';
import TermsAndConditions from './views/TermsAndConditions';
import Login from './views/user_panel/auth/Login';
import Registration from './views/user_panel/auth/Registration';
import ForgetPassword from './views/user_panel/auth/ForgetPassword';
import DraftIndex from './views/user_panel/dashboard/Draft/Index';
import ImportantIndex from './views/user_panel/dashboard/important/Index';
import MyAccountIndex from './views/user_panel/dashboard/my_account/Index';
import InboxIndex from './views/user_panel/dashboard/Inbox/Index';
import InboxShow from './views/user_panel/dashboard/Inbox/Show';
import SentMailCreate from './views/user_panel/dashboard/sent_mail/Create';
import SentMailIndex from './views/user_panel/dashboard/sent_mail/Index';
import SentMailShow from './views/user_panel/dashboard/sent_mail/Show';
import SpamIndex from './views/user_panel/dashboard/spam/Index';
import StarredIndex from './views/user_panel/dashboard/starred/Index';
import TrashIndex from './views/user_panel/dashboard/trash/Index';

class AppRoutes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null 
        };

    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="*" element={<NotFound />} />

                    {/* USER AUTH */}
                    <Route path="/user-panel/dashboard/login" element={<Login />} />
                    <Route path="/user-panel/dashboard/registration" element={<Registration />} />
                    <Route path="/user-panel/dashboard/forget-password" element={<ForgetPassword />} />

                    {/* Private Routes */}
                    {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                        (
                            <>
                                <Route path="/user-panel/dashboard" element={<InboxIndex />} />
                                <Route path="/user-panel/dashboard/received-mails/:mail_id/show" element={<InboxShow />} />
                                <Route path="/user-panel/dashboard/draft" element={<DraftIndex />} />
                                <Route path="/user-panel/dashboard/important" element={<ImportantIndex />} />
                                <Route path="/user-panel/dashboard/my-account" element={<MyAccountIndex />} />
                                <Route path="/user-panel/dashboard/sent-mail-create" element={<SentMailCreate />} />
                                <Route path="/user-panel/dashboard/sent-mail" element={<SentMailIndex />} />
                                <Route path="/user-panel/dashboard/sent-mails/:mail_id/show" element={<SentMailShow />} />
                                <Route path="/user-panel/dashboard/spam" element={<SpamIndex />} />
                                <Route path="/user-panel/dashboard/starred" element={<StarredIndex />} />
                                <Route path="/user-panel/dashboard/trash" element={<TrashIndex />} />
                            </>
                        ) 
                        : (
                            <Route path="/user-panel/dashboard/*" element={<Navigate to="/user-panel/dashboard/login" replace />} />
                        )
                    }
                </Routes>
            </Router>
        );
    };
};

export default AppRoutes;
