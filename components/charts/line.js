import React, {useEffect, useState, createRef} from 'react';
import {Line} from 'react-chartjs-2';
import { isBrowser, isMobile } from 'react-device-detect';
import { getViewData } from '../../libs/hooks';
import { CommaFormatted } from '../../utility/converter';

const colors = {vi: 'rgba(135, 95, 192, .5)', 
    ikoyi: 'rgba(236, 72, 135, .5)', 
    lekki: 'rgba(255, 184, 44, .5)',
    oniru: 'rgba(70, 197, 242, .5)',
    maitama: 'rgba(20, 238, 148, .5)',
    ph: 'rgba(248, 134, 157, .5)',
    asokoro: 'rgba(23, 195, 157, .5)', 
    utako: 'rgba(86, 86, 86, .5)',
    mabushi: 'rgba(247, 23, 65, .5)',
    jabi: 'rgba(238, 174, 20, .5)',
    'wuse II': 'rgba(173, 224, 93, .5)',
}

const bordercolors = {vi: 'rgba(135, 95, 192, 1)', 
    ikoyi: 'rgba(236, 72, 135, 1)', 
    lekki: 'rgba(255, 184, 44, 1)',
    oniru: 'rgba(70, 197, 242, 1)',
    maitama: 'rgba(20, 238, 148, 1)',
    ph: 'rgba(248, 134, 157, 1)',
    asokoro: 'rgba(23, 195, 157, 1)', 
    utako: 'rgba(86, 86, 86, 1)',
    mabushi: 'rgba(247, 23, 65, 1)',
    jabi: 'rgba(238, 174, 20, 1)',
    'wuse II': 'rgba(173, 224, 93, 1)',
}

export function PriceChart({data, year, area}){

    const chart = createRef();
    const {data: years, isLoading} = getViewData('years');
    const [dataset, setDataset] = useState([]);
    const [validBed, setValidBed] = useState([]);
    
    const options= {
        scales: {
            yAxes: [{
                beginAtZero: true,
                ticks: {
                    beginAtZero: false,
                    callback: function(value, index, values) {
                        if(value > 10)
                            return `${'₦'} ${value / 1e6}M`;
                        else return `0`
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
        responsive: isMobile || isBrowser,
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
                },
                title: function(tooltipItem, data) {
                    return `${data.labels[tooltipItem[0].index]} Bedroom`;
                }
            }
           
        },
        fill: false,
    }

    
    const instatiateChart = _ => {
    return({
            labels: validBed,
            datasets: [
                {
                    label: `Average Rent`,
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
            if(!isLoading){
                let arr = [];
                let bds = [];
                for(let item in data){
                    let val = data[item][year];
                    if(val > 0){
                        arr.push(data[item][year]);
                        bds.push(item);
                    }
                }
                setDataset(arr);
                setValidBed(bds);
            }
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