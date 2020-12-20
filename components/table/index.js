import React, {useEffect, useState} from 'react';
import { Button, Pagination, Popconfirm, Tooltip, Typography } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';


import '../../styles/tables.scss';
import useAuth from '../../provider';
import { getViewData } from '../../libs/hooks';
import Money from '../money';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { properties } from '../../libs/data';

const {Title} = Typography;

export const NewList = ({onClick, area, bed, filter}) => {
    const text = "Click to view historical data about property";
    const m = 1000000;
    const {isAdmin} = useAuth();
    const [page, setPage] = useState(1);
    const {data, isLoading} = getViewData(`properties/${area}/${page}`);
    useEffect(() => {
        console.log(page)
    },[page])

    const onPaginationClicked = page => setPage(page);
    
    const sortByBed = (a,b) => {
        return a.bedrooms > b.bedrooms? 1 : a.bedrooms == b.bedrooms? 0 : -1;
    }

    const filterByDescending = (a,b) => {
        return a.built > b.bedrooms? -1 : a.bedrooms == b.bedrooms? 0 : 1;
    }
    const filterByAscending = (a,b) => {
        return a.built > b.bedrooms? 1 : a.bedrooms == b.bedrooms? 0 : -1;
    }

    return (
        <div>
            {
                !isLoading && data?.properties?.map(({rents, name, address, built, bedrooms, units, serv_charge}, id) => (
                    <div className="propItem" onClick={onClick}>
                        <div className="sn"><span>{id+1}</span></div>
                        <div className="propName">
                            <p>{name}</p>
                            <span>{address}</span>
                        </div>
                        <div className="bed">
                            <p>Bedroom</p>
                            <span>{bedrooms}</span>
                        </div>
                        <div className="rent">
                            <p>Rent</p>
                            
                            {rents.length > 0?
                            <Money prefix="M" amount={`${rents[rents.length -1 ]?.amount/m}`} year={rents[rents.length -1 ]?.year} />
                            : <span>--</span>}
                        </div>
                        <div className="service">
                            <p>Service Charge</p>
                            
                            {serv_charge ?<Money amount={`${serv_charge/m}`} prefix="M" />
                            : <span>--</span>}
                        </div>
                        <div className="built">
                            <p>Year Built</p>
                            <span>{built? built: '--'}</span>
                        </div>
                        <div className="unit">
                            <p>Total Unit</p>
                            <span>{units  === '' ? '--': units}</span>
                        </div>

                        <span className="more"><FontAwesomeIcon icon="angle-right" size="lg" color="#a5a5a5" /></span>
                    </div>
                ))
            }
            <div id="pagi">
                <Pagination defaultCurrent={1} current={page} total={data?.total} pageSize={10} onChange={onPaginationClicked} />
            </div>
        </div>
    );
}

/*export const List = ({onClick, area}) => {
    const text = "Click to view historical data about property";
    const m = 1000000;
    const {isAdmin} = useAuth();
    const {data, isLoading} = getViewData(area? `properties/${area}`:'properties/');
    

    return (
        !isLoading && <div><table className="table">
            <thead>
                <tr>
                    <th className='sn'><span>SN</span></th>
                    <th><span>PROPERTY NAME</span></th>
                    <th><span>PROPERTY ADDRESS</span></th>
                    <th><span>BEDROOM</span></th>
                    <th><span>YEAR BUILT</span></th>
                    <th><span>TOTAL UNITS</span></th>
                    
                    <th>RENT</th>
                    <th>S-CHARGE</th>
                </tr>
            </thead>
            <tbody>
            {data?.map(({rents,  ...prop},index) => (
                <tr onClick={isAdmin? null : () => onClick(prop?.name)}>
                    <td className='sn'><span>{index+1}</span></td>
                    <td>
                        <Tooltip title={text} placement="top">
                            <span>{prop?.name}</span>
                        </Tooltip>
                    </td>
                    <td><Tooltip title={text} placement="top">
                            <span>{prop?.address}</span>
                        </Tooltip>
                    </td>
                    <td><span>{prop?.bedrooms}</span></td>
                    <td>
                        <Tooltip title={text} placement="top">
                            <span>{prop?.built}</span>
                        </Tooltip>
                    </td>
                    <td><span>{prop?.units  === '' ? '--': prop?.units}</span></td>
                    <td>
                        {rents.length > 0?
                        <Money prefix="M" amount={`${rents[rents.length -1 ]?.amount/m}`} year={rents[rents.length -1 ]?.year} />
                        : '--'}
                    </td>
                    <td>{prop?.serv_charge ?<Money amount={`${prop?.serv_charge/m}`} prefix="M" />: `--`}</td>
                    <td><span>{prop?.floors}</span></td>
                    
                </tr>
            ))}
            </tbody>
        </table>
        {data?.length <= 0 && <div className="empty">
            <FontAwesomeIcon icon="inbox" color="#51cce3" size="5x" />
            <Title level={5}>No Data</Title>
        </div>}
    </div>
    )
}*/

NewList.propTypes = {
    onClick: PropTypes.func,
}