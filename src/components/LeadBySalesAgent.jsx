import React, { useState } from "react";
import { useLead } from "../contexts/LeadContext";
import "./LeadBySalesAgent.css"

const LeadBySalesAgent = () => {
  const statuses = ["New", "Qualified", "Contacted", "Closed", "Proposal Sent"];
  const priorities = ["High", "Medium", "Low"];

  const [selectedAgent, setSelectedAgent] = useState("Mark");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [showClosedLeads, setShowClosedLeads] = useState(false);
  const { agents, leads, lastWeek } = useLead();

  const closedLeads = lastWeek?.formattedReport;
  const leadLists = leads?.leads;
  const salesAgents = agents?.salesAgent;
  // console.log("From Leads By Sales agnet:", salesAgents)

  const handleClosedLeads = () => {
    setShowClosedLeads((prev) => !prev);
  };

  const handlePriority = (event) => {
    const value = event.target.value;
    setSelectedPriority(value);
  };

  const handleStatus = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedAgent(value);
  };

  const filteredAgent = leadLists?.filter(
    (lead) => lead.salesAgent.name === selectedAgent
  );
  // console.log("Form Filterd-Agent:", filteredAgent)

  return (
    <div className="sales-agent-container">
      <label className="salesAgent-label" htmlFor="salesAgent">Sales Agent:</label>
      <select className="sales-agent-dropdown" name="salesAgent" id="salesAgent" onChange={handleChange}>
        <option value="">Select Sales Agent:</option>
        {salesAgents?.map((agent) => (
          <option key={agent._id} value={agent.name}>
            {agent.name}
          </option>
        ))}
      </select>

      {showClosedLeads ? (
        <div>
          <h3>Closed Leads from Last Week</h3>
          <ul>
            {closedLeads?.length > 0 ? (
              closedLeads.map((lead) => (
                <li key={lead.id}>
                  <p>
                    <strong>Lead {lead.name}</strong> - [Sales Agent:{" "}
                    {lead.salesAgent.name}]
                  </p>
                </li>
              ))
            ) : (
              <p>No closed leads from last week.</p>
            )}
          </ul>
        </div>
      ) : (
        selectedAgent && (
          <div>
            <h3>Sales Agent: {selectedAgent}</h3>
            <ul>
              {filteredAgent?.length > 0 ? (
                filteredAgent
                  .filter(
                    (agent) =>
                      (!selectedStatus || agent.status === selectedStatus) &&
                      (!selectedPriority || agent.priority === selectedPriority)
                  )
                  .map((agent) => (
                    <li key={agent._id}>
                      <p>
                        <strong>Lead {agent.salesAgent.name}</strong> - [Status:{" "}
                        {agent.status}]
                      </p>
                    </li>
                  ))
              ) : (
                <p>No leads with Sales Agent: "{selectedAgent}"</p>
              )}
            </ul>
          </div>
        )
      )}

      <p className="filter">
        <strong>Filters:</strong>
      </p>
      <label className="salesAgent-label" htmlFor="">Status: </label>
      <select className="sales-agent-dropdown" name="" id="" onChange={handleStatus}>
        <option value="">Select Status</option>
        {statuses.map((status) => (
          <option value={status} key={status}>
            {status}
          </option>
        ))}
      </select>

      <label className="priority-label" htmlFor="">Priority: </label>
      <select className="sales-agent-dropdown" name="" id="" onChange={handlePriority}>
        <option value="">Select Priority</option>
        {priorities.map((priority) => (
          <option value={priority} key={priority}>
            {priority}
          </option>
        ))}
      </select>

      <p className="sort-by">
        <strong>Sort by:</strong>
      </p>
      <button className="show-lead-btn" onClick={handleClosedLeads}>{showClosedLeads ? "Close Leads" : "Show All Closed Leads"}</button>
    </div>
  );
};

export default LeadBySalesAgent;
