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
            received_mails: [],
            pagination: {}
        };
    }

    componentDidMount() {
        let title = `Dashboard | ${Helpers.appInfo().app_name}`;
        let meta_description = "Dashboard Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchReceivedMailData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchReceivedMailData() {
        AxiosAPI.get(`/api/user-panel/dashboard/received-mails/index`)
        .then(response => {
            this.setState({
                received_mails: response.data.result.mails,
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
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/mark-as-starred`)
            .then(response => {
                this.fetchReceivedMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleUnStarred(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/unmark-as-starred`)
            .then(response => {
                this.fetchReceivedMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleMoveToSpam(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/move-to-spam`)
            .then(response => {
                this.fetchReceivedMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleMoveToTrash(mail_id) {
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

    handleMarkAsImportant(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/mark-as-important`)
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
        const { received_mails, pagination } = this.state;

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
                                                <li className="breadcrumb-item active">Inbox</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Inbox</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-secondary"><i className="mdi mdi-archive font-16"></i></button>
                                                    <button type="button" className="btn btn-secondary"><i className="mdi mdi-alert-octagon font-16"></i></button>
                                                    <button type="button" className="btn btn-secondary"><i className="mdi mdi-delete-variant font-16"></i></button>
                                                </div>

                                                <div className="btn-group mx-1">
                                                    <button type="button" className="btn btn-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="mdi mdi-dots-horizontal font-16"></i> More
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </button>

                                                    <div className="dropdown-menu">
                                                        <span className="dropdown-header">More Options :</span>
                                                        <Link className="dropdown-item" to={'/'}>Mark as Unread</Link>
                                                        <Link className="dropdown-item" to={'/'}>Add to Tasks</Link>
                                                        <Link className="dropdown-item" to={'/'}>Add Star</Link>
                                                        <Link className="dropdown-item" to={'/'}>Mute</Link>
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <ul className="email-list">
                                                        {received_mails.map(mail => (
                                                            <li key={mail.id} className={mail.read_at ? '' : 'unread'}>
                                                                <div className="email-sender-info">
                                                                    <div className="checkbox-wrapper-mail">
                                                                        {/* <div className="form-check">
                                                                            <input type="checkbox" className="form-check-input" id="mail20" />
                                                                            <label className="form-check-label" htmlFor="mail20"></label>
                                                                        </div> */}
                                                                    </div>

                                                                    {(mail.is_starred) ? 
                                                                        (
                                                                            <span className="star-toggle mdi mdi-star-outline text-warning" onClick={() => this.handleUnStarred(mail.id)}></span>
                                                                        ) : (
                                                                            <span className="star-toggle mdi mdi-star-outline" onClick={() => this.handleStarred(mail.id)}></span>
                                                                        )
                                                                    }
                                                                    
                                                                    <Link to={`/user-panel/dashboard/received-mails/${mail.id}/show`} className="email-title">{mail.sender_info.name}</Link>
                                                                </div>

                                                                <div className="email-content">
                                                                    <Link to={`/user-panel/dashboard/received-mails/${mail.id}/show`} className="email-subject">{mail.subject} &nbsp;&ndash;&nbsp;
                                                                        <span>{mail.body}</span>
                                                                    </Link>

                                                                    <div className="email-date">{new Date(mail.updated_at).toLocaleDateString()}</div>
                                                                </div>

                                                                <div className="email-action-icons">
                                                                    <ul className="list-inline">
                                                                        <li className="list-inline-item">
                                                                            <button className='btn p-0' onClick={() => this.handleMoveToSpam(mail.id)}><i className="ri-alert-line email-action-icons-item"></i></button>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <button className='btn p-0' onClick={() => this.handleMoveToTrash(mail.id)}><i className="mdi mdi-delete email-action-icons-item"></i></button>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <button className='btn p-0' onClick={() => this.handleMarkAsImportant(mail.id)}><i className="mdi mdi-email-mark-as-unread email-action-icons-item"></i></button>
                                                                        </li>
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
