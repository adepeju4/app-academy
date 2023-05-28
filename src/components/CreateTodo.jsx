import React, { useState, useContext, useEffect } from "react";
import { TodoContext } from "../store/context";
import { useSnackbar } from "notistack";
import useFetch from "../lib/useFetch";

function CreateTodo() {
  const { dispatch } = useContext(TodoContext);
  const { enqueueSnackbar } = useSnackbar();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const [decripLength, setDescripLength] = useState(todo.description.length);

  const {
    executeFetch: callAddTodo,
    loading: addLoading,
    error: addError,
    data: addData,
  } = useFetch("todo");

  const addTodo = async (e) => {
    e.preventDefault();
    await callAddTodo({
      method: "POST",
      body: todo,
    });

    setDescripLength(0)
    setTodo({
      title: "",
      description: "",
    });
   
  };

  const handleTitleChange = (event) => {
    setTodo({ ...todo, title: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setDescripLength(event.target.value.length);
    if(decripLength <= 252)setTodo({ ...todo, description: event.target.value });
  };

  useEffect(() => {
    if (addData) {
      dispatch({ type: "ADD TODO", payload: addData.data });
      enqueueSnackbar("Task created successfully", { variant: "success" });
    }
  }, [addData]);

  useEffect(() => {
    if (addError) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [addError]);

  return (
    <form onSubmit={addTodo} className="add--todo">
      <label htmlFor="title">
        Title:{" "}
        <input
          id="title"
          type="text"
          onChange={handleTitleChange}
          value={todo.title}
          required
        />
      </label>

      <label htmlFor="description">
        Description:{" "}
        <textarea
          id="description"
          onChange={handleDescriptionChange}
          value={todo.description}
          type="text"
        />
        <p>{`${decripLength}/255`}</p>
      </label>

      <button type="submit">{addLoading ? "Creating.." : "Create Todo"}</button>
    </form>
  );
}

export default CreateTodo;
