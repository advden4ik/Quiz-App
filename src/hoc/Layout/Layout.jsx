import React from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

const Layout = props => {

    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={classes.Layout}>

            <Drawer
                isOpen={isOpen}
                onClose={handleToggleMenu}
                isAuthenticated={props.isAuthenticated}
            />

            <MenuToggle
                onToggle={handleToggleMenu}
                isOpen={isOpen}
            />

            <main>
                { props.children }
            </main>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(Layout);