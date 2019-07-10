import React from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

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

export default Layout;