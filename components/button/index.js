import PropTypes from 'prop-types';

import '../../styles/components.scss';


export const RoundedButton = ({id, text, onClick}) => {

    return (
        <button id={id} className='button' onClick={onClick} >{text}</button>
    )
}

RoundedButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}