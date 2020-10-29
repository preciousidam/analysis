import { Button, Pagination, Popconfirm } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';


import '../../styles/tables.scss';
import useAuth from '../../provider';
import { getViewData } from '../../libs/hooks';
import Money from '../money';

export const List = ({onClick}) => {
    const text = "Are you sure you want to delete?";
    const m = 1000000;
    const {isAdmin} = useAuth();
    const {data, isLoading} = getViewData('properties/');
    

    return (
        !isLoading && <table className="table">
            <thead>
                <tr>
                    <th className='sn'><span>SN</span></th>
                    <th><span>PROPERTY NAME</span></th>
                    <th><span>PROPERTY ADDRESS</span></th>
                    <th><span>BEDS</span></th>
                    <th><span>BUILT</span></th>
                    <th><span>UNITS</span></th>
                    
                    <th><span>RENTS</span></th>
                    <th><span>S/CHARGE</span></th>
                    <th><span>S/PRICE</span></th>
                    <th><span>FLOORS</span></th>
                    {isAdmin && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
            {data?.map(({rents,  ...prop},index) => (
                <tr onClick={isAdmin? null : () => onClick(prop?.id)}>
                    <td className='sn'><span>{index+1}</span></td>
                    <td><span>{prop?.name}</span></td>
                    <td><span>{prop?.address}</span></td>
                    <td><span>{prop?.bedrooms}</span></td>
                    <td><span>{prop?.built}</span></td>
                    <td><span>{prop?.units  === '' ? '--': prop?.units}</span></td>
                    <td><Money amount={`${rents[4].amount/m}M`} /></td>
                    <td><Money amount={`${prop?.serv_charge/m}M`} /></td>
                    <td><span>{prop?.sale_price === '' ? '--': prop?.sale_price}</span></td>
                    <td><span>{prop?.floors}</span></td>
                    {isAdmin && <td className="action-space">
                        {/*<Button icon={<EditOutlined />} type="primary" onClick={e => router.push(`/expenses/${ref}`)} />*/}
                        <Popconfirm placement="top" title={text} onConfirm={_ => del(id)} okText="Yes" cancelText="No">
                            <Button icon={<DeleteOutlined />} type="primary" danger/>
                        </Popconfirm> 
                    </td>}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

List.propTypes = {
    onClick: PropTypes.func,
}