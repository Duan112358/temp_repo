let React = require('react');


class Movies extends React.Component {

  render() {
    let menuItems = [
      { route: 'prerequisites', text: 'Prerequisites'},
      { route: 'installation', text: 'Installation & Usage'},
      { route: 'examples', text: 'Examples'}
    ];

    return (
        <p> Hey this is movies. </p>
    );
  }

}

module.exports = Movies;
