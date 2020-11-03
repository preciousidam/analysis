import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AccountBalance, Apartment, Person, People} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBarLayout from '../../layouts/sidebar';
import {SidebarLink, MinSidebarLink} from './sidebarLinks';
import '../../styles/sidebar.scss';
import useAuth from '../../provider';
import { CollapingLink } from './collapsingLink';


const userLink = [
    {
        icon: <Apartment />, 
        title: 'Properties', 
        link: 'properties', 
        options: [{
            title: "V-Island", 
            link: '/properties/vi',
        },{
            title: "Ikoyi", 
            link: '/properties/ikoyi',
        },{
            title: "Lekki", 
            link: '/properties/lekki',
        }]
    },
];

const adminLink = [
    {icon: <Apartment />, title: 'Properties', link: '/admin/properties', options: [ ]},
    {icon: <People />, title: 'Users', link: '/admin/users'},
];


export default function SideBar({min}){
    const {isAdmin} = useAuth();
    const [links, setLinks] = useState([]);
    
    const router = useRouter();

    useEffect(() => {
        if(isAdmin) setLinks(adminLink);
        else setLinks(userLink);
    }, [isAdmin]);
    
    return(
        <SideBarLayout min={min}>
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

export function MinSideBar({min}){
    const router = useRouter();

    const {isAdmin} = useAuth();

    const [links, setLinks] = useState([]);
    

    useEffect(() => {
        if(isAdmin) setLinks(adminLink);
        else setLinks(userLink);
    }, [isAdmin]);
    
    return(
        <SideBarLayout min={min}>
            <ul id="sidabar-content">
                
                <MinSidebarLink title="Home" icon={<AccountBalance />} link="/" active={router.pathname == "/" ? "active" : ""} />
                {
                    links.map(
                        ({title,icon,link}, id) => 
                            <MinSidebarLink 
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