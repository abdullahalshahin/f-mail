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
            draft_mails: [],
            pagination: {}
        };
    }

    componentDidMount() {
        let title = `Draft | ${Helpers.appInfo().app_name}`;
        let meta_description = "Draft Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchDraftMailData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchDraftMailData () {
        AxiosAPI.get(`/api/user-panel/dashboard/sent-mails/draft`)
        .then(response => {
            this.setState({
                draft_mails: response.data.result.mails,
                pagination: response.data.result.pagination,
            });
        })
        .catch(error => {
            this.setState({
                error: error,
            });
        });
    }

    handleDraftToMail(mail_id) {
        AxiosAPI.get(`/api/user-panel/dashboard/sent-mails/${mail_id}/draft-to-mail`)
            .then(response => {
                this.fetchDraftMailData();
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
                this.fetchDraftMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { draft_mails, pagination } = this.state;

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
                                                <li className="breadcrumb-item active">Draft List</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Draft List</h4>
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
                                                        {draft_mails.map(mail => (
                                                            <li key={mail._id}>
                                                                <div className="email-sender-info">
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
                                                                        
                                                                        <li className="list-inline-item">
                                                                            <button className='btn p-0' onClick={() => this.handleDraftToMail(mail._id)} title='Send'><i className="mdi mdi-email-send email-action-icons-item"></i></button>
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
