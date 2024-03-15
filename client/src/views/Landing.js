import React, { Component } from 'react';
import Helpers from '../utils/Helpers';

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

        window.location.href = '/user-panel/dashboard/login';
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }
    
    render() {
        return (
            <div className='Landing'>
                
            </div>
        );
    };
};

export default Landing;
