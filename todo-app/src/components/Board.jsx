import React from "react";
import List from "./List";


export default function Board({ boardData, setBoardData }) {
  return (
    <div className="board">
      {boardData.map((list, index) => (
        <List
          key={list.id}
          list={list}
          listIndex={index}
          boardData={boardData}
          setBoardData={setBoardData}
        />
      ))}
    </div>
  );
}
