import React, {useState} from 'react';
import { useRouter } from 'next/router';

import MainLayout from '../layouts';
import '../styles/areas.scss';
import { ProtectRoute } from '../route';
import { getViewData } from '../libs/hooks';

const colors = ["#f99945", '#df4b8f', '#49bdf0', '#f8869d', '#825cbe', '#ade05d', '#eeae14', '#565656',
    '#f71741', '#14ee94', '#17c39d']

const areas = {vi: {title: 'Victoria Island', class: 'vi', state: 'Lagos'}, ikoyi: {title: 'Ikoyi', class: 'ikoyi', state: 'Lagos'}, 
            oniru: {title: 'Oniru', class: 'oniru', state: 'Lagos'}, lekki: {title: 'Lekki', class: 'lekki', state: 'Lagos'},
            ph: {title: 'Port Harcourt', class: 'ph', state: 'Rivers'}, abuja: {title: 'Abuja', class: 'abuja', state: 'Abuja'}, 
            asokoro: {title: 'Asokoro', class: 'asokoro', state: 'Abuja'}, jabi: {title: 'Jabi', class: 'jabi', state: 'Abuja'},
            maitama: {title: 'Maitama', class: 'maitama', state: 'Abuja'}, mabushi: {title: 'Mabushi', class: 'mabushi', state: 'Abuja'},
            'wuse II': {title: 'Wuse II', class: 'wuse-II', state: 'Abuja'}, utako: {title: 'Utako', class: 'utako', state: 'Abuja'},}

export function Areas({}){

    const router = useRouter();
    const {area} = router.query;
    const onClick = area => router.push(`/properties/${area}`);
    const {data, isLoading} = getViewData('areas');
    
    
    return (
        <MainLayout title="All Locations" > 
            <div id="areas-banner" >
                <div id="overlay"></div>
                <div id="content">
                    <h1 className="bannerH1">All Locations</h1>
                </div>
            </div>
            <div id="areasCont">
                <div className="container" id="locations">
                    <div className="row">
                        {
                            !isLoading && data && data?.sort((a,b) => a.area < b.area? -1 : 
                                a.area == b.area? 0 : 1).map(({area, state}, i) => (<div className="col-md-3" 
                                    onClick={_ => onClick(area)}
                                >
                                    <div className="card-white" style={{color: colors[i%11]}}>
                                        <div className="top">
                                            <p>{areas[area]?.title}</p>
                                            <p>{areas[area]?.state}</p>
                                        </div>
                                        <div className="bottom" style={{borderTopColor: colors[i%11], borderTopWidth: 1.5}}>View Properties</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Areas);