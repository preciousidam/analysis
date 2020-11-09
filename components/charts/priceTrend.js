import React, {useEffect} from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

export const PriceTrendChart = ({years, prices, title}) => {

    let myChart = null;


    const instatiateChart = _ => {
        const ctx = document.getElementById('priceChart').getContext('2d');

         myChart = new Chart(ctx, {
            type: 'bar',
            data: {
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
        },[years, prices]
    );

    return (
        <canvas id="priceChart" aria-label="Chart Of Account" role="img"></canvas>
    )
}

PriceTrendChart.propTypes = {
    years: PropTypes.array.isRequired,
    prices: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
}

export const PriceTrendComparison = ({years, prices, title}) => {

    let myChart = null;


    const instatiateChart = _ => {
        const ctx = document.getElementById('priceChart').getContext('2d');

         myChart = new Chart(ctx, {
            type: 'bar',
            data: {
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
        },[years, prices]
    );

    return (
        <canvas id="priceChart" aria-label="Chart Of Account" role="img"></canvas>
    )
}