import React, { useState } from "react";
import { useLead } from "../contexts/LeadContext";
import "./LeadByStatus.css"

const LeadByStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState("New");
  const [selectedAgents, setSelectedAgents] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [showClosedLeads, setClosedLeads] = useState(false);
  const { leads, agents, lastWeek } = useLead();
  // console.log(lastWeek);
  const closedLeads = lastWeek?.formattedReport;
  const agentLists = agents?.salesAgent;
  const leadLists = leads?.leads;

  // const displayedLeads = showClosedLeads ? closedLeads : filteredLeads

  const priorities = ["High", "Medium", "Low"];

  const handleCloseLeads = () => {
    setClosedLeads((prev) => !prev);
  };

  const handlePriority = (event) => {
    const value = event.target.value;
    setSelectedPriority(value);
  };

  const handleAgents = (event) => {
    const value = event.target.value;
    setSelectedAgents(value);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };
  const statuses = ["New", "Contacted", "Closed", "Qualified", "Proposal Sent"];

  const filteredLeads = leadLists?.filter(
    (lead) => lead.status === selectedStatus
  );
  // console.log("Filtered-Leads:", filteredLeads)
  return (
    <div className="lead-status-container">
      <label className="lead-status-label" htmlFor="status">Status:</label>
      <select className="lead-status-dropdown" name="status" id="status" onChange={handleChange}>
        <option value="">Select Status</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <div>
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
          selectedStatus && (
            <div>
              <h3>Leads with status: {selectedStatus}</h3>
              <ul>
                {filteredLeads?.length > 0 ? (
                  filteredLeads
                    ?.filter(
                      (lead) =>
                        (!selectedAgents ||
                          lead.salesAgent.name === selectedAgents) &&
                        (!selectedPriority ||
                          lead.priority === selectedPriority)
                    )
                    .map((lead) => (
                      <li key={lead._id}>
                        <p>
                          <strong>Lead {lead.name}</strong> - [Sales Agent:{" "}
                          {lead.salesAgent.name}]
                        </p>
                      </li>
                    ))
                ) : (
                  <p>No leads with status "{selectedStatus}"</p>
                )}
              </ul>
            </div>
          )
        )}
      </div>

      <div>
        <div className="lead-filter">
          <strong className="lead-filter-label">Filters:</strong>
        </div>
        <label className="lead-status-label" htmlFor="">Sales Agent:</label>

        <select className="lead-status-dropdown" name="" id="" onChange={handleAgents}>
          <option value="">Select Agent</option>
          {agentLists?.map((agent) => (
            <option key={agent._id} value={agent.name}>
              {agent.name}
            </option>
          ))}
        </select>

        <label className="lead-status-label" htmlFor="">Priority:</label>
        <select className="lead-status-dropdown" name="" id="" onChange={handlePriority}>
          <option value="">Select Priority</option>
          {priorities.map((priority) => (
            <option value={priority} key={priority}>
              {priority}
            </option>
          ))}
        </select>

        <br />
        <br />
       <p className="sort-by">
        <strong>Sort by:</strong>
      </p>
        <button className="timeToClose-btn" onClick={handleCloseLeads}>{showClosedLeads ? "Close" : "Show CLosed Leads"}</button>
      </div>
    </div>
  );
};

export default LeadByStatus;
