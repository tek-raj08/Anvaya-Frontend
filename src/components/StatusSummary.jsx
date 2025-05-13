import React from 'react'
import { useLead } from '../contexts/LeadContext'
import { Link } from 'react-router-dom'
import "./StatusSummary.css"

const StatusSummary = () => {
    const {leads}  = useLead();
    // console.log(leads)

    const countByStatus = (status) => 
        leads?.leads?.filter((lead) => lead.status === status).length
    
  return (
    <section className='status-summary'>
        <h4>Lead Status:</h4>
        <ul>
            <Link to='leads-status' className='lead-card-link'><li>New: [{countByStatus("New")}] Leads</li></Link>
            <Link to='leads-status' className='lead-card-link'><li>Contacted: [{countByStatus("Contacted")}] Leads</li></Link>
            <Link to='leads-status' className='lead-card-link'><li>Closed: [{countByStatus("Closed")}] Leads</li></Link>
            <Link to='leads-status' className='lead-card-link'><li>Qualified: [{countByStatus("Qualified")}] Leads</li></Link>
            <Link to='leads-status' className='lead-card-link'><li>Proposal Sent: [{countByStatus("Proposal Sent")}] Leads</li></Link>
        </ul>
      
    </section>
  )
}

export default StatusSummary
