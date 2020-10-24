import React, { useEffect } from 'react';
import {useRouter} from 'next/router';

import useAuth from '../provider';
import Loader from '../components/loader';
import { StopFilled } from '@ant-design/icons';
import Link from 'next/link';

export function ProtectRoute(Component) {
    
    return (props) => {
       
        const { isAuthenticated } = useAuth();
        const router = useRouter();
        useEffect(()=>{
            if (!isAuthenticated) router.push('/login');
        },[isAuthenticated])
        
        return (<Component {...arguments} {...props} />);
        
    }
}

export function AdminProtectRoute(Component) {
    
    return (props) => {
       
        const { isAdmin } = useAuth();
        const router = useRouter();
        
        if(!isAdmin) return (<NoAccess />);

        return (<Component {...arguments} {...props} />);
        
    }
}

export const NoAccess = props => {
    return(
        <div>
            <StopFilled />
            <h3>Who do not have permission to access this page</h3>
            <Link href='/'><a>Click here to access where you can</a></Link>
        </div>
    )
}