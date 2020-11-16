import React, { useState } from 'react';
import { FormControl, ListItemText, MenuItem, Select, Input, Checkbox, Paper } from "@material-ui/core";

import '../../styles/stats.scss';
import { PriceTrendComparison } from '../charts/priceTrend';
import { useRouter } from 'next/router';
import Link from 'next/link';


const areas = ['ikoyi', 'lekki', 'vi', 'oniru']

export default function Stats({data}){
    const router = useRouter()
    const [selectedArea, setSelectedArea] = useState(() => areas.filter(x => x != data?.area));
    const handleChange = (event) => {
        setSelectedArea(event.target.value);
    };

    return(
        <div id="propStat">
            {/*<div id="control">
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
                        </div>*/}
            <div className="chartsContainer row">
                {selectedArea.map(area => (<div className="col-md-6">
                    <Paper className="comparison">
                        <header>
                            <h5>Similar {data?.bedrooms} bedrooms in {area.toUpperCase()}</h5>
                        </header>
                        <PriceTrendComparison base={data} comArea={area} />
                    </Paper>
                </div>))}
            </div>
            <div className="tables">

            </div>
            
        </div>
    );
}