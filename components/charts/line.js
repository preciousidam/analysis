import React, {useEffect, useState, createRef} from 'react';
import {Line} from 'react-chartjs-2';
import { getViewData } from '../../libs/hooks';
import { CommaFormatted } from '../../utility/converter';
import { SelectInput, Search } from '../input';

const colors = {vi: 'rgba(255, 99, 132, .5)', 
    ikoyi: 'rgba(255, 206, 86, .5)', 
    lekki: 'rgba(0, 250, 154, .5)',
    oniru: 'rgba(54, 162, 235, .5)',
}

const bordercolors = {vi: 'rgba(255, 99, 132, 1)', 
    ikoyi: 'rgba(255, 206, 86, 1)', 
    lekki: 'rgba(0, 250, 154, 1)',
    oniru: 'rgba(54, 162, 235, 1)',
}

export function PriceChart({data, year, area}){

    const chart = createRef();
    const [dataset, setDataset] = useState([]);
    
    const options= {
        scales: {
            yAxes: [{
                beginAtZero: true,
                ticks: {
                    beginAtZero: false,
                    callback: function(value, index, values) {
                        return `${'₦'} ${value / 1e6}M`;
                    }
                },
                gridLines: {
                    drawBorder: false,
                    display: true,
                },
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: false,
                    callback: function(value, index, values) {
                        return `${value} Bedroom`;
                    }
                },
                gridLines: {
                    display: true,
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
           
        },
        fill: false,
    }

    
    const instatiateChart = _ => {
    return({
            labels: Object.keys(data),
            datasets: [
                {
                    label: `Average Rent per bedrooms number`,
                    data: dataset,
                    backgroundColor: colors[area],
                    borderColor: bordercolors[area],
                    fill: true,
                    pointRadius: 3,
                }
            ]
        });
    }

    useEffect(
        () => {
            let arr = [];
            for(let item in data){
                arr.push(data[item][year]);
            }
            setDataset(arr)
        },[year, data]
    );

    return (
        <div>
            <div id="priceChart">
                <Line height={350} ref={chart} data={instatiateChart()} options={options} />
            </div>
        </div>  
    )
}