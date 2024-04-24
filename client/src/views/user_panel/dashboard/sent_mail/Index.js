import React, { Component } from 'react';
import Helpers from './../../../../utils/Helpers';
import AxiosAPI from './../../../../AxiosConfig';
import Topbar from './../../components/Topbar';
import LeftSidebar from './../../components/LeftSidebar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sent_mails: [],
            pagination: {},
        };
    }

    componentDidMount() {
        let title = `Sent Mail List | ${Helpers.appInfo().app_name}`;
        let meta_description = "Sent Mail List Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchSentMailData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchSentMailData () {
        AxiosAPI.get(`/api/user-panel/dashboard/sent-mails/index`)
        .then(response => {
            this.setState({
                sent_mails: response.data.result.mails,
                pagination: response.data.result.pagination,
            });
        })
        .catch(error => {
            this.setState({
                error: error,
            });
        });
    }

    handleStarred(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/mark-as-starred`)
            .then(response => {
                this.fetchSentMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleUnStarred(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/unmark-as-starred`)
            .then(response => {
                this.fetchSentMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleDelete(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/move-to-trash`)
            .then(response => {
                this.fetchSentMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleMarkAsImportant(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/mark-as-important`)
            .then(response => {
                this.fetchSentMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { sent_mails, pagination } = this.state;

        return (
            <div className="wrapper">
                <Topbar />

                <LeftSidebar />

                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><Link to={'/'}>F-Mail</Link></li>
                                                <li className="breadcrumb-item"><Link to={'/user-panel/dashboard'}>Dashboard</Link></li>
                                                <li className="breadcrumb-item active">Sent Mail List</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Sent Mail List</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="">
                                                <div className="mt-3">
                                                    <ul className="email-list">
                                                        {sent_mails.map(mail => (
                                                            <li key={mail._id}>
                                                                <div className="email-sender-info">
                                                                    <div className="checkbox-wrapper-mail">
                                                                    </div>

                                                                    {(mail.is_starred) ? 
                                                                        (
                                                                            <span className="star-toggle mdi mdi-star-outline text-warning" onClick={() => this.handleUnStarred(mail._id)}></span>
                                                                        ) : (
                                                                            <span className="star-toggle mdi mdi-star-outline" onClick={() => this.handleStarred(mail._id)}></span>
                                                                        )
                                                                    }
                                                                    
                                                                    <p className="email-title"><b>To:</b> {mail.sent_users.map(user => user.name).join(', ')}</p>
                                                                </div>

                                                                <div className="email-content">
                                                                    <Link to={`/user-panel/dashboard/sent-mails/${mail._id}/show`} className="email-subject">{mail.subject} &nbsp;&ndash;&nbsp;
                                                                        <span>{mail.body}</span>
                                                                    </Link>

                                                                    <div className="email-date">{new Date(mail.updated_at).toLocaleDateString()}</div>
                                                                </div>

                                                                <div className="email-action-icons">
                                                                    <ul className="list-inline">
                                                                        <li className="list-inline-item">
                                                                            <button className='btn p-0' onClick={() => this.handleDelete(mail._id)}><i className="mdi mdi-delete email-action-icons-item"></i></button>
                                                                        </li>
                                                                        
                                                                        {(mail.is_important) ? (
                                                                            <li className="list-inline-item"> </li>
                                                                        ) : (
                                                                            <li className="list-inline-item">
                                                                                <button className='btn p-0' onClick={() => this.handleMarkAsImportant(mail._id)}><i className="mdi mdi-email-mark-as-unread email-action-icons-item"></i></button>
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {pagination && (
                                                    <div className="row">
                                                        <div className="col-7 mt-1">
                                                            Showing {pagination.from || "N/A"} - {pagination.to || "N/A"} of {pagination.total_items || "N/A"}
                                                        </div>

                                                        <div className="col-5">
                                                            <div className="btn-group float-end">
                                                                <button type="button" className="btn btn-light btn-sm"><i className="mdi mdi-chevron-left"></i></button>
                                                                <button type="button" className="btn btn-info btn-sm"><i className="mdi mdi-chevron-right"></i></button>
                                                            </div>
                                                        </div> 
                                                    </div> 
                                                )}
                                            </div> 
                                        </div>

                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    };
};

export default Index;
