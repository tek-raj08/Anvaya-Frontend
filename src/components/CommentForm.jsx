import React from "react";
import { useState } from "react";
import "./CommentForm.css"

const CommentForm = ({lead}) => {
  const [commentData, setCommentData] = useState({
    commentText: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://anvaya-backend-git-main-tek-rajs-projects.vercel.app/leads/${lead?._id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw "Failed to add new comment";
      }

      const data = await response.json();
      console.log("New comment added successfully.", data);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <form className="comment-container" onSubmit={handleSubmit}>
      <label className="comment-label" htmlFor="add-Comment">Add New Comment:</label> <br />
      <input
      className="comment-input"
        type="text"
        name="commentText"
        id="add-Comment"
        placeholder="add new comment"
        onChange={handleChange}
        value={commentData.commentText}
        required
      />
      <br />
      <br />
      <button className="submit-comment-button" type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
