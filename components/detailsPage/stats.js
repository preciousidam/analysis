import React, { useState } from 'react';
import { FormControl, ListItemText, MenuItem, Select, Input, Checkbox } from "@material-ui/core";

import '../../styles/stats.scss';


const areas = ['Ikoyi', 'Lekki', 'Victoria Island']

export default function Stats({}){

    const [selectedArea, setSelectedArea] = useState([])
    const handleChange = (event) => {
        setSelectedArea(event.target.value);
    };

    return(
        <div id="propStat">
            <div id="control">
                <FormControl className="form-contr">
                    <Select
                        multiple
                        input={<Input />}
                        id="areas"
                        value={selectedArea}
                        renderValue={selected => `${selected.length} Areas`}
                        onChange={handleChange}
                    >
                        {areas.map(area => <MenuItem key={area} value={area}>
                            <Checkbox checked={selectedArea.indexOf(area) > -1} />
                            <ListItemText primary={area} />
                        </MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            
        </div>
    );
}