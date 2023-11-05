import DynamicLink from './DynamicLink';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';

function Header() {
    return (
        <header className={style.header}>
            <div className={style.content}>
                <div className={style.logo}>
                    <Link to="/">Hollywood Director-Crew Networks</Link>
                </div>
                <div className={style.navigation}>
                    <nav className={style.navLinks}>
                        <DynamicLink link="/" label="Home" />
                        <DynamicLink link="/about" label="About" />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
