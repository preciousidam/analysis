import PropTypes from 'prop-types';


export const Money = ({amount, className}) => (
    <span className={`money ${className}`}>&#8358; {amount}</span>
);

Money.propTypes = {
    amount: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Money;