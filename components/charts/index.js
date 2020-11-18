import React, {useEffect, useState} from 'react';
import Chart from 'chart.js';
import { getViewData } from '../../libs/hooks';
import { SelectInput, Search } from '../input';


export function PriceChart({}){

    let myChart = null;
    const [bed, setBed] = useState(3);
    const {isLoading, data} = getViewData('stats/all-average/'+bed)

    
    const instatiateChart = _ => {
        
        const ctx = document.getElementById('priceChart').getContext('2d');

         myChart = new Chart(ctx, {
            type: 'bar',
            data: {
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
            },
            options: {
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
        });
    }

    useEffect(
        () => {
            if(!isLoading && data){
                if(myChart != undefined)
                    myChart.clear()
                instatiateChart()
            } 
        },[data]
    );

    useEffect(
        () => {
            if (myChart != undefined){
                if(myChart != undefined)
                    myChart.clear()  
            }
        },[bed]
    );

    return (
        <div>
            <header>
                <h3>Average rent</h3>
                <SelectInput 
                    id="sBedroom" 
                    value={bed}
                    onChange={e => setBed(e.target.value)}
                    label=""
                    options={[
                        {text: '1 Bedroom', value:1},
                        {text: '2 Bedroom', value:2},
                        {text: '3 Bedroom', value:3},
                        {text: '4 Bedroom', value:4},
                    ]} 
                />
            </header>
            <canvas id="priceChart" aria-label="Chart Of Account" role="img"></canvas>
        </div>  
    )
}