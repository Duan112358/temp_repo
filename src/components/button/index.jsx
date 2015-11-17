import React from 'react';
import styles from './index.scss';

console.log(styles);

let Button = React.createClass({

    componentWillMount() {
    },

    componentDidMount(){

    },

    render() {
        return (
            <button className={styles.Button}>
                I am a button component!!
            </button>
        );
    }
});


export default Button;
