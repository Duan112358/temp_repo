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
				<section className='top'>
					<img src={logo} />
					<h1>“旅行者镜头”用户协议</h1>
				</section>
				<section className='topinfo'>
					重要提示：“旅行者镜头”是wesafari公司开发、运营、管理的一款应用软件产品，旨于为用户提供免费的软件使用许可及技术服务，实现信息内容的发布。wesafari公司可能根据自身对商业、适用法律与政策等要素的判断，随时更新本协议。
				</section>
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
