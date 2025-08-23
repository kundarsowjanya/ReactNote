import { useEffect, useState } from "react";
import Comment from "./Comment.jsx";

function createComment(author, text, parentId = null) {
  return {
    id: Date.now(),
    author,
    text,
    parentId,
    children: [],
    timeStamp: new Date(), // will be serialized; convert on display
  };
}

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [showAll, setShowAll] = useState(false);

 // Load from localStorage only once
useEffect(() => {
  const saved = localStorage.getItem("comments");
  if (saved) {
    try {
      setComments(JSON.parse(saved));
    } catch (e) {
      console.error("Error parsing comments from localStorage", e);
    }
  }
}, []);

// Save to localStorage only when comments is not empty
useEffect(() => {
  if (comments.length > 0) {
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}, [comments]);

  // Add top-level comment
  function addTopLevelComment(author, text) {
    setComments((prev) => [...prev, createComment(author, text)]);
  }

  // Public API for Comment component: (parentId, author, text)
  function addReply(parentId, author, text) {
    const newComment = createComment(author, text, parentId);
    setComments((prev) => addReplyRecursively(prev, parentId, newComment));
  }

  // Insert reply immutably
  function addReplyRecursively(list, parentId, newComment) {
    return list.map((c) => {
      if (c.id === parentId) {
        return { ...c, children: [...c.children, newComment] };
      }
      return { ...c, children: addReplyRecursively(c.children, parentId, newComment) };
    });
  }

  // Edit comment text
  function editComment(id, newText) {
    setComments((prev) => editRecursive(prev, id, newText));
  }
  function editRecursive(list, id, newText) {
    return list.map((c) => {
      if (c.id === id) return { ...c, text: newText };
      return { ...c, children: editRecursive(c.children, id, newText) };
    });
  }

  // Delete comment (and subtree)
  function deleteComment(id) {
    setComments((prev) => deleteRecursive(prev, id));
  }
  function deleteRecursive(list, id) {
    return list
      .filter((c) => c.id !== id)
      .map((c) => ({ ...c, children: deleteRecursive(c.children, id) }));
  }

  // Latest 4 by default (newest first), or all (newest first)
  const commentsToShow = showAll
    ? comments.slice().reverse()
    : comments.slice(-4).reverse();

  function handleAddButtonClick() {
    if (author.trim() && text.trim()) {
      addTopLevelComment(author.trim(), text.trim());
      setAuthor("");
      setText("");
    }
  }

  return (
    <div className="app">
      <h2>Comment Section</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddButtonClick}>Add Comment</button>
      </div>

      <div id="comment-list">
        {commentsToShow.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={addReply}
            onEdit={editComment}
            onDelete={deleteComment}
          />
        ))}
      </div>

      {comments.length > 4 && !showAll && (
        <button className="load-more" onClick={() => setShowAll(true)}>
          Show Previous Comments
        </button>
      )}
    </div>
  );
}
