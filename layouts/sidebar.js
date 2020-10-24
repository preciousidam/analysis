import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomScroll from 'react-custom-scroll';

import '../styles/sidebar.scss';

export default function SideBar({children, min=false}){
    const className = min ? 'col-sm-1' : 'col-sm-2';
    return(
        <aside className={` sidebar ${className} sidebar-area`} id={min ? 'min': ''}>
            <div id="brand">
                <img src="/logo.jpeg" />
                {!min && <h2 style={{color: '#ffffff'}}>NAPIMS</h2>}
            </div>
                
            {children}
        </aside>
    );
}