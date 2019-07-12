import React from 'react';
import classes from './Drawer.module.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false},
]

const Drawer = props => {

    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={props.onClose}
                    >
                        {link.label}
                    </NavLink>
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