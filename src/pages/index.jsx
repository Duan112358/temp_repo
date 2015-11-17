import React from 'react';
import { NotFound, Locations, Location } from 'react-router-component'

import About from 'react-proxy!./about'
import Sharing from 'react-proxy!./sharing'
import Home from 'react-proxy!./home'
import Agreement from 'react-proxy!./agreement'

// let routes = {
//     '#/' : Home,
//     '#/about' : About,
//     '#/sharing': Sharing,
//     '#/agreement': Agreement
// }

// window.onhashchange = () => {
//     let route = location.hash;
    
//     let Page = routes[route] || Home;
//     React.render(<Page />, document.getElementById('app'));
// }

// let route = location.hash;
// let Page = routes[route] || Home;
// React.render(<Page />, document.getElementById('app'));
//

class App extends React.Component {

    render() {
        return <Locations hash>
            <Location path='/' handler={Home}/>
            <Location path='/about' handler={About}/>
            <Location path='/sharing' handler={Sharing}/>
            <Location path='/agreement' handler={Agreement}/>
        </Locations>
    }

}

React.render(<App/>, document.getElementById('app'));
