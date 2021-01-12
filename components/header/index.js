import React from 'react';

import {ProfileDropdown} from '../profile';
import {Search} from '../input/search';
import { useRouter } from 'next/router';
import Money from '../money';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = ({}) => {

    const {push} = useRouter();
    const rates = [['2016', '380'], ['2017', '380'], ['2018', '365'], ['2019', '370'], ['2020', '450']]
    
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
                    <li id="rates" className="nav-link">
                    <div className="rate">
                        <p className="clear">Exchange</p>
                        <span className="clear">Rates</span>
                    </div>
                        {rates.map(rate => <Rate year={rate[0]} amount={rate[1]} />)}
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

export const Rate = ({year, amount}) => (
    <div className="rate">
        <p>{year}</p>
        <span>&#8358; {amount} / $1</span>
    </div>
)

export  const MobileHeader = ({onClick}) => {

    const {push} = useRouter();
    
    return(
        <header id="navbar" className="mobile">
            <nav id="navbar-content">
                <ul id="navbar-content-left">
                    <li className="nav-link" id="brand">
                        <img src="/logo.jpeg" />
                        <h2 style={{color: '#ffffff'}}>NAPIMS</h2>
                    </li>  
                </ul>
                <ul id="navbar-content-right">
                   <li id="more" onClick={onClick}>
                       <button onClick={onClick}>
                            <FontAwesomeIcon icon="bars" size="lg" color="#fff" onClick={onClick} />
                        </button>
                   </li>
                </ul>
            </nav>
        </header>
    );
}