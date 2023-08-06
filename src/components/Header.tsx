import React from 'react';
import DynamicLink from './DynamicLink';
import style from './Header.module.scss';

function Header() {
    return (
        <header className={style.header}>
            <div className={style.headerContent}>
                <div className={style.headerNavigation}>
                    <nav className={style.headerNavigationLinks}>
                        <DynamicLink link="/" label="Home" />
                        <DynamicLink link="/about" label="About" />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;