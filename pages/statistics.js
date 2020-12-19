import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Button } from 'antd';

import MainLayout from '../../../layouts';
import { ProtectRoute } from '../../../route';
import '../../../styles/propdetail.scss';
import Loader from '../../../components/loader';
import {getViewData} from '../../../libs/hooks';


export function Statistics({}){
    const router = useRouter();
    
    const {area, name} = router.query;
    const {data, isLoading, isError} = getViewData(`properties/${area}/${name}`);
    
    const Stats = dynamic(
        () => import('../../../components/detailsPage/stats'), {ssr: false, loading: () => <Loader />}
    )
    
    
    return (
        <MainLayout>
            {!isLoading && <div id='main'>
                <div id="overlay"></div>
                <Stats data={data} />
            </div>}
        </MainLayout>
    )
}

export default ProtectRoute(Statistics);