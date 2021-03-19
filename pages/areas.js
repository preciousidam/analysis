import React, {useState} from 'react';
import { useRouter } from 'next/router';

import MainLayout from '../layouts';
import '../styles/areas.scss';
import { ProtectRoute } from '../route';
import { getViewData } from '../libs/hooks';

const colors = ["#f99945", '#df4b8f', '#49bdf0', '#f8869d', '#825cbe', '#ade05d', '#eeae14', '#565656',
    '#f71741', '#14ee94', '#17c39d']

const areas = {vi: {title: 'Victoria Island', class: 'vi'}, ikoyi: {title: 'Ikoyi', class: 'ikoyi'}, 
            oniru: {title: 'Oniru', class: 'oniru'}, lekki: {title: 'Lekki', class: 'lekki'},
            ph: {title: 'Port Harcourt', class: 'ph'}, abuja: {title: 'Abuja', class: 'abuja'}, 
            asokoro: {title: 'Asokoro', class: 'asokoro'}, jabi: {title: 'Jabi', class: 'jabi'},
            maitama: {title: 'Maitama', class: 'maitama'}, mabushi: {title: 'Mabushi', class: 'mabushi'},
            'wuse II': {title: 'Wuse II', class: 'wuse-II'}, utako: {title: 'Utako', class: 'utako'},}

export function Areas({}){

    const router = useRouter();
    const {area} = router.query;
    const onClick = area => router.push(`/properties/${area}`);
    const {data, isLoading} = getViewData('areas');
    
    
    return (
        <MainLayout title="All Locations" > 
            <div id="banner" >
                <div id="overlay"></div>
                <div id="content">
                    <h1 className="bannerH1">All Locations</h1>
                </div>
            </div>
            <div id="mainContProp">
                <div className="container" id="locations">
                    <div className="row">
                        {
                            !isLoading && data && data?.sort().map((area, i) => (<div className="col-md-3" 
                                    onClick={_ => onClick(area)}
                                >
                                    <div className="card-white" style={{color: colors[i%11]}}>
                                        <div className="top"><p>{areas[area]?.title}</p></div>
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