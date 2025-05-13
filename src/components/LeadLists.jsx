import React from 'react'
import { useLead } from '../contexts/LeadContext'
import "./Lead.css"
import { Link } from 'react-router-dom'
const LeadLists = () => {

    const {filteredLeads} = useLead();
    // console.log("FIltered-Leads:", filteredLeads)
   

  return (
    <section>
        <h3>Leads</h3>
        <div className='leads'>
        {filteredLeads?.map((lead) => (
          <Link to={`/leads/${lead._id}`} key={lead._id} className="lead-card-link" ><div className='lead-card' key={lead._id}>
            {lead.name}
          </div></Link>
        ))}
        </div>
    
    </section>
  )
}

export default LeadLists
