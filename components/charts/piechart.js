import React, {useEffect, useState, createRef} from 'react';
import {Doughnut} from 'react-chartjs-2';


const backgroundColor = ['#b954a4', '#5648ba', '#6692d9', '#f57f59', '#ffb82c']

export function TypeChart({data}){

    const chart = createRef();
    const [dataset, setDataset] = useState(Object.values(data));
    const [labels, setLabels] = useState([]);
    
    const options= {
        circumference: Math.PI * 4,
        responsive: false,
        legend:  {
            position: 'right',
            align: 'end',
            labels: {
                boxWidth: 10,
            }
        },
        tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total*100).toFixed(1));
                //return currentValue + ' (' + percentage + '%)';
                return `${percentage}%`;
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
        },
    }

    
    const instatiateChart = _ => {
        return({
            labels,
            datasets: [
                {
                    label: `Property types ratio`,
                    data: dataset,
                    backgroundColor,
                }
            ]
        });
    }

    useEffect(
        () => {
            setDataset(Object.values(data));
            setLabels(Object.keys(data));
        },[data]
    );

    return (
        <div>
            <div id="priceChart">
                <Doughnut ref={chart} data={instatiateChart()} options={options} />
            </div>
        </div>  
    )
}