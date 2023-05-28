import { TodoContext } from "../store/context";
import useFetch from "../lib/useFetch";
import { useSnackbar } from "notistack";
import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from "react";
import {
  BsFillTrash2Fill,
  BsPencil,
  BsToggleOff,
  BsToggleOn,
} from "react-icons/bs";

function Todo({ todo }) {
  const { dispatch } = useContext(TodoContext);
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);

  const [editMode, setEditMode] = useState(false);

  const {
    executeFetch: callEditTodos,
    loading: editLoading,
    error: editError,
    data: editData,
  } = useFetch("todo");
  const {
    executeFetch: callDeleteTodos,
    error: deleteError,
    data: deleteData,
  } = useFetch("todo");
  const {
    executeFetch: callToggleTodo,
    error: toggleError,
    data: toggleData,
  } = useFetch("todo/complete");

  const errorMessage = "Something unexpected happened, please try again.";

  const editTodo = async (todoId, todo) => {
    await callEditTodos({
      method: "PATCH",
      body: {
        title,
        description,
      },
      queryParams: {
        todoId,
      },
    });
    dispatch({ type: "EDIT TODO", payload: todo });
  };

  const deleteTodo = async (todoId) => {
    await callDeleteTodos({
      method: "DELETE",
      queryParams: {
        todoId,
      },
    });
  };

  const toggleTodo = async (todoId) => {
    await callToggleTodo({
      method: "PATCH",
      queryParams: {
        todoId,
      },
    });
    dispatch({ type: "TOGGLE TODO", payload: { todoId } });
  };

  useEffect(() => {
    if (editError) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [editError]);

  useEffect(() => {
    if (deleteError) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [deleteError]);

  useEffect(() => {
    if (toggleError) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [toggleError]);

  useEffect(() => {
    if (editData) {
      setEditMode(false);
      enqueueSnackbar("Task edited successfully", { variant: "success" });
    }
  }, [editData]);

  useEffect(() => {
    if (deleteData) {
      dispatch({ type: "DELETE TODO", payload: { todoId: todo.id } });
      enqueueSnackbar("Task deleted successfully", { variant: "success" });
    }
  }, [deleteData]);

  useEffect(() => {
    if (toggleData) {
      setCompleted(toggleData.data.completed);

      enqueueSnackbar(
        `Task ${
          toggleData.data.completed ? "set to completed" : "set to uncompleted"
        } `,
        { variant: "success" }
      );
    }
  }, [toggleData]);

  return (
    <li key={todo.id} className="todo">
      {!editMode ? (
        <div className="todo--item">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      ) : (
        <div className="todo--item">
          <input
            value={title}
            placeholder="title"
            readOnly={!editMode}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id={description}
            placeholder="description"
            value={description}
            readOnly={!editMode}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}

      <div className="actions">
        <div className="edit--action">
          {!editMode ? (
            <BsPencil onClick={() => setEditMode(true)} />
          ) : (
            <button onClick={() => editTodo(todo.id, { title, description })}>
              {editLoading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <div className="delete--action">
          <BsFillTrash2Fill onClick={() => deleteTodo(todo.id)} />
        </div>

        <div className="toggle--action">
          {completed ? (
            <BsToggleOn onClick={() => toggleTodo(todo.id)} />
          ) : (
            <BsToggleOff onClick={() => toggleTodo(todo.id)} />
          )}
        </div>
      </div>
    </li>
  );
}


Todo.propTypes = {
  todo: PropTypes.node,
};

export default Todo;
