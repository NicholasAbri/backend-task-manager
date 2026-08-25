const { body, validationResult } = require("express-validator");

// Reusable middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Validation chain for creating a task (POST /tasks)
const validateCreateTask = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("DueDate must be a valid ISO 8601 date"),
  handleValidationErrors,
];

// Validation chain for updating a task (PUT /tasks/:id)
const validateUpdateTask = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("DueDate must be a valid ISO 8601 date"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateCreateTask,
  validateUpdateTask,
};
