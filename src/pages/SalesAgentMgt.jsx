import React, { useEffect, useState } from 'react'
import BackToDarshboard from '../components/BackToDarshboard'
import SalesAgetForm from '../components/SalesAgetForm'
import "./SalesAgentMgt.css"
const SalesAgentMgt = () => {

  const [agents, setAgent] = useState([])
  const [showForm, setShowForm] = useState(false)
  
  const handleSalesAgent = () => {
    setShowForm((prev) => !prev)
  }

  const fetchAgent = async() => {
      const response = await fetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/agents")
      const data = await response.json()
      setAgent(data?.salesAgent)
      

  }

  useEffect(() => {
    fetchAgent()
  }, [])

  // console.log("Form SAleMgt:", agents)

  return (
    <>
      <h1 className="dashboard-title">Sales Agent Management</h1>
      <div className='dashboard'>
          <BackToDarshboard/>

          <div className='main-content'>
            <h2>Sales Agent List</h2>
            {agents.map((agent) => (
              <div key={agent._id}>
                <p><strong>Agent: </strong> [ {agent.name} ] - [ {agent.email} ]</p>
              </div>
            ))}

            <button className='agent-button' onClick={handleSalesAgent}>{showForm? "Close Form" : "Add New Agent"}</button>

            {showForm && <SalesAgetForm/>}
          </div>
      </div>
    </>
  )
}

export default SalesAgentMgt
