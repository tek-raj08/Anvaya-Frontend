import React, { useEffect, useState } from "react";

const CommentSection = ({ lead }) => {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if(!lead?._id) return;
    try {
      const fetchComment = async () => {
        // console.log("Lead Value:", lead)
        const response = await fetch(
          `https://anvaya-backend-git-main-tek-rajs-projects.vercel.app/leads/${lead?._id}/comments`
        );
        const data = await response.json();
        // console.log("From Fetch comment:", data);
        setComment(data);
      };

      fetchComment();
    } catch (error) {
      console.log("Failed to fetch comment:", error);
    }
  }, [lead]);
  return (
    <section>
      <h2>Comment Section</h2>
      {comment?.formattedComments?.map((p) => {
        const createdAt = new Date(p.createdAt);
        const date = createdAt.toLocaleDateString();
        const time = createdAt.toLocaleTimeString();

        return (
          
            <div key={p.id}>
              <p>
                <strong>[{p.author}]</strong> - [{date} / {time}]
              </p>
              <p>
                <strong>[Comment]</strong> - [{p.commentText}]
              </p>
            </div>
          
        );
      })}
    </section>
  );
};

export default CommentSection;
