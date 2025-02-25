import React from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-4 bg-toDoItemBG rounded border-b-2 shadowElement">
      {/* Круговой индикатор */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-2 cursor-pointer"
        />
        <span
          className={`cursor-pointer ${
            todo.completed
              ? "line-through text-gray-400 text-xl font-light"
              : "text-textToDoList text-xl font-light"
          }`}>
          {todo.text}
        </span>
      </div>

      {/* Кнопка удаления */}
      <button
        className="text-red-300 hover:text-red-700"
        onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
