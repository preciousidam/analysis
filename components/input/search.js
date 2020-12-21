import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getViewData } from '../../libs/hooks';
import { backend } from '../../url';


export const Search = ({id, placeholder,...rest}) =>{
    const [keyword, setKeyword] = useState('');
    const [result, setResult] = useState();
    
    return (
        <div id="search">
            <div className='searchbar' id={id}>
                <FontAwesomeIcon icon='search' color='#c6c6c6' />
                <input 
                    name="search" 
                    type='search' 
                    className="input" 
                    placeholder={placeholder} 
                    {...rest}
                />
            </div>
        </div>
    )
}

Search.propTypes = {
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string,
}