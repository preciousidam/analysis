import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Button } from 'antd';

import MainLayout from '../../../layouts';
import { ProtectRoute } from '../../../route';
import '../../../styles/propdetail.scss';
import Loader from '../../../components/loader';


export function Id({}){
    const router = useRouter();
    const [compare, setCompare] = useState(false);
    const {area, name} = router.query;
    const Details = dynamic(
        () => import('../../../components/detailsPage/details'), {ssr: false, loading: () => <Loader />}
    )
    const Stats = dynamic(
        () => import('../../../components/detailsPage/stats'), {ssr: false, loading: () => <Loader />}
    )

    const breadcrumbRight = _ => (
        <div id="breadRight">
            <Button
                onClick={() => setCompare(prev => !prev)}
            >
                {compare? 'View Details': 'View Stats'}
            </Button>
        </div>
    )
    
    
    return (
        <MainLayout title={`${name}`} right={breadcrumbRight()} links={[area, name]}>
            <div id='main'>
                {!compare? <Details 
                    compare={() => setCompare(prev => setCompare(!prev))}
                />
                : <Stats />}
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Id);