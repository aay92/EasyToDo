const ToDoConponent = () => {
  return (
    <div className="w-[500px] h-[300px] bg-toDoListBG">
      <div>
        <form action="" className="flex gap-3 justify-around">
          <input
            type="text"
            className="p-2 w-full border border-gray-300 rounded"
            placeholder="What needs to be done?"
          />
          <button className="ml-2 w-1/2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Добавить задачу
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToDoConponent;
