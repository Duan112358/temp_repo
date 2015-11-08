import React from 'react';
import {
    UserModel
} from '../../dataModel';
import { Button } from 'WS'

import "./index.scss";
import exampleImg from 'Img/logo.jpg'

let SignUp = React.createClass({

    componentWillMount() {
    },

    componentDidMount(){

    },
    getInitialState(){
        return {
            loading: true,
            progress: null,
            user: null
        }
    },

    render() {

        return (
            <div>
                <img src={exampleImg} />
                hello world!!
                <div className="test">
                    Hello test
                </div>
                <Button />
            </div>

        );
    }
});


React.render(<SignUp/>, document.body);
