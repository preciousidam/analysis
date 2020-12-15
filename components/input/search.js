import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getViewData } from '../../libs/hooks';
import { backend } from '../../url';


export const Search = ({id, placeholder,...rest}) =>{
    const [keyword, setKeyword] = useState('');
    const onChange = e => setKeyword(e.target.value);
    const [result, setResult] = useState();

    const getSearch = async _ => {
        const res = fetch(`${backend}/api/search?keyword=${keyword}`);
        const json = (await res).json();
        setResult(json.property)
    }

    useEffect(() => {
        if (keyword === '') return;
        getSearch();
        console.log(result)
    }, [result, keyword])
    
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
                    onChange={onChange}
                />
            </div>
            <Paper className="result">
                {result?.map(({name}) => <p>{name}</p>)}
            </Paper>
        </div>
    )
}

Search.propTypes = {
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string,
}