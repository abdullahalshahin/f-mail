import React, { Component } from 'react';
import Helpers from './../../../utils/Helpers';

export class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let title = `Registration | ${Helpers.appInfo().app_name}`;
        let meta_description = "Registration Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    render() {
        return (
            <div className='Registration'>
                Registration Page
            </div>
        );
    };
};

export default Registration;
