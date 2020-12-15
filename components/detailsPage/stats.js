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
            
            <div className="chartsContainer row">
                {selectedArea.map(area => (<div className="col-md-6">
                    <Paper className="comparison">
                        <header>
                            <h5>Similar {data?.bedrooms} bedroom {data?.type} in {area.toUpperCase()}</h5>
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