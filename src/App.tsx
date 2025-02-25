import React, { useState, useEffect } from "react";
import TodoList from "./components/ToDoList";
import { Todos } from "./types";
import { Title } from "./components/Title/Titile";
import BottonLine from "./components/BottonLine";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos>([]);
  const [inputValue, setInputValue] = useState("");
  const [showAdd, setShowAdd] = useState<boolean>(false);

  useEffect(() => {
    showBottonAdd(inputValue);
  }, [showAdd, inputValue]);

  const showBottonAdd = (value: string) => {
    setShowAdd(value.length > 0);
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-mainGrayBG">
      <div className="bg-toDoListBG p-6 rounded shadow-md w-[600px] flex flex-col z-30">
        <Title />
        {/* Input для новой задачи */}
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-toDoListInputBG w-full p-4 rounded text-textToDoList border-b-2"
            placeholder="What needs to be done?"
          />
          {showAdd && (
            <button
              className="ml-2 px-4 py-2 bg-titleBG text-textToDoList rounded hover:bg-textToDoList hover:text-titleBG"
              onClick={addTodo}>
              Add
            </button>
          )}
        </div>

        {/* Список задач */}
        <div>
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>

        {/* Количество оставшихся задач */}
        <div className="flex justify-between bg-toDoItemBG text-sm">
          <p className="my-2 px-4 p-2 text-textLightGray rounded hover:text-gray-700">
            Remaining tasks: {todos.filter((todo) => !todo.completed).length}
          </p>

          {/* Очистка выполненных задач */}
          <h2 className="my-2 px-4 p-2 text-textLightGray rounded hover:text-gray-700">
            All Tasks
          </h2>

          <button
            className="my-2 px-4 p-2 text-textLightGray rounded hover:text-gray-700"
            onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
      <BottonLine
        color="bg-toDoListBG"
        sizeWidth={590}
        z={20}
        bgShadow="bg-black"
      />
      <BottonLine
        color="bg-toDoListBG"
        sizeWidth={580}
        z={10}
        bgShadow="bg-black"
      />
    </div>
  );
};

export default App;
