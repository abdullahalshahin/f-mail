import React, { Component } from 'react';
import Helpers from './../../../../utils/Helpers';
import Topbar from './../../components/Topbar';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let title = `Dashboard | ${Helpers.appInfo().app_name}`;
        let meta_description = "Dashboard Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    render() {
        return (
            <div className='dashboard'>
                <div className="wrapper">
                    <Topbar />
                </div>
            </div>
        );
    };
};

export default Index;
