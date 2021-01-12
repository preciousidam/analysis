import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AccountBalance, Apartment, PictureAsPdfOutlined, People, ContactSupport} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

import SideBarLayout, {MobileLayout} from '../../layouts/sidebar';
import {SidebarLink, MinSidebarLink} from './sidebarLinks';
import '../../styles/sidebar.scss';
import useAuth from '../../provider';
import { CollapingLink } from './collapsingLink';


const userLink = [
    {
        icon: <Apartment  />, 
        title: 'Properties', 
        link: 'properties', 
        options: [{
            title: "Victoria Island", 
            link: '/properties/vi',
        },{
            title: "Ikoyi", 
            link: '/properties/ikoyi',
        },{
            title: "Oniru", 
            link: '/properties/oniru',
        },{
            title: "Lekki", 
            link: '/properties/lekki',
        }]
    },
    {
        icon: <FontAwesomeIcon icon="chart-bar" />,
        title: 'Statistics',
        link: '/statistics'
    },
    {
        icon: <ContactSupport  />,
        title: 'Support',
        link: '/support'
    },
    {
        icon: <PictureAsPdfOutlined />,
        title: 'Reports',
        link: '/reports'
    }
];



export const BrowserSidebar = ({}) => {

    
    
    const router = useRouter();
    
    return(
        <SideBarLayout>
            <ul id="sidabar-content">
                
                <SidebarLink title="Home" icon={<AccountBalance />} link="/" active={router.pathname == "/" ? "active" : ""} />
                
                {
                    userLink.map(
                        ({title,icon,link, options}, id) => options? 
                            <CollapingLink  
                                key={id} 
                                title={title} 
                                icon={icon} 
                                link={link}
                                options={options}
                                active={
                                    router.pathname.includes(link) 
                                    ? "active" : ""
                                } 
                            />
                            :<SidebarLink 
                                key={id} 
                                title={title} 
                                icon={icon} 
                                link={link} 
                                active={
                                    router.pathname.includes(link) 
                                    ? "active" : ""
                                } 
                            />
                    )
                }
                
            </ul>
        </SideBarLayout>
    );
}

export const MobileSideBar = ({visible}) => {

    const [links, setLinks] = useState(userLink);
    
    const router = useRouter();
    console.log(visible)
    
    return(
        visible && <MobileLayout>
            <ul id="sidabar-content">
                
                <SidebarLink title="Home" icon={<AccountBalance />} link="/" active={router.pathname == "/" ? "active" : ""} />
                
                {
                    links.map(
                        ({title,icon,link, options}, id) => options? 
                            <CollapingLink  
                                key={id} 
                                title={title} 
                                icon={icon} 
                                link={link}
                                options={options}
                                active={
                                    router.pathname.includes(link) 
                                    ? "active" : ""
                                } 
                            />
                            :<SidebarLink 
                                key={id} 
                                title={title} 
                                icon={icon} 
                                link={link} 
                                active={
                                    router.pathname.includes(link) 
                                    ? "active" : ""
                                } 
                            />
                    )
                }
                
            </ul>
        </MobileLayout>
    );
}
