import React from 'react'
import BackToDarshboard from '../components/BackToDarshboard'
import PieChart from '../components/PieChart'
import "./AnvayaReport.css"
import BarChart from '../components/BarChart'
import BarChartLeadStatus from '../components/BarChartLeadStatus'

const AnvayaReport = () => {
  return (
    <>
      <h1 className='dashboard-title'>Anvaya CRM Report</h1>
      <div className='dashboard'>
        <BackToDarshboard/>

        <div className='main-content'>
          <h2 className='pie-chart-h2'>Total Leads Closed and in Pipeline:</h2>
            <PieChart/>
            <h2>Leads Closed by Sales Agent:</h2>
            <BarChart/>
            <h2>Lead Status Distribution:</h2>
            <BarChartLeadStatus/>
        </div>
      </div>
    </>
  )
}

export default AnvayaReport
