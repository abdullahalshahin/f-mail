import React, { Component } from 'react'
import Helpers from './../../../../utils/Helpers';
import AxiosAPI from './../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import { Link } from 'react-router-dom';

export class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sent_mail: {
                id: "",
                subject: "",
                body: "",
                attachments: [],
                is_starred: "",
                is_important: "",
                label: "",
                created_at: "",
                updated_at: "",
                sent_users: []
            }
        };
    }

    componentDidMount() {
        let title = `Show Mail | ${Helpers.appInfo().app_name}`;
        let meta_description = "Show Mail Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const sent_mail_id = pathParts[pathParts.length - 2];

        AxiosAPI.get(`/api/user-panel/dashboard/sent-mails/${sent_mail_id}/show`)
            .then(response => {
                this.setState({
                    sent_mail: response.data.result.mail
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { sent_mail } = this.state;

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
                                                <li className="breadcrumb-item"><Link to={'/user-panel/dashboard/ent-mail'}>Sent Mail</Link></li>
                                                <li className="breadcrumb-item active">Email Show</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Email Show</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                    <div className="card-body">
                                            <div className="">
                                                <div className="mt-3">
                                                    <h5 className="font-18">Subject: {sent_mail.subject}</h5>
                                                    <hr/>
                                                    <div className="d-flex mb-3 mt-1">
                                                        <div className="w-100 overflow-hidden">
                                                            <small className="float-end">{sent_mail.updated_at}</small>
                                                            <h6 className="m-0 font-14">To: </h6>
                                                            <small className="text-muted">{sent_mail.sent_users.map(user => user.name).join(', ')}</small>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {sent_mail.body}
                                                    </div>

                                                    <hr/>

                                                    {(sent_mail.attachments && sent_mail.attachments.length > 0) ?
                                                        (
                                                            <div>
                                                                <h5 className="mb-3">Attachments</h5>

                                                                <div className='row'>
                                                                    {sent_mail.attachments.map((attachment, index) => (
                                                                        <div className="col-xl-4" key={index}>
                                                                            <div className="card mb-1 shadow-none border">
                                                                                <div className="p-2">
                                                                                    <div className="row align-items-center">
                                                                                        <div className="col-auto">
                                                                                            <div className="avatar-sm">
                                                                                                <span className="avatar-title bg-primary-lighten text-primary rounded">
                                                                                                    .FILE
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col ps-0">
                                                                                            <Link to={`${attachment}`} className="text-muted fw-bold">attachment {++index}</Link>
                                                                                            <p className="mb-0">2.3 MB</p>
                                                                                        </div>

                                                                                        <div className="col-auto">
                                                                                            <Link to={`${attachment}`} className="btn btn-link btn-lg text-muted">
                                                                                                <i className="ri-download-2-line"></i>
                                                                                            </Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) :
                                                        (
                                                            ""
                                                        )
                                                    }
                                                </div>
                                            </div> 
                                        </div>

                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Show;
