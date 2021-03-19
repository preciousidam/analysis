import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {SidebarInnerLink, InnerCollapingLink} from './sidebarLinks';
import '../../styles/components.scss';
import { useRouter } from 'next/router';

export const CollapingLink = ({icon, title, options}) => {

    const [dropdown, setDropdown] = useState(true);
    const router = useRouter();

    return (
        <div className="collapsingLink">
            
            <li className={`link ${dropdown}`} onClick={_ => setDropdown(prev => !prev)}>
                <a>{icon}
                    <p>{title}</p>
                    <FontAwesomeIcon 
                        icon={dropdown? 'angle-right':'angle-down'} 
                        style={{position: "absolute", right: 20}} 
                    />
                </a>
            </li>
            
            {dropdown && <div className="collapsedItem">
                {options.map(({title, link, options}, id) => options? <InnerCollapingLink
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


CollapingLink.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string,
    link: PropTypes.string,
    active: PropTypes.string,
    options: PropTypes.array,
}