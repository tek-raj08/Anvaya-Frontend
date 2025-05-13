import React, { useEffect, useState } from 'react'
import './BarChart.css'
import {Bar} from "react-chartjs-2"
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




const BarChart = () => {

    const [chartData, setChartData] = useState(null)

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
        // console.log("From bar-chart:", leads)

        // filter the closed leads
        
        const closedLeads = leads.filter(lead => lead.status === "Closed")
        // console.log("CLose-Leads only:", closedLeads)

        // count the salesAgent

        const agentCounts = {}

        closedLeads.forEach(lead => {
            const agent = lead.salesAgent.name || "Unknown"
            // console.log("agnet-name:", agent)

            agentCounts[agent] = (agentCounts[agent] || 0) + 1
        })

        // console.log("Agent count data:",agentCounts)

        // prepare key and vlaue form object

        const labels =  Object.keys(agentCounts)
        const agentData = Object.values(agentCounts)
        const datasets = labels.map((agent, index) => ({
            label: agent, // ✅ agent name shows in legend
            data: [agentData[index]], // one bar per dataset
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length].replace('0.5', '1'),
            borderWidth: 1,
          }));

        setChartData({
            labels: ["Closed Leads"],
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
            text: 'Leads Closed by Sales Agent',
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
     {chartData && <Bar data={chartData} options={options} />}
    </div>
  )
}

export default BarChart
