import React, {useState, useEffect} from 'react';
import { Typography} from 'antd';
import { useRouter } from 'next/router';
import { Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/propdetail.scss';
import {PriceTrendChart} from '../charts/priceTrend';
import Money from '../money';
import { CommaFormatted } from '../../utility/converter';




const {Title} = Typography;

export default function Details({data}){

    const router = useRouter();
    
    const [years, setYears] = useState([]);
    const [amounts, setAmounts] = useState([]);

    const sortByYear = (a,b) => a.year > b.year ? 1 : a.year === b.year? 0 : -1;

    useEffect(() => {
        if (data){
            let years = [];
            let amt = [];
            data?.rents.sort(sortByYear).forEach(({year, amount}) => {
                years.push(year);
                amt.push(amount);
            });
            
            setAmounts(amt);
            setYears(years);
        }
    },[data])

    return(
        <Paper id="contentContainer" className="row">
            <div id="left" className="col-sm-6">
                <header>
                    <Title level={3}>{data?.name}</Title>
                    <p>
                        <FontAwesomeIcon icon="map-marker-alt" color="#2B734E" />
                        {` ${data?.address.toLowerCase()}, ${data?.area != 'vi'? data?.area.toLowerCase(): 'Victoria Island'}, ${data?.state.toLowerCase()}`}
                    </p>
                </header>
                <div className="row">
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="bed" />Bedroom:
                            {` `+data?.bedrooms}
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="calendar-alt" />Built:
                            {` `+data?.built}
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="th" />Total Units:
                            {` `+data?.units}
                        </p>
                    </div>

                </div>
                { data?.is_commercial && <div className="row">
                    <div className="col-4">
                        <p>
                            Commercial Type: {` ${data?.commercial_type}`}
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            Rent Per Unit: {` ${data?.rent_per_sqm ?? 'N/A'}`}
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            Size (SQM): {` ${data?.size_in_sqm ?? 'N/A'}`}
                        </p>
                    </div>
                </div>}
                <div id="facilities">
                    <header>
                        <FontAwesomeIcon icon="list-alt" />
                        Facilities
                    </header>
                    <div className="row">
                        {data?.facilities?.split(',').map(x => (
                            <div className="col-6">
                                <p><FontAwesomeIcon icon="check" />
                                {x}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id="right" className="col-sm-6">
                <header>
                    <FontAwesomeIcon icon="chart-bar" color="#fff" style={{marginRight: 10}} />
                    Rent Trend By Year
                </header>
                <PriceTrendChart
                    years={years}
                    prices={amounts}
                    title="Rent"
                />
                <div id="servCharge">
                    <Title className='serv' level={5}>Current Rent:  &#8358; {CommaFormatted(parseFloat(data?.rents[data?.rents.length -1 ]?.amount).toFixed(2))}</Title>
                </div>
            </div>
        </Paper>
    )
}