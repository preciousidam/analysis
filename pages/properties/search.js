import React, {useState} from 'react';
import { useRouter } from 'next/router';

import MainLayout from '../../layouts';
import '../../styles/properties.scss';
import { SearchList } from '../../components/table/index';
import { ProtectRoute } from '../../route';



const areas = {vi: {title: 'Victoria Island', class: 'vi'}, ikoyi: {title: 'Ikoyi', class: 'ikoyi'}, 
            oniru: {title: 'Oniru', class: 'oniru'}, lekki: {title: 'Lekki', class: 'lekki'}}

export function Search({}){

    const router = useRouter();
    const {q, apt} = router.query;
    const onClick = (area, name) => router.push(`/properties/${area}/${name.replace(' ','-')}`);
    
    
    return (
        <MainLayout title={`Properties search | ${q}`} > 
            <div id="mainContProp">
                <div id="tableContainer">
                    <div id="propertyContainer">
                        <SearchList onClick={onClick} apt={apt} q={q} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Search);