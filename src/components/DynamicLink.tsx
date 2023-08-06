import { Link, useLocation } from 'react-router-dom';
import style from './DynamicLink.module.scss';
import classNames from 'classnames';

interface Props {
    label: string;
    link: string;
  }

function DynamicLink(props : Props) {
    const location = useLocation();

    const { label, link } = props;

    const linkClasses = classNames(
        style.link,
        {
            [style.selected]: link === location.pathname,
        },
    );

    return (
        <div className={linkClasses}>
            <Link to={link}>{label}</Link>
        </div>
    );
}

export default DynamicLink;
