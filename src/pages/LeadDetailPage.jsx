import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackToDarshboard from "../components/BackToDarshboard";
import "./LeadDetailPage.css";
import EditLeadDetails from "../components/EditLeadDetails";
import CommentSection from "../components/CommentSection";
import CommentForm from "../components/CommentForm";
import EditCommentForm from "../components/EditCommentForm";

const LeadDetailPage = () => {
  const { leadId } = useParams();
  const [lead, setLead] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditForm = () => {
    setShowEditForm((prev) => !prev);
  };
  const fetchLead = async () => {
    try {
      const response = await fetch(`https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/leads/${leadId}`);
      const data = await response.json();
      // console.log("from lead Detal page:", data);
      setLead(data.lead);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [leadId]);

  return (
    <>
      <h1 className="dashboard-title">Lead Management: [{lead?.name}]</h1>
      <div className="dashboard">
        <BackToDarshboard />

        <div className="main-content">
          <h2>Lead Detail</h2>
          <div className="lead-info-card">
            <p>
              <strong>Lead Name: </strong>[{lead?.name}]
            </p>
            <p>
              <strong>Sales Agent: </strong>[{lead?.salesAgent.name}]
            </p>
            <p>
              <strong>Lead Source: </strong>[{lead?.source}]
            </p>
            <p>
              <strong>Lead Status: </strong>[{lead?.status}]
            </p>
            <p>
              <strong>Lead Tags: </strong>[{lead?.tags.join(", ")}]
            </p>
            <p>
              <strong>Priority: </strong>[{lead?.priority}]
            </p>
            <p>
              <strong>Time to Close: </strong>[{lead?.timeToClose} Days]
            </p>
          </div>

          <div className="lead-edit">
            <button onClick={() => handleEditForm()}>
              {showEditForm ? "Close Form" : "Edit Lead Details"}{" "}
            </button>

            {showEditForm && (
              <EditLeadDetails lead={lead} refreshLead={fetchLead} />
            )}
          </div>

          <section className="comment-section">
            <CommentSection lead={lead} />
            <CommentForm lead={lead}/>
            {/* {lead && <EditCommentForm lead={lead} />} */}
          </section>
        </div>
      </div>
    </>
  );
};

export default LeadDetailPage;
