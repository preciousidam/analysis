import React, {useState} from 'react';
import Link from 'next/link';
import { MinSideBar } from '.';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const SidebarLink = ({icon, title, link, active}) => {
    
    return (
        <li className={`link ${active}`}>
            <Link href={`${link}`}><a>{icon}<p>{title}</p></a></Link>
        </li>
    );
}

export const SidebarInnerLink = ({ title, link, active}) => {
    
    return (
        <li className={`link ${active} inner`}>
            <Link href={`${link}`}><a>{title}</a></Link>
        </li>
    );
}

export const InnerCollapingLink = ({icon, title, options}) => {

    const [dropdown, setDropdown] = useState(false);
    const router = useRouter();

    return (
        <div className=" link collapsingLink inner">
            
            <li className={`link ${dropdown}`} onClick={_ => setDropdown(prev => !prev)}>
                <a>
                    <p>{title}</p>
                    <FontAwesomeIcon 
                        icon={dropdown? 'angle-right':'angle-down'} 
                        style={{position: "absolute", right: 20}} 
                    />
                </a>
            </li>
            
            {dropdown && <div className="collapsedItem">
                {options.map(({title, link, options}, id) => options? <CollapingLink 
                        key={id} 
                        title={title} 
                        link={link}
                        options={options}
                        active={
                            router.pathname.includes(link) 
                            ? "active" : ""
                        } 
                    /> :
                    <SidebarInnerLink 
                        title={title} 
                        link={link}
                        key={title}
                        active={window.location.href.includes(link) ? "active" : ""} 
                    />
                )}
            </div>}
        </div>
    );
}

export const MinSidebarLink = ({icon,link,active}) => {
    return (
        <li className={`min-link ${active ? 'min-active' : ''}`}>
            <Link href={`/${link}`}><a>{icon}</a></Link>
        </li>
    );
}

SidebarLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    link: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
}

SidebarInnerLink.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
}