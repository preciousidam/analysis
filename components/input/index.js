import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import '../../styles/components.scss';

export const InputWithIcon = ({id, icon, placeholder,...rest}) => {

    return (
        <div className='elevatedInput'>
            {icon}
            <input className="input" placeholder={placeholder} {...rest} />
        </div>
    )
}


export const InputWithIconNonElevated = ({id, icon, placeholder,...rest}) => {

    return (
        <div className='nonElevatedInput'>
            {icon}
            <input className="input" placeholder={placeholder} {...rest} />
        </div>
    )
}

export const Search = ({id, placeholder,...rest}) =>{

    return (
        <div className='searchbar' id={id}>
            <FontAwesomeIcon icon='search' color='#c6c6c6' />
            <input type='search' className="input" placeholder={placeholder} {...rest} />
        </div>
    )
}

export const SelectInput = ({id, icon, options, ...rest}) =>{

    return (
        <div className='elevatedInput' id={id}>
            {icon}
            <select className="input" {...rest}>
                <option>select user role</option>
                {options.map(({value, text}) => <option key={text} value={value}>{text}</option>)}
            </select>
        </div>
    )
}

InputWithIcon.propTypes = {
    icon: PropTypes.element.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

InputWithIconNonElevated.propTypes = {
    icon: PropTypes.element.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

Search.propTypes = {
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string,
}

SelectInput.propTypes = {
    icon: PropTypes.element,
    options: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}