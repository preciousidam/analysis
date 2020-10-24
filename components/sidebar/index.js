import {useRouter} from 'next/router';
import {AccountBalance, AccountBalanceWalletOutlined, FormatBoldOutlined, Apartment, HotelOutlined, DescriptionOutlined, Person} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBarLayout from '../../layouts/sidebar';
import {SidebarLink, MinSidebarLink} from '../button/sidebarLinks';
import '../../styles/sidebar.scss';
import useAuth from '../../provider';





export default function SideBar({min}){
    const {isAdmin} = useAuth()
    const links = [
        {icon: <Apartment />, title: 'Properties', link: isAdmin === 'admin'? 'admin/properties' :'properties'},
    ]
    const router = useRouter();
    
    return(
        <SideBarLayout min={min}>
            <ul id="sidabar-content">
                
                <SidebarLink title="Home" icon={<AccountBalance />} link="/index" active={router.pathname == "/" || router.pathname == "/index" ? "active" : ""} />
                {
                    links.map(
                        ({title,icon,link}, id) => <SidebarLink key={id} title={title} icon={icon} link={link} active={router.pathname.split('/')[1] == `${link}` ? "active" : ""} />
                    )
                }
                
            </ul>
        </SideBarLayout>
    );
}

export function MinSideBar({min}){
    const router = useRouter();
    
    return(
        <SideBarLayout min={min}>
            <ul id="sidabar-content">
                
                <MinSidebarLink title="Dashboard" icon={<AccountBalance />} link="index" active={router.pathname == "/" || router.pathname == "/index" ? "active" : ""} />
                {
                    links.map(
                        ({title,icon,link}, id) => <MinSidebarLink key={id} title={title} icon={icon} link={link} active={router.pathname.split('/')[1] == `${link}` ? "active" : ""} />
                    )
                }
                
            </ul>
        </SideBarLayout>
    );
}