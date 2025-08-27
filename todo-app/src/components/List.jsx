import React, { useState } from "react";
import Task from "./Task";

export default function List({ list, listIndex, boardData, setBoardData }) {
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (!taskText.trim()) return;
    const newBoard = [...boardData];
    newBoard[listIndex].tasks.push({
      id: Date.now().toString(),
      text: taskText
    });
    setBoardData(newBoard);
    setTaskText("");
  };

  return (
    <div className="list">
      <div className="list-header">
        <input
          type="text"
          value={list.name}
          onChange={(e) => {
            const newBoard = [...boardData];
            newBoard[listIndex].name = e.target.value;
            setBoardData(newBoard);
          }}
        />
      </div>
      <div className="task-container">
        {list.tasks.map((task, idx) => (
          <Task
            key={task.id}
            task={task}
            listIndex={listIndex}
            taskIndex={idx}
            boardData={boardData}
            setBoardData={setBoardData}
          />
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          value={taskText}
          placeholder="New task..."
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
    </div>
  );
}
