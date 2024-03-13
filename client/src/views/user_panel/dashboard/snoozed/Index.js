import React, { Component } from 'react';
import Helpers from './../../../../utils/Helpers';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let title = `Index | ${Helpers.appInfo().app_name}`;
        let meta_description = "Index Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    render() {
        return (
            <div className='Index'>
                Index Page
            </div>
        );
    };
};

export default Index;
