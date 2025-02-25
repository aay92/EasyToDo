import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../App";

//Проверка рендера компонента
test("renders App component without crashing", () => {
  render(<App />);
  const appElement = screen.getByRole("main");
  expect(appElement).toBeInTheDocument();
});

//Проверка добавления новой задачи
test("adds a new todo item", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done?/i);
  const addButton = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.click(addButton);

  const todoItem = await screen.findByText(/test task/i);
  expect(todoItem).toBeInTheDocument();
});

//Проверка отображения количества оставшихся задач
test("displays the correct number of remaining tasks", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done?/i);
  const addButton = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: "Task 1" } });
  fireEvent.click(addButton);

  const remainingTasks = await screen.findByText(/remaining tasks: 1/i);
  expect(remainingTasks).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "Task 2" } });
  fireEvent.click(addButton);

  const updatedRemainingTasks = screen.getByText(/remaining tasks: 2/i);
  expect(updatedRemainingTasks).toBeInTheDocument();
});

//Проверка завершения задачи
test("marks a todo as completed", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done?/i);
  const addButton = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.click(addButton);

  const todoItem = await screen.findByText(/test task/i);
  fireEvent.click(todoItem);

  const completedTask = screen.queryByText(/test task/i, { exact: false });
  expect(completedTask).toHaveStyle({ textDecoration: "line-through" });
});

//Проверка удаления задачи
test("deletes a todo item", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done?/i);
  const addButton = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.click(addButton);

  const todoItem = await screen.findByText(/test task/i);
  const deleteButton = within(todoItem).getByTitle(/delete/i); // Предполагается, что у кнопки есть title="delete"
  fireEvent.click(deleteButton);

  const deletedTask = screen.queryByText(/test task/i);
  expect(deletedTask).not.toBeInTheDocument();
});
//Проверка очистки выполненных задач
test("clears all completed todos", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done?/i);
  const addButton = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: "Task 1" } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: "Task 2" } });
  fireEvent.click(addButton);

  const todoItems = await screen.findAllByText(/task/i);
  fireEvent.click(todoItems[0]); // Завершаем первую задачу

  const clearCompletedButton = screen.getByText(/clear completed/i);
  fireEvent.click(clearCompletedButton);

  const remainingTasks = screen.getByText(/remaining tasks: 1/i);
  expect(remainingTasks).toBeInTheDocument();
});

//Проверка отображения кнопки "Add"
test("shows the 'Add' button when input is not empty", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done?/i);
  const addButton = screen.queryByText(/add/i);

  expect(addButton).not.toBeInTheDocument(); // Кнопка не видна изначально

  fireEvent.change(input, { target: { value: "Test Task" } });
  const visibleAddButton = screen.getByText(/add/i);
  expect(visibleAddButton).toBeInTheDocument(); // Кнопка становится видимой
});

//Проверка начального состояния
test("initially displays no todos", () => {
  render(<App />);
  const todoList = screen.queryAllByText(/test task/i);
  expect(todoList.length).toBe(0);
});

//Проверка работы с клавиатурой
test("adds a new todo on pressing Enter key", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done?/i);

  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.keyPress(input, { key: "Enter", code: 13 });

  const todoItem = await screen.findByText(/test task/i);
  expect(todoItem).toBeInTheDocument();
});
