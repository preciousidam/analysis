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

export const InputWithLabel = ({id, label, ...rest}) => {

    return (
        <div className="InWithLabel">
            <label forHtml={id}>{label}</label>
            <InputWithIconNonElevated id={id} {...rest} />
        </div>
    )
}



export const SelectInput = ({id, label, icon, options, ...rest}) =>{

    return (
        <div className='elevatedInput' id={id}>
            {icon}
            <select label className="input" {...rest}>
                <option>{label}</option>
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

SelectInput.propTypes = {
    icon: PropTypes.element,
    options: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
}