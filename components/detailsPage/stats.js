import React, { useEffect, useState } from 'react';
import { FormControl, ListItemText, MenuItem, Input, Checkbox, Paper } from "@material-ui/core";
import { Select, Pagination, Typography } from 'antd';

import '../../styles/stats.scss';
import { PriceTrendComparison } from '../charts/priceTrend';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {PriceChart} from '../charts/line';
import { getViewData } from '../../libs/hooks';
import Money from '../money';


const areas = ['ikoyi', 'lekki', 'vi', 'oniru'];
const {Option} =  Select;

export default function Stats({area}){
    const [type, setType] = useState('flat');
    const {data, isLoading} = getViewData(`stats/${area}?type=${type}`)
    const {data: years, isLoading: isYearLoading} = getViewData('years')
    const [year, setYear] = useState();
    

    useEffect(() => {
        if(year !== undefined) return;

        if(years)
            setYear(years.length -1)
    },[year, years]);

    return(
        <div className="statistics">
            <h5 id="header_name">{area == 'vi'? 'Victoria Island' : area} Summary</h5>
            <div id="wrapper">
                <div id="sCont">
                    <header>
                        <h5>Rent Trend</h5>
                        {!isYearLoading && <Select defaultValue={years.length - 1} className="filterItem" onChange={value => setYear(value)}>
                            {years?.map((x,i) => <Option value={i}>{x}</Option>)}
                        </Select>}
                        <Select defaultValue="flat" className="filterItem two" onChange={value => setType(value)}>
                            <Option value="flat">Flat</Option>
                            <Option value="duplex">Duplex</Option>
                            <Option value="maisonette">Maisonette</Option>
                            <Option value="terrace">Terrace</Option>
                            <Option value="pent house">Pent House</Option>
                        </Select>
                    </header>
                    <div id="chartArea">
                        {!isLoading && <PriceChart data={data} year={year} area={area} />}
                    </div>
                </div>
                <aside id="asideBar">
                    <div className="row">
                        <div className="col-md-3 heading">Type</div>
                        <div className="col-md-3 heading">Rent</div>
                        <div className="col-md-3 heading">{' '}</div>
                    </div>
                    {!isLoading && Object.keys(data).map(bed=>
                        <div className="row">
                            <div className="col-md-3 one">{bed} Bedroom</div>
                            <div className="col-md-3">
                                <Money amount={data[bed][year]/1e6} year={years[year]} prefix="M" />
                            </div>
                            <div className="col-md-3"></div>
                        </div>)
                    }
                </aside>
            </div>
        </div>
    );
}