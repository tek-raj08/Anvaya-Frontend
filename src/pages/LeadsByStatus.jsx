import React from 'react'
import BackToDarshboard from '../components/BackToDarshboard'
import LeadByStatus from '../components/LeadByStatus'


const LeadsByStatus = () => {
    

  return (
    <>
      <h1 className='dashboard-title'>Leads by Status</h1>
      <div className='dashboard'>
        <BackToDarshboard/>

        <div className='main-content'>
            <LeadByStatus/>
        </div>
      </div>
    </>
  )
}

export default LeadsByStatus
