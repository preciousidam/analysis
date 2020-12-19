import React, {useEffect, useState, createRef} from 'react';
import {Bar} from 'react-chartjs-2';
import { getViewData } from '../../libs/hooks';
import { SelectInput, Search } from '../input';


export function PriceChart({data}){

    const chart = createRef();
    
    const options= {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return `${'₦'} ${value / 1e6}M`;
                    }
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
        legend:  {
            position: 'bottom',
            align: 'start',
            labels: {
                boxWidth: 10,
            }
        }
    }

    
    const instatiateChart = _ => {
    return({
            labels: ['2016', '2017', '2018', '2019', '2020'],
            datasets: [{
                label: 'Average Rent in VI',
                barThickness: 20,
                categoryPercentage: 0.5,
                barPercentage: 0.5,
                data: data?.vi,
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
            },
            {
                label: 'Average Rent Ikoyi',
                barThickness: 20,
                categoryPercentage: 0.5,
                barPercentage: 0.5,
                data: data?.ikoyi,
                backgroundColor: [
                    'rgba(255, 206, 86, 1.0)',
                    'rgba(255, 206, 86, 1.0)',
                    'rgba(255, 206, 86, 1.0)',
                    'rgba(255, 206, 86, 1.0)',
                    'rgba(255, 206, 86, 1.0)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Average Rent Oniru',
                barThickness: 20,
                categoryPercentage: 0.5,
                barPercentage: 0.5,
                data: data?.oniru,
                backgroundColor: [
                    'rgba(54, 162, 235, 1.0)',
                    'rgba(54, 162, 235, 1.0)',
                    'rgba(54, 162, 235, 1.0)',
                    'rgba(54, 162, 235, 1.0)',
                    'rgba(54, 162, 235, 1.0)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Average Rent Lekki',
                barThickness: 20,
                categoryPercentage: 0.5,
                barPercentage: 0.5,
                data: data?.lekki,
                backgroundColor: [
                    'rgba(0, 250, 154, 1.0)',
                    'rgba(0, 250, 154, 1.0)',
                    'rgba(0, 250, 154, 1.0)',
                    'rgba(0, 250, 154, 1.0)',
                    'rgba(0, 250, 154, 1.0)',
                ],
                borderColor: [
                    'rgba(0, 250, 154, 1)',
                    'rgba(0, 250, 154, 1)',
                    'rgba(0, 250, 154, 1)',
                    'rgba(0, 250, 154, 1)',
                    'rgba(0, 250, 154, 1)',
                ],
                borderWidth: 1
            }]
            });
    }

    useEffect(
        () => {
            console.log(chart)
            //chart.destroy();
        },[data]
    );

    return (
        <div>
            <div id="priceChart">
                <Bar height={350} ref={chart} data={instatiateChart()} options={options} />
            </div>
        </div>  
    )
}