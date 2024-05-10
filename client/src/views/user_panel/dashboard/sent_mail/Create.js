import React, { Component } from 'react';
import Select from 'react-select';
import Helpers from './../../../../utils/Helpers';
import AxiosAPI from './../../../../AxiosConfig';
import Topbar from './../../components/Topbar';
import LeftSidebar from './../../components/LeftSidebar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';

export class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            new_mail_data: {
                recipient_ids: [],
                subject: "",
                body: "",
                attachments: [],
                is_draft: false
            },
            users: [],
            dynamic_variables: [],
            errors: {}
        };
    }

    componentDidMount() {
        let title = `Sent Mail | ${Helpers.appInfo().app_name}`;
        let meta_description = "Sent Mail Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        AxiosAPI.get(`/api/user-panel/dashboard/sent-mails/create`)
            .then(response => {
                this.setState({
                    users: response.data.result.users,
                    dynamic_variables: response.data.result.dynamic_variables
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        
        this.setState(prevState => ({
            new_mail_data: {
                ...prevState.new_mail_data,
                [name]: value
            }
        }));
    }

    MessageAddition = (textToAdd) => {
        const messageTextArea = document.getElementById('body');
        const startPos = messageTextArea.selectionStart;
        const endPos = messageTextArea.selectionEnd;

        const newMessage = this.state.new_mail_data.body.substring(0, startPos) + textToAdd + this.state.new_mail_data.body.substring(endPos);

        this.setState(prevState => ({
            new_mail_data: {
                ...prevState.new_mail_data,
                body: newMessage
            }
        }), () => {
            messageTextArea.selectionStart = startPos + textToAdd.length;
            messageTextArea.selectionEnd = startPos + textToAdd.length;
            messageTextArea.focus();
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { new_mail_data } = this.state;

        const recipient_ids = new_mail_data.recipient_ids.map(recipient => recipient.value);

        AxiosAPI.post(`api/user-panel/dashboard/sent-mails/sent`, {
                recipient_ids: recipient_ids,
                subject: new_mail_data.subject || "",
                body: new_mail_data.body || "",
                attachments: new_mail_data.attachments || [],
                is_draft: new_mail_data.is_draft || false
            })
            .then(response => {
                window.location.href = '/user-panel/dashboard/sent-mail';
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({ errors: error.response.data.errors || {} });
                }
                else {
                    console.error("Error creating post:", error);
                }
            });
    }

    render() {
        const { new_mail_data, users, dynamic_variables, errors } = this.state;

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
                                                <li className="breadcrumb-item active">Sent Mail</li>
                                            </ol>
                                        </div>

                                        <h4 className="page-title">Sent Mail</h4>
                                    </div>
                                </div>
                            </div>

                            {Object.keys(errors).length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger" role="alert">
                                            <ul>
                                                {Object.values(errors).map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row g-2">
                                                    <div className="mb-2 col-md-12">
                                                        <label htmlFor="recipient_ids"> To <span className="text-danger">*</span> </label>
                                                        <Select
                                                            isMulti
                                                            required
                                                            name="recipient_ids"
                                                            options={users.map(user => ({ 
                                                                value: user.id,
                                                                label: user.name
                                                            }))}
                                                            value={new_mail_data.recipient_ids}
                                                            onChange={(selectedOptions) => {
                                                                this.setState(prevState => ({
                                                                    new_mail_data: {
                                                                        ...prevState.new_mail_data,
                                                                        recipient_ids: selectedOptions
                                                                    }
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row g-2">
                                                    <div className="mb-2 col-md-12">
                                                        <label htmlFor="subject"> Subject <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" id="subject" name="subject" value={new_mail_data.subject} onChange={this.handleInputChange} required />
                                                    </div>
                                                </div>

                                                <div className="row g-2">
                                                    <div className="mb-2 col-md-12">
                                                        <label htmlFor="body"> Body <span className="text-danger">*</span></label>
                                                        <textarea className="form-control" id="body" name="body" rows="5" value={new_mail_data.body} onChange={this.handleInputChange} required></textarea>
                                                    </div>

                                                    {dynamic_variables.length > 0 && (
                                                        <div className="d-flex flex-wrap gap-2 mt-1">
                                                            {dynamic_variables.map((dynamic_variable, index) => (
                                                                <button key={index} type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => this.MessageAddition(dynamic_variable)}> {dynamic_variable} </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="float-end">
                                                    {/* <Link to={'/user-panel/dashboard'} className="btn btn-primary button-last"> Go Back </Link> */}
                                                    <button type="submit" className="btn btn-success button-last"> Sent </button>
                                                </div>
                                            </form>
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
}

export default Create;
