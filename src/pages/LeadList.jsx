import React from "react";
import "./LeadList.css";
import BackToDarshboard from "../components/BackToDarshboard";
import { useLead } from "../contexts/LeadContext";
import LeadForm from "../components/LeadForm";
import { useState } from "react";

const LeadList = () => {
  const statuses = ["New", "Contacted", "Closed", "Qualified", "Proposal Sent"];
  const [status, setStatus] = useState(null);
  const [agent, setAgent] = useState(null);
  const [priority, setPriority] = useState(null);
  const [showLastWeek, setshowLastWeek] = useState(false);

  const priorities = ["High", "Medium", "Low"];

  const handleTimeToClose = () => {
    setshowLastWeek((prev) => !prev);
  };

  const handlePriority = (event) => {
    const value = event.target.value;
    setPriority(value);
  };

  const handleAgent = (event) => {
    const value = event.target.value;
    setAgent(value);
  };

  const handleStatus = (event) => {
    const value = event.target.value;
    setStatus(value);
  };

  const [showForm, setShowForm] = useState(false);
  const handleLeadForm = () => {
    setShowForm((prev) => !prev);
  };
  const { filteredLeads, agents, lastWeek } = useLead();
  // console.log("Last-week-data:", lastWeek);
  const lastWeekClosedLeads = lastWeek?.formattedReport;
  // console.log("Agent-List:", agents)
  const agentsList = agents?.salesAgent;
  // console.log("Filtered-Lists:", filteredLeads);

  // console.log("From lead-list", filteredLeads)
  // const leads = filteredLeads?.leads
  // const displayedLeads = showLastWeek ? lastWeekClosedLeads : filteredLeads
  return (
    <section className="container">
      <h1 className="dashboard-title">Lead List</h1>

      <section className="dashboard">
        <BackToDarshboard />

        <div className="main-content">
          {showLastWeek
            ? lastWeekClosedLeads.map((lead) => (
                <div key={lead.id}>
                  <div className="card">[{lead.name}]</div> -
                  <div className="card">[{lead.salesAgent}]</div>
                </div>
              ))
            : filteredLeads
                ?.filter(
                  (lead) =>
                    (!status || lead.status === status) &&
                    (!agent || lead.salesAgent.name === agent) &&
                    (!priority || lead.priority === priority)
                )
                .map((lead) => (
                  <div key={lead._id}>
                    <div className="card">[{lead.name}]</div> -{" "}
                    <div className="card">[{lead.status}]</div> -{" "}
                    <div className="card">[{lead.salesAgent.name}]</div>
                  </div>
                ))}

          <section>
            <div>
              <p className="filter">
                <strong>Filters:</strong>
              </p>
              <label className="salesAgent-label">Status:</label>
              <select
                className="sales-agent-dropdown"
                name=""
                id=""
                onChange={handleStatus}
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option value={status} key={status}>
                    {status}
                  </option>
                ))}
              </select>

              <label className="salesAgent-label">Sales Agent:</label>
              <select
                className="sales-agent-dropdown"
                name=""
                id=""
                onChange={handleAgent}
              >
                <option value="">Select Agent</option>
                {agentsList?.map((agent) => (
                  <option key={agent._id} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="sort-by">
                <strong>Sort by:</strong>
              </p>
              <label className="salesAgent-label">Priority:</label>
              <select
                className="sales-agent-dropdown"
                name=""
                id=""
                onChange={handlePriority}
              >
                <option value="">Select Priority</option>
                {priorities.map((priority) => (
                  <option value={priority} key={priority}>
                    {priority}
                  </option>
                ))}
              </select>

              
                <button className="show-lead-btn" onClick={handleTimeToClose}>
                  {showLastWeek ? "Close Leads" : "Show Last Week Closed Leads"}
                </button>
              
            </div>

            <button className="add-lead-button" onClick={handleLeadForm}>
              {showForm ? "Closed Lead Form" : "Add New Lead"}
            </button>

            {showForm && <LeadForm />}
          </section>
        </div>
      </section>
    </section>
  );
};

export default LeadList;
