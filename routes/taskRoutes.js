const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../middleware/validation");

router.post("/", validateCreateTask, createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", validateUpdateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

