import React from 'react';
import {
    UserModel
} from '../../dataModel';
import { Button } from 'WS'

import "./index.scss";
import logo from 'Img/proto_logo.png';
import btmLogo from 'Img/proto_btmlogo.png';

// let SignUp = React.createClass({

//     componentWillMount() {
//     },

//     componentDidMount(){

//     },
//     getInitialState(){
//         return {
//             loading: true,
//             progress: null,
//             user: null
//         }
//     },

//     render() {

//         return (
//             <div>
//                 <img src={exampleImg} />
//                 hello world!!
//                 <div className="test">
//                     Hello test
//                 </div>
//                 <Button />
//             </div>

//         );
//     }
// });

var Header = React.createClass({

	render: function() {
		return (
			<header className='header'>
				<img src={logo} />
				<h1>“旅行者镜头”用户协议</h1>
			</header>
		);
	}
});

var Footer = React.createClass({

	render: function() {
		return (
			<footer className='footer'>
				<img src={btmLogo} />
			</footer>
		);
	}
});

var Protocol = React.createClass({

    render: function() {
        return (
            <div>
            	<Header />
                <Footer />
            </div>
        );
    }
}); 

React.render(<Protocol />, document.body);
