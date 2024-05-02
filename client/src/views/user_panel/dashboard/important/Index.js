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
        let title = `Important | ${Helpers.appInfo().app_name}`;
        let meta_description = "Important Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchImportantMailData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchImportantMailData() {
        AxiosAPI.get(`/api/user-panel/dashboard/mails/important`)
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

    handleSentMailUnmarkAsImportant(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/sent-mails/${mail_id}/unmark-as-important`)
            .then(response => {
                this.fetchImportantMailData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    handleReceivedMailUnmarkAsImportant(mail_id) {
        AxiosAPI.post(`/api/user-panel/dashboard/received-mails/${mail_id}/unmark-as-important`)
            .then(response => {
                this.fetchImportantMailData();
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
                                                <li className="breadcrumb-item active">Important</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Important</h4>
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
                                                                    <ul className="list-inline">
                                                                        
                                                                        {(mail.type == 'sent') ? 
                                                                            (
                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleSentMailUnmarkAsImportant(mail.id)} title='Move To Trash'><i className="mdi mdi-book-remove-multiple email-action-icons-item"></i></button>
                                                                                </li>
                                                                            ) : (
                                                                                <li className="list-inline-item">
                                                                                    <button className='btn p-0' onClick={() => this.handleReceivedMailUnmarkAsImportant(mail.id)} title='Move To Trash'><i className="mdi mdi-book-remove-multiple email-action-icons-item"></i></button>
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
