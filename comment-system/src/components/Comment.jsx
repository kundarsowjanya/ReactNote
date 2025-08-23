import { useState } from "react";

export default function Comment({ comment, onReply, onEdit, onDelete }) {
  const [showChildren, setShowChildren] = useState(true);

  const ts = new Date(comment.timeStamp); // works if string or Date

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.author}</strong> •{" "}
        <span className="time">{ts.toLocaleString()}</span>
      </div>

      <div className="comment-text">{comment.text}</div>

      <div className="comment-actions">
        <button
          onClick={() => {
            const name = prompt("Enter your name:");
            const replyText = prompt("Enter your reply:");
            if (name && replyText) onReply(comment.id, name, replyText);
          }}
        >
          Reply
        </button>

        <button
          onClick={() => {
            const edited = prompt("Edit your comment:", comment.text);
            if (edited !== null && edited !== undefined) onEdit(comment.id, edited);
          }}
        >
          Edit
        </button>

        <button
          onClick={() => {
            if (window.confirm("Delete this comment?")) onDelete(comment.id);
          }}
        >
          Delete
        </button>

        {comment.children.length > 0 && (
          <button className="toggle" onClick={() => setShowChildren((v) => !v)}>
            {showChildren ? "Hide Replies" : "Show Replies"}
          </button>
        )}
      </div>

      {showChildren && comment.children.length > 0 && (
        <div className="child-comments">
          {comment.children
            .slice()           // copy
            .reverse()         // newest replies first
            .map((child) => (
              <Comment
                key={child.id}
                comment={child}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
}
