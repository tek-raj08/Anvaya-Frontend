import React, { useEffect, useState } from "react";

const EditLeadDetails = ({ lead, refreshLead }) => {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: "",
    priority: "",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || "",
        source: lead.source || "",
        salesAgent: lead.salesAgent || "",
        status: lead.status || "",
        tags: lead.tags || [],
        timeToClose: lead.timeToClose || "",
        priority: lead.priority || "",
      });
    }
  }, [lead]);

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
      try {
        const res = await fetch("https://anvaya-backend-git-main-tek-rajs-projects.vercel.app/agents");
        const data = await res.json();
        console.log("From saleData", data);
        setAgent(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((pre) => ({
      ...pre,
      [name]: name === "timeToClose" ? parseInt(value) : value,
    }));
  };

  const handleTagChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://anvaya-backend-git-main-tek-rajs-projects.vercel.app/leads/${lead?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw "Failed to add New Lead.";
      }

      const data = await response.json();
      console.log("Lead is updated successfully.", data);

      if (refreshLead) {
        refreshLead();
      }
    } catch (error) {
      console.log("Error updating lead:", error.message);
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
        {tagsOptions.map((tag) => (
          <label htmlFor={tag} key={tag}>
            <input
              type="checkbox"
              name="tags"
              id={tag}
              onChange={() => handleTagChange(tag)}
              checked={formData.tags.includes(tag)}
            />
            {tag}
          </label>
        ))}
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
          Update Lead
        </button>
      </form>
    </section>
  );
};

export default EditLeadDetails;
