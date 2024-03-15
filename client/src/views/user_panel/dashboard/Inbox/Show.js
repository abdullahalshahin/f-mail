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
            received_mail: {
                id: "",
                subject: "",
                body: "",
                attachments: [],
                read_at: "",
                is_starred: "",
                is_important: "",
                label: "",
                created_at: "",
                updated_at: "",
                sender_info: {}
            }
        };
    }

    componentDidMount() {
        let title = `Show Mail | ${Helpers.appInfo().app_name}`;
        let meta_description = "Show Mail Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const received_mail_id = pathParts[pathParts.length - 2];

        AxiosAPI.get(`/api/user-panel/dashboard/received-mails/${received_mail_id}/show`)
            .then(response => {
                this.setState({
                    received_mail: response.data.result.mail
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { received_mail } = this.state;

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
                                                <li className="breadcrumb-item active">Email Read</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Email Read</h4>
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

                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="mdi mdi-folder font-16"></i>
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </button>

                                                    <div className="dropdown-menu">
                                                        <span className="dropdown-header">Move to:</span>
                                                        <Link className="dropdown-item" to={'/'}>Social</Link>
                                                        <Link className="dropdown-item" to={'/'}>Promotions</Link>
                                                        <Link className="dropdown-item" to={'/'}>Updates</Link>
                                                        <Link className="dropdown-item" to={'/'}>Forums</Link>
                                                    </div>
                                                </div>

                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-secondary dropdown-toggle arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="mdi mdi-label font-16"></i>
                                                        <i className="mdi mdi-chevron-down"></i>
                                                    </button>

                                                    <div className="dropdown-menu">
                                                        <span className="dropdown-header">Label as:</span>
                                                        <Link className="dropdown-item" to={'/'}>Updates</Link>
                                                        <Link className="dropdown-item" to={'/'}>Social</Link>
                                                        <Link className="dropdown-item" to={'/'}>Promotions</Link>
                                                        <Link className="dropdown-item" to={'/'}>Forums</Link>
                                                    </div>
                                                </div>

                                                <div className="btn-group">
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
                                                    <h5 className="font-18">{received_mail.subject}</h5>
                                                    <hr/>
                                                    <div className="d-flex mb-3 mt-1">
                                                        <img className="d-flex me-2 rounded-circle" src={received_mail.sender_info.profile_image} alt="placeholder image" height="32" />
                                                        <div className="w-100 overflow-hidden">
                                                            <small className="float-end">{received_mail.updated_at}</small>
                                                            <h6 className="m-0 font-14">{received_mail.sender_info.name}</h6>
                                                            <small className="text-muted">From: {received_mail.sender_info.username}</small>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {received_mail.body}
                                                    </div>

                                                    <hr/>

                                                    {(received_mail.attachments && received_mail.attachments.length > 0) ?
                                                        (
                                                            <div>
                                                                <h5 className="mb-3">Attachments</h5>

                                                                <div className='row'>
                                                                    {received_mail.attachments.map((attachment, index) => (
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
