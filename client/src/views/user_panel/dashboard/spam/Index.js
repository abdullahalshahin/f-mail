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
            mails: []
        };
    }

    componentDidMount() {
        let title = `Spam | ${Helpers.appInfo().app_name}`;
        let meta_description = "Spam Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchSpamtMailData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchSpamtMailData() {
        AxiosAPI.get(`/api/user-panel/dashboard/received-mails/spam`)
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

    handleMovetoReceivedMailsFromSpam(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/move-to-received-mails-from-spam`)
            .then(response => {
                this.fetchSpamtMailData();
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
                                                <li className="breadcrumb-item active">Spam</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Spam</h4>
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
                                                                    <span className="star-toggle mdi mdi-star-outline text-warning"></span>
                                                                    
                                                                    <b className="email-title">{mail.sender_info.name}</b>
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
                                                                            <button className='btn p-0' onClick={() => this.handleMovetoReceivedMailsFromSpam(mail.id)} title='Move To Trash'><i className="mdi mdi-alert-remove-outline email-action-icons-item"></i></button>
                                                                        </li>
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
