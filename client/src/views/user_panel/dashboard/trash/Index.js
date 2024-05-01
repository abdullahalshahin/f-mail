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
            trash_mails: []
        };
    }

    componentDidMount() {
        let title = `Trash | ${Helpers.appInfo().app_name}`;
        let meta_description = "Trash Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchTrashMailData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchTrashMailData() {
        AxiosAPI.get(`/api/user-panel/dashboard/mails/trash`)
        .then(response => {
            this.setState({
                trash_mails: response.data.result.trash_mails,
            });
        })
        .catch(error => {
            this.setState({
                error: error,
            });
        });
    }

    handleMoveToSentMail(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/move-to-sent-mail-from-trash`)
            .then(response => {
                this.fetchTrashMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleSentMailPermanentlyDelete(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/permanently-delete-from-trash`)
            .then(response => {
                this.fetchTrashMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleMoveToReceivedMail(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/move-to-received-mail-from-trash`)
            .then(response => {
                this.fetchTrashMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleReceivedMailPermanentlyDelete(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/permanently-delete-from-trash`)
            .then(response => {
                this.fetchTrashMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { trash_mails } = this.state;

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
                                                <li className="breadcrumb-item"><Link to={'/user-panel/dashboard'}>Inbox</Link></li>
                                                <li className="breadcrumb-item active">Trash</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Trash</h4>
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
                                                        {trash_mails.map(mail => (
                                                            <li key={mail.id}>
                                                                <div className="email-sender-info">
                                                                    {(mail.type == 'sent') ? 
                                                                        (
                                                                            <span className="star-toggle mdi mdi-star-outline text-warning"></span>
                                                                        ) : (
                                                                            <span className="star-toggle mdi mdi-star-outline text-warning"></span>
                                                                        )
                                                                    }
                                                                    
                                                                    <b className="email-title">{mail.users.map(user => user).join(', ')}</b>
                                                                </div>

                                                                <div className="email-content">
                                                                    {(mail.type == 'sent') ? 
                                                                        (
                                                                            <Link to={`/user-panel/dashboard/sent-mails/${mail.id}/show`} className="email-subject">{mail.subject} &nbsp;&ndash;&nbsp;
                                                                                <span>{mail.body}</span>
                                                                            </Link>
                                                                        ) : (
                                                                            <Link to={`/user-panel/dashboard/received-mails/${mail.id}/show`} className="email-subject">{mail.subject} &nbsp;&ndash;&nbsp;
                                                                                <span>{mail.body}</span>
                                                                            </Link>
                                                                        )
                                                                    }

                                                                    <div className="email-date">{new Date(mail.updated_at).toLocaleDateString()}</div>
                                                                </div>

                                                                <div className="email-action-icons">
                                                                    {(mail.type == 'sent') ? 
                                                                        (
                                                                            <ul className="list-inline">
                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleMoveToSentMail(mail.id)} title='Move To Trash'><i className="mdi mdi-file-restore email-action-icons-item"></i></button>
                                                                                </li>

                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleSentMailPermanentlyDelete(mail.id)} title='Move To Trash'><i className="mdi mdi-delete email-action-icons-item"></i></button>
                                                                                </li>
                                                                            </ul>
                                                                        ) : (
                                                                            <ul className="list-inline">
                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleMoveToReceivedMail(mail.id)} title='Move To Trash'><i className="mdi mdi-file-restore email-action-icons-item"></i></button>
                                                                                </li>

                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleReceivedMailPermanentlyDelete(mail.id)} title='Move To Trash'><i className="mdi mdi-delete email-action-icons-item"></i></button>
                                                                                </li>
                                                                            </ul>
                                                                        )
                                                                    }
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
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
