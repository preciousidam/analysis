import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Button } from 'antd';

import MainLayout from '../../../layouts';
import { ProtectRoute } from '../../../route';
import '../../../styles/propdetail.scss';
import Loader from '../../../components/loader';
import {getViewData} from '../../../libs/hooks';


export function Id({}){
    const router = useRouter();
    const [compare, setCompare] = useState(false);
    const {area, id} = router.query;
    const {data, isLoading, isError} = getViewData(`properties/${area}/${id}`);
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
        <MainLayout title={`${data?.name ?? ''}`} right={breadcrumbRight()} links={[area, `${area}/${data?.name}`]}>
            {!isLoading && <div id='main'>
                <div id="overlay"></div>
                {!compare? <Details
                    compare={() => setCompare(prev => setCompare(!prev))}
                    data={data}
                />
                : <Stats data={data} />}
            </div>}
        </MainLayout>
    )
}

export default ProtectRoute(Id);