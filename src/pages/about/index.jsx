import React from 'react';
import "./index.scss";
import btmLogo from 'Img/proto_btmlogo.png';
import aboutLogo from 'Img/about_logo.png';
import data from './content.js';


let Intro = React.createClass({
    render() {
        var _data = this.props.data;
        var _results = _data.map(function(ele, i){
            if (ele != '\n') {
                return (
                    <p key={i}>{ele}</p>
                );
            } else {
                return (
                    <br key={i} />
                );
            }
        });

        return (
            <section className='intro'>
                <article className='intro_article'>
                    {_results}
                </article>
            </section>
        );
    }
});

let Logo = React.createClass({
    render() {
        return (
            <header className='header'>
                <img className='logo' src={aboutLogo} />
            </header>
        );
    }
});

let Footer = React.createClass({
    render() {
        return (
            <footer className='footer'>
                <img src={btmLogo} />
            </footer>
        );
    }
});


let About = React.createClass({

    componentWillMount() {
    },

    componentDidMount() {

    },
    getInitialState() {
        return {};
    },

    render() {
        return (
            <div>
                <Logo />
                <Intro data={data} />
                <Footer />
            </div>
        );
    }
});

React.render(<About />, document.getElementById("app"));
