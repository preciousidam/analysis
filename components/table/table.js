import { useEffect, useState } from 'react';
import { properties } from "../../libs/data"
import Money from "../money";
import { getViewData } from '../../libs/hooks';
import {areaCode} from '../../pages/index';


export function PropertyList({}){
    const m = 1000000;
    const {data, isLoading} = getViewData('properties/');
    
    const [prop, setProp] = useState(null);

    useEffect(() => {
        if (data) setProp(data);
    }, [data]);

    return (
        !isLoading && <table className="table">
            <thead>
                <tr>
                    <th className='sn'><span>SN</span></th>
                    <th><span>PROPERTY NAME</span></th>
                    <th><span>RENT</span></th>
                    <th><span>LOCATION</span></th>
                </tr>
            </thead>
            <tbody>
            {prop?.map(({rents, area, name},index) => (
                index < 10 ? <tr>
                    <td className='sn'><span>{index+1}</span></td>
                    <td><span>{name}</span></td>
                    <td>{rents.length > 0?<Money amount={`${rents[rents.length - 1].amount/m}`} prefix="M"/>: '--'}</td>
                    <td><span>{areaCode[area].toUpperCase()}</span></td>
                </tr>: null
            ))}
            </tbody>
        </table>
    )
}

export function BedPriceTable({}){
    const data = properties;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className='sn'><span>SN</span></th>
                    <th><span>No. Of Bed</span></th>
                    <th><span>RENT</span></th>
                    <th><span>CHARGES</span></th>
                </tr>
            </thead>
            <tbody>
            {properties.map((prop,index) => (
                index < 5 ? <tr>
                    <td className='sn'><span>{index+1}</span></td>
                    <td><span>{prop?.name}</span></td>
                    <td><span>&#8358; {prop?.rent['2021']}</span></td>
                    <td><span>&#8358; {prop?.serv_charge}M</span></td>
                </tr>: null
            ))}
            </tbody>
        </table>
    )
}