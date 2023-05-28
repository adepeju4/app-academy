import { validateCreateTodo, validateUpdateTodo } from "../utils/validators.js";
import { Todo } from "../models/todo.model.js";

const TodoController = {
  getTodos: async (req, res, next) => {
    const todos = await Todo.findAll({ where: { userId: req.user._id } });

    return res.status(200).json({
      status: "success",
      data: todos,
    });
  },

  createTodo: async (req, res, next) => {
    const { error } = validateCreateTodo(req.body);

    if (error) return next({ err: error.message });

    const todo = await Todo.create({ userId: req.user._id, ...req.body });

    return res.status(200).json({
      status: "success",
      data: todo,
    });
  },

  updateTodo: async (req, res, next) => {
    const { todoId } = req.query;

    if (typeof todoId !== "string" || !todoId) {
      return next({ err: "No todoId or Invalid todoId" });
    }

    const { error } = validateUpdateTodo(req.body);

    if (error) return next({ err: error.message });

    let todo = await Todo.findByPk(todoId);

    if (!todo) return next({ err: `Not Found`, status: 404 });

    todo = await Todo.update(req.body, {
      where: { id: todoId },
    });

    return res.status(200).json({
      status: "success",
      data: { updatedCount: todo },
    });
  },

  toggleTodo: async (req, res, next) => {
    const { todoId } = req.query;

    if (typeof todoId !== "string" || !todoId) {
      return next({ err: "No todoId or Invalid todoId" });
    }
  
    let todo = await Todo.findByPk(todoId);
  
    if (!todo) return next({ err: `Not Found`, status: 404 });
  
    todo.completed = !todo.completed;
    
    await todo.save();
  
    return res.status(200).json({
      status: `Todo completed: ${todo.completed}`,
      data: todo,
    });

  },

  deleteTodo: async (req, res, next) => {
    const { todoId } = req.query;

    if (typeof todoId !== "string" || !todoId)
      return next({ err: "No todoId or Invalid todoId" });

    const todo = await Todo.findByPk(todoId);
    if (!todo) return next({ err: `Not Found`, status: 404 });

    await todo.destroy();

    return res.status(200).json({
      status: "success",
    });
  },
};

export default TodoController;
