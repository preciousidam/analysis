import React, {useState} from 'react';
import { useRouter } from 'next/router';

import MainLayout from '../../../layouts';
import '../../../styles/properties.scss';
import { NewList } from '../../../components/table/index';
import { ProtectRoute } from '../../../route';



const areas = {vi: {title: 'Victoria Island', class: 'vi'}, ikoyi: {title: 'Ikoyi', class: 'ikoyi'}, 
            oniru: {title: 'Oniru', class: 'oniru'}, lekki: {title: 'Lekki', class: 'lekki'},
            ph: {title: 'Port Harcourt', class: 'ph'}, abuja: {title: 'Abuja', class: 'abuja'}}

export function Properties({}){

    const router = useRouter();
    const {area} = router.query;
    const onClick = name => router.push(`/properties/${area}/${name.replace(' ','-')}`);
    
    
    return (
        <MainLayout title={`Properties ${area}`} > 
            <div id="banner" className={areas[area].class}>
                <div id="overlay"></div>
                <div id="content">
                    <h1 className="bannerH1">{areas[area].title}</h1>
                </div>
            </div>
            <div id="mainContProp">
                <div id="tableContainer">
                    <div id="propertyContainer">
                        <NewList onClick={onClick} area={area} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Properties);