import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

export default function App() {
  const [boardData, setBoardData] = useState(() => {
    const saved = localStorage.getItem("kanbanBoard");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "list-1", name: "Todo", tasks: [{ id: "task-1", text: "Learn React" }] },
          { id: "list-2", name: "In Progress", tasks: [{ id: "task-2", text: "Build Kanban" }] },
          { id: "list-3", name: "Review", tasks: [] },
          { id: "list-4", name: "Done", tasks: [] }
        ];
  });

  useEffect(() => {
    localStorage.setItem("kanbanBoard", JSON.stringify(boardData));
  }, [boardData]);

  return (
    <div className="App">
      <h1>Kanban Board (react-draggable)</h1>
      <Board boardData={boardData} setBoardData={setBoardData} />
    </div>
  );
}
