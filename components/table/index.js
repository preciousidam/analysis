import { Button, Pagination, Popconfirm } from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

import {properties} from '../../libs/data';
import '../../styles/tables.scss';

export function List({}){
    const text = "Are you sure you want to delete?"
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className='sn'><span>SN</span></th>
                    <th><span>PROPERTY NAME</span></th>
                    <th><span>PROPERTY ADDRESS</span></th>
                    <th><span>BEDS</span></th>
                    <th><span>BUILT</span></th>
                    <th><span>UNITS</span></th>
                    
                    <th><span>RENT</span></th>
                    <th><span>CHARGES</span></th>
                    <th><span>S/PRICE</span></th>
                    <th><span>FLOORS</span></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {properties.map((prop,index) => (
                <tr>
                    <td className='sn'><span>{index+1}</span></td>
                    <td><span>{prop?.name}</span></td>
                    <td><span>{prop?.address}</span></td>
                    <td><span>{prop?.bed}</span></td>
                    <td><span>{prop?.built}</span></td>
                    <td><span>{prop?.avail  === 0 ? '--': prop?.avail}</span></td>
                    {/*<td><span>{prop?.totalUnit  === 0 ? '--': prop?.totalUnit}</span></td>*/}
                    <td><span>{prop?.rent['2020']}</span></td>
                    <td><span>{prop?.serv_charge}M</span></td>
                    <td><span>{prop?.salePrice === 0 ? '--': prop?.salePrice}</span></td>
                    <td><span>{prop?.floors}</span></td>
                    <td className="action-space">
                        <Button icon={<EditOutlined />} type="primary" onClick={e => router.push(`/expenses/${ref}`)} />
                        <Popconfirm placement="top" title={text} onConfirm={_ => del(id)} okText="Yes" cancelText="No">
                            <Button icon={<DeleteOutlined />} type="primary" danger/>
                        </Popconfirm> 
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}