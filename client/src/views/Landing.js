import React, { Component } from 'react';
import Helpers from '../utils/Helpers';
import { Link } from 'react-router-dom';

export class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let title = `Home | ${Helpers.appInfo().app_name}`;
        let meta_description = "Home Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }
    
    render() {
        return (
            <div className='Landing'>
                <section className="py-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-start">
                                    ssdfsdfs
                                    <Link to={'/user-panel/dashboard/draft'}>draft </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> 
            </div>
        );
    };
};

export default Landing;
