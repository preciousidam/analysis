import React, {useState} from 'react';
import { Button, Select, Typography} from 'antd';
import { FilePdfFilled} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import {ApartmentOutlined} from '@material-ui/icons';

import MainLayout from '../../../layouts';
import '../../../styles/properties.scss';
import { NewList } from '../../../components/table/index';
import {  Paper } from '@material-ui/core';
import { ProtectRoute } from '../../../route';
import useAuth from '../../../provider';
import {Search} from '../../../components/input/search';


const {Option} =  Select;
const {Title} = Typography;
const areas = {vi: {title: 'Victoria Island', class: 'vi'}, ikoyi: {title: 'Ikoyi', class: 'ikoyi'}, 
            oniru: {title: 'Oniru', class: 'oniru'}, lekki: {title: 'Lekki', class: 'lekki'}}

export function Properties({}){

    const router = useRouter();
    const {isAdmin} = useAuth();
    const {area} = router.query;
    const [bed, setBed] = useState('*');
    const [yearBuilt, setYearBuilt] = useState('ascending');
    const onClick = name => router.push(`/properties/${area}/${name.replace(' ','-')}`);
    const sortByBed = bed => setBed(bed);
    const filter = value => setYearBuilt(value);
    
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
                    <div>
                        <div id="filterContainer">
                            <div id="left">
                                
                                <Select defaultValue='*' className="filterItem" onChange={e => sortByBed(e.target.value)}>
                                    <Option value='*'>No. of Bedroom</Option>
                                    <Option value={1}>1 Bedroom</Option>
                                    <Option value={2}>2 Bedroom</Option>
                                    <Option value={3}>3 Bedroom</Option>
                                    <Option value={4}>4 Bedroom</Option>
                                </Select>
                                
                                <button className="button" onClick={e => filter('descending')}>New to Old</button>
                                <button className="button" onClick={e => filter('ascending')}>Old to New</button>
                            
                            </div>
                            <div id="right">
                                <Search placeholder="Property search" />
                            </div>
                        </div>
                        
                    </div>
                    <div id="propertyContainer">
                        <NewList onClick={onClick} area={area} bed={bed} filter={yearBuilt} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Properties);