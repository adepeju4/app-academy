import Joi from "joi";

export function validateRegister(value) {
  const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  return registerSchema.validate(value, {
    allowUnknown: false,
  });
}

export function validateLogin(value) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return loginSchema.validate(value, {
    allowUnknown: false,
  });
}

export function validateCreateTodo(value) {
  const todoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    completed: Joi.boolean().optional(),
  });

  return todoSchema.validate(value, {
    allowUnknown: false,
  });
}

export function validateUpdateTodo(value) {
  const todoSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().allow("").optional(),
    completed: Joi.boolean().optional(),
  });

  return todoSchema.validate(value, {
    allowUnknown: false,
  });
}
