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
    const [per, setPer] = useState([]);

    const sortByYear = (a,b) => a.year > b.year ? 1 : a.year === b.year? 0 : -1;

    const subTitle = () => {
        if (!data.is_commercial){
            return 'Residential property';
        }
        return `Commercial property -- ${data.commercial_type == 'Converted' ? 'converted' : ''}`
    }

    useEffect(() => {
        if (data){
            let years = [];
            let amt = [];
            let pers = []
            data?.rents.sort(sortByYear).forEach(({year, amount, per}) => {
                years.push(year);
                amt.push(amount);
                pers.push(per)
            });

            setAmounts(amt);
            setYears(years);
            setPer(pers);
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
                <Title level={4} style={titleStyle}>{subTitle()}</Title>
                <div className="row">
                    <div className="col-3">
                        <p>
                            <FontAwesomeIcon icon="bed" />Bedroom:
                            {` `+data?.bedrooms}
                        </p>
                    </div>
                    <div className="col-3">
                        <p>
                            <FontAwesomeIcon icon="calendar-alt" />Built:
                            {` `+data?.built}
                        </p>
                    </div>
                    <div className="col-3">
                        <p>
                            <FontAwesomeIcon icon="th" />Total Units:
                            {` `+data?.units}
                        </p>
                    </div>
                    <div className="col-3">
                        <p>
                            Size: {` ${data?.size_in_sqm ?? 'N/A'}`}
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
                    per={per}
                />
                <div id="servCharge">
                    <Title className='serv' level={5}>Current Rent:  &#8358; {CommaFormatted(parseFloat(amounts[4]).toFixed(2))} / {per[4]}</Title>
                </div>
            </div>
        </Paper>
    )
}

const titleStyle = {
    margin: '0 0 20px'
}