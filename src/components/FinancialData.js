import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


    import { Line } from 'react-chartjs-2' 
    
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


function FinancialData(){
    const[data, setData] = useState(null)

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Bitcoin Financial Data Graphing Chart',
          },
        },
      };


    useEffect(() => {
        const apiURL = 'http://api.coindesk.com/v1/bpi/historical/close.json'
        axios
            .get(`${apiURL}`)
            .then(response => {
                const labels = Object.keys(response.data.bpi)
                const values = labels.map(label => {
                    return response.data.bpi[label]
                })

                const data = {
                    labels,
                    datasets: [
                      {
                        label: 'Dataset 1',
                        data: values,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      }
                    ]
            };
            setData(data)
        })
    }, [])

    return (
        <div>
            {data && <Line options={options} data={data}/>}
        </div>
    )
}

export default FinancialData