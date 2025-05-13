import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { LeadProvider } from './contexts/LeadContext'
import LeadDetailPage from './pages/LeadDetailPage'
import LeadList from './pages/LeadList'
import SalesAgentMgt from './pages/SalesAgentMgt'
import AnvayaReport from './pages/AnvayaReport'
import LeadsByStatus from './pages/LeadsByStatus'
import LeadsBySalesAgent from './pages/LeadsBySalesAgent'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LeadProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/leads/:leadId" element={<LeadDetailPage/>} />
        <Route path='/lead-list' element={<LeadList/>} />
        <Route path='/sales-agent' element={<SalesAgentMgt/>} />
        <Route path='/report' element={<AnvayaReport/>} />
        <Route path='/leads-status' element={<LeadsByStatus/>} />
        <Route path='/leads-sales-agent' element={<LeadsBySalesAgent/>} />
        </Routes>
      </Router>
      </LeadProvider>
    </>
  )
}

export default App
