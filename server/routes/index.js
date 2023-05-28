import auth from "../middlewares/authorization.js";
import AuthController from "../controllers/auth.controller.js";
import TodoController from "../controllers/todo.controller.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { Router } from "express";
const router = Router();

router.get("/ping", (req, res) => {
  return res.json("pong");
});
router.post("/register", catchAsyncErrors(AuthController.signup));
router.post("/login", catchAsyncErrors(AuthController.login));
router.post("/logout", catchAsyncErrors(AuthController.logout));

router.get('/todo', auth, catchAsyncErrors(TodoController.getTodos))
router.post("/todo", auth, catchAsyncErrors(TodoController.createTodo));
router.patch("/todo", auth, catchAsyncErrors(TodoController.updateTodo));
router.patch("/todo/complete", auth, catchAsyncErrors(TodoController.toggleTodo));
router.delete("/todo", auth, catchAsyncErrors(TodoController.deleteTodo));

export default router;
