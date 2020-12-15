import { Button, Pagination, Popconfirm, Tooltip, Typography } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';


import '../../styles/tables.scss';
import useAuth from '../../provider';
import { getViewData } from '../../libs/hooks';
import Money from '../money';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const {Title} = Typography;

export const List = ({onClick, area}) => {
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
                    <th><span>BEDS</span></th>
                    <th><span>BUILT</span></th>
                    <th><span>UNITS</span></th>
                    
                    <th>
                        <p style={{margin: 0, padding: 0}}>RENTS</p>
                        <span>M=(000,000)</span>
                    </th>
                    <th><p style={{margin: 0, padding: 0}}>S-CHARGE</p>
                        <span>M=(000,000)</span>
                    </th>
                    <th><span>FLOORS</span></th>
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
}

List.propTypes = {
    onClick: PropTypes.func,
}