import React, { useContext, useState, useEffect } from "react";

import Todo from "./Todo.jsx";
import useFetch from "../lib/useFetch.js";
import { TodoContext } from "../store/context.jsx";
import CreateTodo from "./CreateTodo.jsx";
import Logout from "./Logout.jsx";
import { BsPencil } from "react-icons/bs";
import { useSnackbar } from "notistack";

function Todolist() {
  const { todos, dispatch } = useContext(TodoContext);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const { enqueueSnackbar } = useSnackbar();

  const { executeFetch: grabTodos, data, loading, error } = useFetch("todo");

  useEffect(() => {
    setTodos();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET TODOS", payload: data.data });
    }
  }, [data]);

  const setTodos = async () => {
    await grabTodos();
    if (!loading && data && !error) {
      dispatch({ type: "SET TODOS", payload: data.data });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Something unexpected happened, please try again", {
        variant: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  useEffect(() => {
    let filtered = todos;

    if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed === true);
    } else if (filter === "active") {
      filtered = filtered.filter((todo) => todo.completed === false);
    }

    // sort the filtered todos
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredTodos(filtered);
  }, [filter, todos, sortOrder]);

  return (
    <>
      <header className="todo--header">
        <Logout />
        <BsPencil />
        <h3>Create and manage your tasks</h3>
      </header>
      <main className="todo--main">
        <div className="todo--cover">
          <CreateTodo />

          <div className="todo--list">
            <div className="list--heading">
              <h1>TODOS</h1>

              <div className="list--actions">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="active">Active</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Oldest</option>
                  <option value="desc">Newest</option>
                </select>
              </div>
            </div>
            <hr />
            <ul>
              {loading ? (
                <p>Loading...</p>
              ) : (
                filteredTodos.map((todo) => <Todo todo={todo} key={todo.id} />)
              )}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default Todolist;
