import { useEffect, useState } from 'react';
import { properties } from "../../libs/data"
import Money from "../money";
import { getViewData } from '../../libs/hooks';



export function PropertyList({}){
    const m = 1000000;
    const {data, isLoading} = getViewData('properties/');
    const sortByYear = (a,b) => {
        if(a?.year > b?.year) return 1 
        else if (a?.year < b?.year) return -1

        return 0;
    }
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
                    <th><span>S/CHARGES</span></th>
                </tr>
            </thead>
            <tbody>
            {prop?.map(({rents, area, name},index) => (
                index < 8 ? <tr>
                    <td className='sn'><span>{index+1}</span></td>
                    <td><span>{name}</span></td>
                    <td><Money amount={`${rents?.sort(sortByYear).pop()?.amount/m}M`} /></td>
                    <td><spa>{area}</spa></td>
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
                    <td><span>&#8358; {prop?.rent['2020']}</span></td>
                    <td><span>&#8358; {prop?.serv_charge}M</span></td>
                </tr>: null
            ))}
            </tbody>
        </table>
    )
}