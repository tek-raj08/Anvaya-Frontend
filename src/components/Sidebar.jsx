import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    
      <section className='sidebar'>
     
            <ul>
                <Link to={"/lead-list"} className="lead-card-link"><li>Leads</li></Link>
                <Link to={"/sales-agent"} className='lead-card-link' ><li>Sales</li></Link>
                <Link to={"/leads-sales-agent"} className='lead-card-link'><li>Agents</li></Link>
                <Link to={"/report"} className='lead-card-link'><li>Reports</li></Link>
                <li>Settings</li>
            </ul>
        </section>
    
  )
}

export default Sidebar
