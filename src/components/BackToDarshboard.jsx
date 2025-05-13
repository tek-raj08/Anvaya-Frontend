import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./BackToDashboard.css"

const BackToDarshboard = () => {
    const navigate = useNavigate()
  return (
    <div className='back-to-dashboard'>
      <button className="back-button" onClick={() => navigate("/")}>← Back to Dashboard</button>
    </div>
  )
}

export default BackToDarshboard
