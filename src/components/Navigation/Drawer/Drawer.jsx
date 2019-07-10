import React from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
    1,2,3
]

const Drawer = props => {

    const [, ] = React.useState();

    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
                </li>
            );
        });
    }

    const cls = [classes.Drawer];

    if (!props.isOpen) {
        cls.push(classes.close);
    }

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    { renderLinks() }
                </ul>
            </nav>
            { props.isOpen ? <Backdrop onClick={props.onClose} /> : null }
        </>
    );
};

export default Drawer;