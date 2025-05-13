import React, { useState } from "react";
import { useEffect } from "react";
import "./LeadForm.css"

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    tags: [],
    timeToClose: "",
    priority: "Medium",
  });

  const tagsOptions = ["High Value", "Follow-up"];
  const leadSource = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];
//   const agents = ["John Doe", "Jane Smith"];
  const leadStatuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const priorityOptions = ["High", "Medium", "Low"];

  const [agents, setAgent] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
        try{
            const res = await fetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/agents")
            const data = await res.json();
            // console.log("From saleData", data)
            setAgent(data)

        }catch(error){
            console.error("Error fetching agents:", error);
        }

    }

    fetchAgents()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((pre) => ({ ...pre, [name]:name === "timeToClose" ? parseInt(value) : value }));
  };

  const handleTagChange = (event) => {

    const options = event.target.options
    const selectedOptions = []

    for(let i=0; i<options.length; i++){
      if(options[i].selected){
        selectedOptions.push(options[i].value)
      }
    }

    setFormData((prev) => ({
      ...prev,
      tags:selectedOptions
    }))

}

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           name: formData.name,
           source: formData.source,
           salesAgent: formData.salesAgent,
           status: formData.status,
           tags: formData.tags,
           timeToClose: formData.timeToClose,
           priority: formData.priority
        }),
      });

      if (!response.ok) {
        throw "Failed to add New Lead.";
      }

      const data = await response.json();
      console.log("New Lead Added successfully.", data);

     

    } catch (error) {
      console.error("Error adding lead:", error)
      console.log("Error adding lead:", error.message);
    }

    // console.log(formData.name,
    //     formData.salesAgent,
    //     formData.source,
    //     formData.status,
    //     formData.tags,
    //     formData.timeToClose,
    //     formData.priority,
    //     )
  };

  return (
    <section>
      <form className="lead-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Lead Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Lead Name"
          required
        />
        <br />
        <br />

        <label htmlFor="leadSource">Lead Source:</label>
        <br />
        <select
          name="source"
          id="leadSource"
          onChange={handleChange}
          value={formData.source}
          required
        >
          <option value="">Select Lead Source</option>
          {leadSource.map((source) => (
            <option value={source} key={source}>
              {source}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="salesAgent">Assigned Sales Agent:</label>
        <br />
        <select
          name="salesAgent"
          id="salesAgent"
          onChange={handleChange}
          value={formData.salesAgent}
          required
        >
          <option value="">Assign Sales Agent</option>
          {agents?.salesAgent?.map((agent) => (
            <option value={agent._id} key={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="leadStatus">Lead Status:</label>
        <br />
        <select
          name="status"
          id="leadStatus"
          onChange={handleChange}
          value={formData.status}
          required
        >
          <option value="">Select Lead Status</option>
          {leadStatuses.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <br />
        <select name="tags" id="tags" multiple value={formData.tags} onChange={handleTagChange}>

        <option value="">Select Tag</option>
          {tagsOptions.map((tag) => (
            <option value={tag} key={tag}>{tag}</option>
          ))}
        </select>
        
        <br />
        <br />

        <label htmlFor="timeToClose">Time to Close:</label>
        <br />

        <input
          type="number"
          id="timeToClose"
          value={formData.timeToClose}
          onChange={handleChange}
          name="timeToClose"
          placeholder="Time To Close (days)"
        />
        <br />
        <br />
        <label htmlFor="priority">Priority:</label>
        <br />
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority</option>
          {priorityOptions.map((priority) => (
            <option value={priority} key={priority}>
              {priority}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit" className="submit-button">
          Create Lead
        </button>
      </form>
    </section>
  );
};

export default LeadForm;
