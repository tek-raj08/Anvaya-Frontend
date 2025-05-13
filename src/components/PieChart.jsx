import React, { useEffect, useState } from 'react'
import {Pie} from "react-chartjs-2"
import {Chart, Tooltip, Title, ArcElement, Legend} from "chart.js"
import "./PieChart.css"
Chart.register(
    Tooltip, Title, ArcElement, Legend
)



const PieChart = () => {
    
    const [leads, setLeads] = useState(0)
    const [pipeLine, setPipeLine] = useState(0)
    const data = {
        datasets: [
            {
                data: [pipeLine, leads],
                backgroundColor: ["#3498db", "#2ecc71"]
            },
            
        
        ],
    
        labels: [
            "Total Lead In pipe line", "Lead-Close"
        ],


        
    }
   
    const totalLeadClose = async() => {
        const response = await fetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/leads")
        const data = await response.json()
        // console.log("Form Pie-Chart:", data)
        const closedLead = data?.leads.filter((lead) => lead.status === "Closed")
        setLeads(closedLead.length)
    }

    // console.log("leads length:", leads)

    const totalLeadInPipeLine = async() => {
        const response = await fetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/report/pipeline")
        const data = await response.json()
        // console.log("From pie-chart totalLead close:", data)
        setPipeLine(data?.totalLeadsInPipeline)
    }

    useEffect(() => {
        totalLeadClose()
        totalLeadInPipeLine()
    }, [])

    

  return (
    <div className='pie-chart'>
      <Pie data={data}/>
    </div>
  )
}

export default PieChart
