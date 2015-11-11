import React from 'react';
import {
    UserModel
} from '../../dataModel';
import { Button } from 'WS'

import "./index.scss";
import data from './protocol.js';
import logo from 'Img/proto_logo.png';
import btmLogo from 'Img/proto_btmlogo.png';


var Content = React.createClass({

	getInitialState: function() {
		return {data: data};
	},

	render: function() {
		console.log(this.state.data)

		var _arr = this.state.data.map(function(ele, i){
			var _content;

			if(ele.list){
				_content = ele.list.map(function(item, i){
					return (
						<li key={i} dangerouslySetInnerHTML={{__html: item}}></li>
					)
				})
			}else{
				_content = <p dangerouslySetInnerHTML={{__html: ele.content}}></p>
			}

			if(ele.list){
				return (
					<section key={i}>
						<h2>{ele.title}</h2>
						<ul>{_content}</ul>
					</section>
				);
			} else {
				return (
					<section key={i}>
						<h2>{ele.title}</h2>
						{_content}
					</section>
				);
			}

		})

		return (
			<article className='content'>
				{_arr}
			</article>
		)

	}
});

var Header = React.createClass({

	render: function() {
		return (
			<header className='header'>
				<section className='top'>
					<img src={logo} />
					<h1>“旅行者镜头”用户协议</h1>
				</section>
				<section className='topinfo'>
					<p>重要提示：“旅行者镜头”是wesafari公司开发、运营、管理的一款应用软件产品，旨于为用户提供免费的软件使用许可及技术服务，实现信息内容的发布。wesafari公司可能根据自身对商业、适用法律与政策等要素的判断，随时更新本协议。</p>
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
            	<Content />
                <Footer />
            </div>
        );
    }
});

React.render(<Protocol />, document.body);
