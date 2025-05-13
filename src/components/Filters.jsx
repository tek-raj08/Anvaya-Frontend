import React from 'react'
import { useLead } from '../contexts/LeadContext'
import "./Filter.css"
const Filters = () => {
    const {setFilter} = useLead()

  return (
    <section className='filter-section'>
      <h4>Quick Filters:</h4>
      <button onClick={() => setFilter("New")}>[ New ]</button>
      <button onClick={() => setFilter("Contacted")}>[ Contacted ]</button>
      <button onClick={() => setFilter("Qualified")}>[ Qualified ]</button>
      <button onClick={() => setFilter("")}>[ All ]</button>
    </section>
  )
}

export default Filters
