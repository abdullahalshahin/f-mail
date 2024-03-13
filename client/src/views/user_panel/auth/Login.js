import React, { Component } from 'react';
import Helpers from './../../../utils/Helpers';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let title = `Login | ${Helpers.appInfo().app_name}`;
        let meta_description = "Login Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    render() {
        return (
            <div className='Login'>
                Login Page
            </div>
        );
    };
};

export default Login;
