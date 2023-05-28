
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT USER":
      return { ...state, isAuthenticated: false, user: null };
    case "AUTHENTICATE USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD TODO":
      return [...state, { ...action.payload, completed: false }];
    case "EDIT TODO":
      const todoIdx = state.find((todo) => todo.id === action.payload.todoId);
      state[todoIdx] = { ...state[todoIdx], ...action.payload };
    case "TOGGLE TODO":
      return state.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE TODO":
      const newState = [...state];
      const todoIndex = newState.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      if (todoIndex !== -1) {
        newState.splice(todoIndex, 1);
      }
      return newState;
    case "SET TODOS":
      return (state = action.payload);
    default:
      return state;
  }
};
