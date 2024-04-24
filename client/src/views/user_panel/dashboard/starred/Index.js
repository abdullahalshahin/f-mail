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
            mails: [],
            pagination: {}
        };
    }

    componentDidMount() {
        let title = `Starred Mail | ${Helpers.appInfo().app_name}`;
        let meta_description = "Starred Mail Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchStarredMailData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchStarredMailData() {
        AxiosAPI.get(`/api/user-panel/dashboard/mails/starred`)
        .then(response => {
            this.setState({
                mails: response.data.result.mails,
            });
        })
        .catch(error => {
            this.setState({
                error: error,
            });
        });
    }

    handleReceivedMailUnStarred(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/unmark-as-starred`)
            .then(response => {
                this.fetchStarredMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleSentMailUnStarred(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/unmark-as-starred`)
            .then(response => {
                this.fetchStarredMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleReceivedMailMoveToTrash(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/move-to-trash`)
            .then(response => {
                this.fetchReceivedMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleSentMailMoveToTrash(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/move-to-trash`)
            .then(response => {
                this.fetchReceivedMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { mails } = this.state;

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
                                                <li className="breadcrumb-item active">Starred</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Starred</h4>
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
                                                        {mails.map(mail => (
                                                            <li key={mail.id}>
                                                                <div className="email-sender-info">
                                                                    {(mail.type == 'sent') ? 
                                                                        (
                                                                            <span className="star-toggle mdi mdi-star-outline text-warning" onClick={() => this.handleSentMailUnStarred(mail.id)}></span>
                                                                        ) : (
                                                                            <span className="star-toggle mdi mdi-star-outline text-warning" onClick={() => this.handleReceivedMailUnStarred(mail.id)}></span>
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
                                                                    <ul className="list-inline">
                                                                        
                                                                        {(mail.type == 'sent') ? 
                                                                            (
                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleSentMailMoveToTrash(mail.id)} title='Move To Trash'><i className="mdi mdi-delete email-action-icons-item"></i></button>
                                                                                </li>
                                                                            ) : (
                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleReceivedMailMoveToTrash(mail.id)} title='Move To Trash'><i className="mdi mdi-delete email-action-icons-item"></i></button>
                                                                                </li>
                                                                            )
                                                                        }
                                                                    </ul>
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
