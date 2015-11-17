import React from 'react';
import About from 'react-proxy!./about'
import Sharing from 'react-proxy!./sharing'
import Home from 'react-proxy!./home'
import Agreement from 'react-proxy!./agreement'

let routes = {
    '#/' : Home,
    '#/about' : About,
    '#/sharing': Sharing,
    '#/agreement': Agreement
}

window.onhashchange = () => {
    let route = location.hash;
    
    let Page = routes[route] || Home;
    React.render(<Page />, document.getElementById('app'));
}

let route = location.hash;
let Page = routes[route] || Home;
React.render(<Page />, document.getElementById('app'));
