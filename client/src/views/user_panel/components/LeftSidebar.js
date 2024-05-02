import React, { Component } from 'react';
import LogoDarkSmPng from './../../../assets/images/logo-dark-sm.png';
import LogoDarkPng from './../../../assets/images/logo-dark.png';
import LogoSmPng from './../../../assets/images/logo-sm.png';
import LogoPng from './../../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export class LeftSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        return (
            <div className='leftside-menu'>
                <Link to={'/user-panel/dashboard'} className="logo logo-light">
                    <span className="logo-lg">
                        <img src={LogoPng} alt="logo" />
                    </span>
                    <span className="logo-sm">
                        <img src={LogoSmPng} alt="small logo" />
                    </span>
                </Link>

                <Link to={'/user-panel/dashboard'} className="logo logo-dark">
                    <span className="logo-lg">
                        <img src={LogoDarkPng} alt="dark logo" />
                    </span>
                    <span className="logo-sm">
                        <img src={LogoDarkSmPng} alt="small logo" />
                    </span>
                </Link>

                <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
                    <i className="ri-checkbox-blank-circle-line align-middle"></i>
                </div>

                <div className="button-close-fullsidebar">
                    <i className="ri-close-fill align-middle"></i>
                </div>

                <div className="h-100" id="leftside-menu-container" data-simplebar>
                    <ul className="side-nav">
                        <li className="side-nav-title">Navigation</li>

                        <Link to={'/user-panel/dashboard/sent-mail-create'} className="help-box btn text-white text-center" style={{ backgroundColor: '#fa5c7c', margin: '10px 25px', padding: '5px' }}>
                            <h5 >Compose</h5>
                        </Link>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard'} className="side-nav-link">
                                <i className="ri-inbox-line"></i>
                                <span className="badge badge-danger-lighten float-end"></span>
                                <span> Inbox </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/starred'} className="side-nav-link">
                                <i className="ri-star-line"></i>
                                <span> Starred </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/draft'} className="side-nav-link">
                                <i className="ri-article-line"></i>
                                <span className="badge badge-danger-lighten float-end"></span>
                                <span> Draft </span>
                            </Link>
                        </li>
                        
                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/sent-mail'} className="side-nav-link">
                                <i className="ri-mail-send-line"></i>
                                <span> Sent Mail </span>
                            </Link>
                        </li>
                        
                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/trash'} className="side-nav-link">
                                <i className="ri-delete-bin-line"></i>
                                <span> Trash </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/important'} className="side-nav-link">
                                <i className="ri-price-tag-3-line"></i>
                                <span> Important </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/spam'} className="side-nav-link">
                                <i className="ri-alert-line"></i>
                                <span> Spam </span>
                            </Link>
                        </li>

                        {/* <li className="side-nav-title">LABELS</li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard'} className="side-nav-link">
                                <i className="mdi mdi-circle font-13 text-info"></i>
                                <span> Social </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard'} className="side-nav-link">
                                <i className="mdi mdi-circle font-13 text-warning"></i>
                                <span> Family </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard'} className="side-nav-link">
                                <i className="mdi mdi-circle font-13 text-success"></i>
                                <span> Important </span>
                            </Link>
                        </li> */}

                        {/* <div className="help-box text-dark" style={{backgroundColor: '#ffffff', margin: '10px 5px 10px', padding: '5px'}}>
                            <h4><span className="badge rounded-pill p-1 px-2 badge-secondary-lighten">FREE</span></h4>
                            <h6 className="text-uppercase mt-3">Storage</h6>

                            <div className="progress my-2 progress-sm">
                                <div className="progress-bar progress-lg bg-success" role="progressbar" style={{ width: '46%' }} aria-valuenow="46" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>

                            <p className="text-muted font-13 mb-0">7.02 GB (46%) of 15 GB used</p>
                        </div> */}
                    </ul>

                    <div className="clearfix"></div>
                </div>
            </div>
        );
    };
};

export default LeftSidebar;
