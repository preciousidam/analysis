import { properties } from "../../libs/data"
import Money from "../money";
import { getViewData } from '../../libs/hooks';



export function PropertyList({}){
    const m = 1000000;
    const {data, isLoading} = getViewData('properties/');
    console.log(data)
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
            {data?.map(({rents, serv_charge, name},index) => (
                index < 11 ? <tr>
                    <td className='sn'><span>{index+1}</span></td>
                    <td><span>{name}</span></td>
                    <td><Money amount={`${rents[4].amount/m}M`} /></td>
                    <td><Money amount={`${serv_charge/m}M`} /></td>
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