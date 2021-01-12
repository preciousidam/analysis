import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CustomScroll from 'react-custom-scroll';
import { isBrowser, isMobile } from "react-device-detect";
import { ProfileDropdown } from '../components/profile';

import '../styles/sidebar.scss';

export default function SideBar({children}){
    
    return(
        <aside className={` sidebar col-md-2 col sidebar-area`} >
            <div id="brand">
                <img src="/logo.jpeg" />
                <h2 style={{color: '#ffffff'}}>NAPIMS</h2>
            </div>
                
            {children}
        </aside>
    );
}

export const MobileLayout = ({children}) => {
    const {push} = useRouter();
    
    return (
        <aside id="mobile-side-layout" >
            <div id="close-header">
                <ProfileDropdown links={[
                        {text:'Profile', onClick: _ => push('/profile')},
                    ]} 
                />
            </div>

            {children}
        </aside>
    );
}