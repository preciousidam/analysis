import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Notifications from '@material-ui/icons/Notifications';
import Link from 'next/link';


import {ProfileDropdown} from '../profile';
import {Search} from '../input';
import { useRouter } from 'next/router';

export default function header({toogle}){

    const {push} = useRouter();
    
    return(
        <header id="navbar">
            <nav id="navbar-content">
                <ul id="navbar-content-left">
                    <li className="nav-link" onClick={toogle}><Link href="/" ><a><FontAwesomeIcon onClick={toogle} icon="bars" color="#000" size="lg" /></a></Link></li>
                    <li className="nav-link">
                          
                        <Search placeholder="Search" />
                        
                    </li>  
                </ul>
                <ul id="navbar-content-right">
                    <li className="nav-link">
                        <Link href="/#">
                            <a><Badge badgeContent={2} color="primary">
                                <Notifications style={{color: '#000000'}} />
                            </Badge></a>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <ProfileDropdown links={[
                                {text:'Profile', onClick: _ => push('/profile')},
                            ]} 
                        />                           
                    </li>
                </ul>
            </nav>
        </header>
    );
}