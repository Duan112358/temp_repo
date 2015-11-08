import React from 'react';
import "./index.scss";


let Sharing = React.createClass({

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
                This is a sharing
                <div className="test">
                    Hello test
                </div>
            </div>
        );
    }
});

React.render(<Sharing/>, document.body);
