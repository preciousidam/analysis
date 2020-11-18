import React, {useEffect, useState, createRef} from 'react';
import {Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getViewData } from '../../libs/hooks';
import '../../styles/charts.scss';
import {Money} from '../money';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colors = {vi: 'rgba(255, 99, 132, 1.0)',
    ikoyi: 'rgba(255, 206, 86, 1.0)', oniru: 'rgba(54, 162, 235, 1.0)',
    lekki: 'rgba(0, 250, 154, 1.0)',    
}

export const PriceTrendChart = ({years, prices, title}) => {

    let myChart = createRef();
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    drawBorder: false,
                    //display: false,
                },
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
    }


    const instatiateChart = _ => {
        return ({
            labels: years,
            datasets: [{
                label: title,
                barThickness: 20,
                categoryPercentage: 0.5,
                barPercentage: 0.5,
                data: prices,
                backgroundColor: [
                    'rgba(255, 99, 132, 1.0)',
                    'rgba(255, 99, 132, 1.0)',
                    'rgba(255, 99, 132, 1.0)',
                    'rgba(255, 99, 132, 1.0)',
                    'rgba(255, 99, 132, 1.0)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        })
    }

    useEffect(
        () => {
            
        },[years, prices]
    );

    return (
        <div id="priceChart" aria-label="Chart Of Account" role="img">
            <Bar height={300} ref={myChart} data={instatiateChart()} options={options} />
        </div>
    )
}

PriceTrendChart.propTypes = {
    years: PropTypes.array.isRequired,
    prices: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
}

export const PriceTrendComparison = ({base, comArea}) => {

    let myChart = createRef();
    const {data, isLoading} = getViewData(`stats/compare?comarea=${comArea}&bed=${base?.bedrooms}&type=${base.type}`)
    

    const [years, setYears] = useState([2016, 2017, 2018, 2019, 2020]);
    const [amounts1, setAmounts1] = useState();
    const [amounts2, setAmounts2] = useState();
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    drawBorder: false,
                    //display: false,
                },
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    useEffect(() => {
        if (base){
            let yrs = [];
            let amt = [];
            base?.rents.forEach(({year, amount}) => {
                yrs.push(year);
                amt.push(amount);
            });
            
            setAmounts1(amt);
        }
    },[base])

    useEffect(() => {
        if (data){
            let yrs = [];
            let amt = [];
            data?.rents.forEach(({year, amount}) => {
                yrs.push(year);
                amt.push(amount);
            });
            setAmounts2(amt);
        }
    },[data])

    const instatiateChart = _ => {
       return ({
            labels: years,
            datasets: [{
                label: `Rent for ${base?.bedrooms} bedroom  in ${base?.area}`,
                barThickness: 20,
                categoryPercentage: 0.5,
                barPercentage: 0.5,
                data: amounts1,
                backgroundColor: [
                    colors[base?.area],
                    colors[base?.area],
                    colors[base?.area],
                    colors[base?.area],
                    colors[base?.area],
                ],
                borderColor: [
                    colors[base?.area],
                    colors[base?.area],
                    colors[base?.area],
                    colors[base?.area],
                    colors[base?.area],
                ],
                borderWidth: 1
            },
            {
                label: `Rent for ${base?.bedrooms} bedroom in ${comArea}`,
                barThickness: 20,
                categoryPercentage: 0.5,
                barPercentage: 0.5,
                data: amounts2,
                backgroundColor: [
                    colors[data?.area],
                    colors[data?.area],
                    colors[data?.area],
                    colors[data?.area],
                    colors[data?.area],
                ],
                borderColor: [
                    colors[data?.area],
                    colors[data?.area],
                    colors[data?.area],
                    colors[data?.area],
                    colors[data?.area],
                ],
                borderWidth: 1
            }]
        })
    }

    useEffect(
        () => {
            if(!isLoading)
                instatiateChart()
        },[comArea, years, amounts1, amounts2]
    );

    if( data === null){
        return (
            <div className="empty">
                <FontAwesomeIcon icon="inbox" color="#51cce3" size="3x" />
                <h6>No Data</h6>
            </div>
        )
    }

    return (
        (!isLoading && data) &&<div className='compCont'>
            <div id="compChart" aria-label="Chart Of Account" role="img">
                <Bar height={300} ref={myChart} data={instatiateChart()} options={options} />
            </div>
            <div>
                <Link 
                    href={`/properties/${data?.area}/${data?.name.replace(' ', '-')}`} 
                    className="link"
                >
                    <a>View Property</a>
                </Link>
            </div>
            <PriceTable 
                years={years} 
                amt1={amounts1}
                amt2={amounts2}
                area1={base?.area}
                area2={data?.area}
            />
        </div>
    )
}


export const PriceTable = ({years, amt1, amt2, area1, area2}) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Area</th>
                    {years?.map(year => <th>{year}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{area1.toUpperCase()}</td>
                    {amt1?.map(amt => <td><Money amount={amt/1000000} />M</td>)}
                </tr>
                <tr>
                    <td>{area2.toUpperCase()}</td>
                    {amt2?.map(amt => <td><Money amount={amt/1000000} />M</td>)}
                </tr>
            </tbody>
        </table>
    )
}