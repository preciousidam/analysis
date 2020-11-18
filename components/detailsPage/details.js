import React, {useState, useEffect} from 'react';
import { Typography} from 'antd';
import { useRouter } from 'next/router';
import { Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/propdetail.scss';
import {PriceTrendChart} from '../charts/priceTrend';
import Money from '../money';




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
                        {` ${data?.address}, ${data?.area}, ${data?.state}`}
                    </p>
                </header>
                <div className="row">
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="bed" />
                            {data?.bedrooms} bedroom
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="calendar-alt" />
                            {data?.built}
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="th" />
                            {data?.units} units
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="building" />
                            {data?.floors} Floors
                        </p>
                    </div>
                    <div className="col-4">
                        <p>
                            <FontAwesomeIcon icon="map" />
                            {data?.land_size} SQM
                        </p>
                    </div>
                </div>
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
                    <Title className='serv' level={5}>Service Charge: <Money amount={data?.serv_charge} /></Title>
                </div>
            </div>
        </Paper>
    )
}