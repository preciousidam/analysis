import React from 'react';

import {ProfileDropdown} from '../profile';
import {Search} from '../input/search';
import { useRouter } from 'next/router';

export default function header({}){

    const {push} = useRouter();
    
    return(
        <header id="navbar">
            <nav id="navbar-content">
                <ul id="navbar-content-left">
                    <li className="nav-link">
                          
                        
                        
                    </li>  
                </ul>
                <ul id="navbar-content-right">
                    {/*<li className="nav-link">
                        <Link href="/#">
                            <a><Badge badgeContent={2} color="primary">
                                <Notifications style={{color: '#000000'}} />
                            </Badge></a>
                        </Link>
                    </li>*/}
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