import style from './Footer.module.scss';

function Footer() {
    return (
        <footer>
            <div className={style.footer}>
                <div className={style.footerContent}>
                    <p>&copy; Ian MacDonald 2023</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
