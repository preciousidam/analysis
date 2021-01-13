import React, {useEffect, useState, createRef} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { getViewData } from '../../libs/hooks';
import { CommaFormatted } from '../../utility/converter';
import { SelectInput, Search } from '../input';

const colors = {vi: 'rgba(135, 95, 192, 1)', 
    ikoyi: 'rgba(236, 72, 135, 1)', 
    lekki: 'rgba(255, 184, 44, 1)',
    oniru: 'rgba(70, 197, 242, 1)',
}

const bordercolors = {vi: 'rgba(135, 95, 192, 1)', 
    ikoyi: 'rgba(236, 72, 135, 1)', 
    lekki: 'rgba(255, 184, 44, 1)',
    oniru: 'rgba(70, 197, 242, 1)',
}

export function PriceChart({data, years}){

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
        
        maintainAspectRatio: false,
        legend:  {
            position: 'bottom',
            align: 'start',
            labels: {
                boxWidth: 10,
            }
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ₦';
                    }
                    label += CommaFormatted(parseFloat(tooltipItem.yLabel).toFixed(2));
                    return label;
                }
            }
           
        },
        fill: false,
    }

    
    const instatiateChart = _ => {
    return({
            labels: years,
            datasets: Object.keys(data).map(area => (
                {
                    label: `Average Rent in ${area.toUpperCase()}`,
                    barThickness: 20,
                    categoryPercentage: 0.5,
                    barPercentage: 0.5,
                    data: data[area],
                    backgroundColor: colors[area],
                    borderWidth: 1,
                }
            ))
        });
    }

    return (
        <div>
            <div id="priceChart">
                <Bar height={350} ref={chart} data={instatiateChart()} options={options} />
            </div>
        </div>  
    )
}

export const PriceLineChart = ({data, years}) => {

    const chart = createRef();

    
    const options= {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
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
                ticks: {
                    beginAtZero: false,
                },
                gridLines: {
                    display: false,
                }
            }]
        },
        
        maintainAspectRatio: false,
        legend:  {
            position: 'bottom',
            align: 'start',
            labels: {
                boxWidth: 10,
            }
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ₦';
                    }
                    label += CommaFormatted(parseFloat(tooltipItem.yLabel).toFixed(2));
                    return label;
                }
            }
           
        }
    }

    
    const instatiateChart = _ => {
    return({
            labels: years,
            datasets: Object.keys(data).map(area => (
                {
                    label: `Average Rent in ${area.toUpperCase()}`,
                    barThickness: 20,
                    categoryPercentage: 0.5,
                    barPercentage: 0.5,
                    data: data[area],
                    backgroundColor: colors[area],
                    borderColor: bordercolors[area],
                    borderWidth: 1,
                    fill: false,
                }
            ))
        });
    }


    return (
        <div>
            <div id="priceChart">
                <Line height={350} ref={chart} data={instatiateChart()} options={options} />
            </div>
        </div>  
    )
}