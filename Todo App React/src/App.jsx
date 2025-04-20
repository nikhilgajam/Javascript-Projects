import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import TodoList from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      })
    });
  }

  function addTodo(title) {
    setTodos(currentTodos => {
      if(currentTodos.some(todo => todo.title === title)) {
        window.alert(`This TODO already exists: ${title}`);
        return currentTodos;
      }

      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
        }
      ]
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <Form onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}
