
import Link from 'next/link';
import { MinSideBar } from '../sidebar';
import PropTypes from 'prop-types';


export const SidebarLink = ({icon, title, link, active}) => {
    
    return (
        <li className={`link ${active}`}>
            <Link href={`${link}`}><a>{icon}<p>{title}</p></a></Link>
        </li>
    );
}

export const MinSidebarLink = ({icon,link,active}) => {
    return (
        <li className={`min-link ${active ? 'min-active' : ''}`}>
            <Link href={`${link}`}><a>{icon}</a></Link>
        </li>
    );
}

SidebarLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    link: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
}