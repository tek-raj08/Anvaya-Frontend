import React, { useState } from "react";
import { useEffect } from "react";

const EditCommentForm = ({ lead }) => {
  const [agents, setAgents] = useState([]);
  const [comments , setComment] = useState([])

  useEffect(() => {
    try {
      const fetchSalesAgent = async () => {
        const response = await fetch("https://anvaya-backend-git-main-tek-rajs-projects.vercel.app/agents");

        const data = await response.json();
        console.log("From Edit comment form:", data);

        setAgents(data.salesAgent);
      };
      fetchSalesAgent();
    } catch (error) {
      console.error("Failed to get data.", error);
    }
  }, []);

  useEffect(() => {
    if (!lead || !lead._id) return;

    console.log("Lead value", lead);
    const fetchComment = async () => {
      try {
        const response = await fetch(
          `https://anvaya-backend-git-main-tek-rajs-projects.vercel.app/leads/${lead._id}/comments`
        );

        const data = await response.json();
        setComment(data.formattedComments)
        console.log("Form fetchComment:", data);
      } catch (error) {
        console.error("Failed to get comment data:", error);
      }
    };

    fetchComment();
  }, [lead]);

  const [formData, setFormData] = useState({
    author: "",
    commentText: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const response = await fetch(
          `https://anvaya-backend-git-main-tek-rajs-projects.vercel.app/comments/${comments.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw "Failed to updated comment.";
        }

        const data = await response.json();

        return console.log("Comment updated successfully.", data);
      } catch (error) {
        console.error("Failed to update comment:", error);
        return console.log("Failed to update comment.");
      }
    };
  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="agents">Sales Agent:</label>
      <br />
      <select
        name="author"
        id="agents"
        onChange={handleChange}
        value={formData.author}
      >
        <option value="">Select Sales Agents</option>
        {comments?.map((comment) => (
          <option value={comment?.authorId} key={comment.id}>
            {comment.author}
          </option>
        ))}
      </select>
      <br />
      <br />
      <label htmlFor="comment">Update Comment:</label> <br />
      <textarea
        name="commentText"
        id="comment"
        rows={4}
        value={formData.commentText}
        onChange={handleChange}
      ></textarea>
      <br />
      <br />
      <button type="submit">Update Comment</button>
    </form>
  );
};

export default EditCommentForm;
