import React, { useEffect, useState } from 'react';
import { FormControl, ListItemText, MenuItem, Input, Checkbox, Paper } from "@material-ui/core";
import { Select, Pagination, Typography } from 'antd';

import '../../styles/stats.scss';
import { PriceTrendComparison } from '../charts/priceTrend';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {PriceChart} from '../charts/line';
import {TypeChart} from '../charts/piechart';
import { getViewData } from '../../libs/hooks';
import Money from '../money';
import { CommaFormatted } from '../../utility/converter';


const areas = ['ikoyi', 'lekki', 'vi', 'oniru'];
const {Option} =  Select;

export default function Stats({area}){
    const router = useRouter();
    const [type, setType] = useState('flat');
    const {data, isLoading} = getViewData(`stats/${area}?type=${type}`);
    const {data: years, isLoading: isYearLoading} = getViewData('years');
    const {data: types, isLoading: isTypeLoading} = getViewData('types');
    const {data: typestats, isLoading: isTStatsLoading} = getViewData(`stats/types/${area}`);
    const {data: minmax, isLoading: isMMLoading} = getViewData(`stats/minmax/${area}`);
    const [year, setYear] = useState();
    

    useEffect(() => {
        if(year !== undefined) return;

        if(years)
            setYear(years.length -1)
    },[year, years]);

    const onClick = (area, name) => router.push(`/properties/${area}/${name}`)

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
                        {!isTypeLoading && types && <Select defaultValue="Flat" className="filterItem two" onChange={value => setType(value)}>
                            {types.map(type => <Option value={type}>{type.toUpperCase()}</Option>)}
                        </Select>}
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
                        data[bed][year] > 0 && <div className="row">
                            <div className="col-md-3 one">{bed} Bedroom</div>
                            <div className="col-md-3">
                                <Money amount={data[bed][year]/1e6} year={years[year]} prefix="M" />
                            </div>
                            <div className="col-md-3"></div>
                        </div>)
                    }

                    <div id="dou-area">
                        {!isTStatsLoading && <TypeChart data={typestats} />}
                    </div>
                </aside>
            </div>
            <div id="compare">
                <h4>Lowest rent againt Higest rent</h4>
                {!isMMLoading && minmax && <div className="row">
                    {Object.keys(minmax).map(bed => (<div className="col-md-6">
                        <div className="item">
                            <h5>{bed} Bedroom Apartment</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mx">
                                        <header>
                                            <h6>{minmax[bed].max.name}</h6>
                                            <span>{minmax[bed].max.address}</span>
                                        </header>
                                        <div className="price">
                                            <p>
                                                &#8358;
                                                {CommaFormatted(
                                                    parseFloat(
                                                        minmax[bed].max.rents[minmax[bed].max.rents.length -1].amount
                                                    ).toFixed(2)
                                                )
                                                }
                                            </p>
                                        </div>

                                        <div onClick={_=> onClick(minmax[bed].max.area, minmax[bed].max.name)} className="action">View</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mn">
                                        <header>
                                            <h6>{minmax[bed].min.name}</h6>
                                            <span>{minmax[bed].min.address}</span>
                                        </header>
                                        <div className="price">
                                            <p>
                                                &#8358;
                                                {CommaFormatted(
                                                    parseFloat(
                                                        minmax[bed].min.rents[minmax[bed].min.rents.length -1].amount
                                                    ).toFixed(2)
                                                )
                                                }
                                            </p>
                                        </div>

                                        <div onClick={_=> onClick(minmax[bed].min.area, minmax[bed].min.name)} className="action">View</div> 
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>))}
                </div>}
            </div>
        </div>
    );
}