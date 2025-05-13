import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const BarChartLeadStatus = () => {

    const [status, setStatus] = useState(null)
    const colors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(199, 199, 199, 0.5)',
      ];

    const fetchLeads = async() => {
        const response = await fetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/leads")
        const data = await response.json()
        const leads = data?.leads

        const countStatus = {}

        leads.forEach(lead => {
            const status = lead.status
            countStatus[status] = (countStatus[status] || 0) + 1
        })

        // prepare data for chart

        const labels = Object.keys(countStatus)
        const statusValue = Object.values(countStatus)

        const datasets = labels.map((status, index) => ({
            label: status, // ✅ agent name shows in legend
            data: [statusValue[index]], // one bar per dataset
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length].replace('0.5', '1'),
            borderWidth: 1,
          }));

          setStatus({
            labels: ["All Status"],
            datasets
        })



    }
    
    useEffect(() => {
        fetchLeads()
    }, [])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Lead Status Distributions',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

  return (
    <div className='bar-chart'>
      {status && <Bar data={status} options={options} />}
    </div>
  )
}

export default BarChartLeadStatus
