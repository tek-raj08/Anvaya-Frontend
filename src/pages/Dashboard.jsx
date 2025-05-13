import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import LeadLists from "../components/LeadLists";
import StatusSummary from "../components/StatusSummary";
import Filters from "../components/Filters";
import LeadForm from "../components/LeadForm";
function Dashboard() {
  const [filter, setFilter] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const handleLeadForm = () => {
    setShowForm((prev) => !prev)
  }
  return (
    <>
      <h1 className="dashboard-title">Anvaya CRM Dashboard</h1>
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <LeadLists/>
          <StatusSummary />
          <Filters setFilter={setFilter}/>
        

          <div className="add-lead-button">
            <button onClick={handleLeadForm}>{showForm ? "Closed Lead Form" : "Add New Lead"}</button>
          </div>

          {showForm  &&   <LeadForm />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
