import React from 'react'
import BackToDarshboard from '../components/BackToDarshboard'
import LeadBySalesAgent from '../components/LeadBySalesAgent'


const LeadsBySalesAgent = () => {
    
  return (
    <>
      <h1 className='dashboard-title'>Leads By Sales Agent</h1>
      <div className='dashboard'>
        <BackToDarshboard/>
        <div className='main-content'>
            <LeadBySalesAgent/>
        </div>
      </div>
    </>
  )
}

export default LeadsBySalesAgent
