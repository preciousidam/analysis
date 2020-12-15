import PropTypes from 'prop-types';
import {Tooltip} from 'antd';


export const Money = ({amount, className, year="2020", prefix}) => (
    <Tooltip placement="top" title={`Amount as at ${year}`}>
        <span className={`money ${className}`}>&#8358; {parseFloat(amount).toFixed(1)}{prefix}</span>
    </Tooltip>
);

Money.propTypes = {
    amount: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Money;