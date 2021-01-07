import React, {useEffect, useState, createRef} from 'react';
import {Bar} from 'react-chartjs-2';
import { getViewData } from '../../libs/hooks';
import { CommaFormatted } from '../../utility/converter';
import { SelectInput, Search } from '../input';

const colors = {vi: '#875fc0', 
    ikoyi: '#ec4887', 
    lekki: '#ffb82c',
    oniru: '#46c5f2',
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
        responsive: true,
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
                    borderColor: colors[area],
                    borderWidth: 1
                }
            ))
        });
    }

    useEffect(
        () => {
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