import { properties } from "../../libs/data"
import Money from "../money";



export function PropertyList({}){
    const data = properties;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className='sn'><span>SN</span></th>
                    <th><span>PROPERTY NAME</span></th>
                    <th><span>RENT</span></th>
                    <th><span>S/CHARGES</span></th>
                </tr>
            </thead>
            <tbody>
            {properties.map((prop,index) => (
                index < 11 ? <tr>
                    <td className='sn'><span>{index+1}</span></td>
                    <td><span>{prop?.name}</span></td>
                    <td><Money amount={prop?.rent['2020']} /></td>
                    <td><Money amount={`${prop?.serv_charge}M`} /></td>
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