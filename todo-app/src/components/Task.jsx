import React, { useRef } from "react";
import Draggable from "react-draggable";

export default function Task({ task, listIndex, taskIndex, boardData, setBoardData }) {
  const nodeRef = useRef(null);

  const deleteTask = () => {
    const newBoard = [...boardData];
    newBoard[listIndex].tasks.splice(taskIndex, 1);
    setBoardData(newBoard);
  };

  return (
    <Draggable axis="y" bounds="parent" nodeRef={nodeRef}>
      <div ref={nodeRef} className="task">
        <span>{task.text}</span>
        <button onClick={deleteTask}>❌</button>
      </div>
    </Draggable>
  );
}
