import React, {useEffect} from 'react';
import Chart from 'chart.js';

export function PriceChart({}){

    let myChart = null;

    const data = [2000000, 4000000, 6000000, 6200000, 8000000];
    const data2 = [4000000, 6000000, 5000000, 4200000, 8000000];
    const data3 = [2000000,3000000, 4000000, 5200000, 6000000];

    const instatiateChart = _ => {
        const ctx = document.getElementById('priceChart').getContext('2d');

         myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['2016', '2017', '2018', '2019', '2020'],
                datasets: [{
                    label: 'Average Rent in Lekki',
                    barThickness: 20,
                    categoryPercentage: 0.5,
                    barPercentage: 0.5,
                    data: data,
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
                    label: 'Average Rent VI',
                    barThickness: 20,
                    categoryPercentage: 0.5,
                    barPercentage: 0.5,
                    data: data2,
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
                    data: data3,
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
            instatiateChart()
        },[]
    );

    return (
        <canvas id="priceChart" aria-label="Chart Of Account" role="img"></canvas>
    )
}