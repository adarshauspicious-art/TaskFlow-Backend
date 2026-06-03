import ToDo from "../models/toDo-model.js";


// CREATE TODO
export const createToDo = async (req, res) => {
  try {
    const { title } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // Create Todo
    const toDo = await ToDo.create({
      title,
      user: req.user.id,
      completed: false,
    });

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo: toDo,
    });

  } catch (error) {
    console.log("CREATE TODO ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// GET ALL TODOS
export const getToDos = async (req, res) => {
  try {

    const todos = await ToDo.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      todos,
    });

  } catch (error) {
    console.log("GET TODOS ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// TOGGLE TODO
export const toggleToDo = async (req, res) => {
  try {

    const todo = await ToDo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    // Check if todo exists
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Toggle completed state
    todo.completed = !todo.completed;

    // Save updated todo
    await todo.save();

    return res.status(200).json({
      success: true,
      message: todo.completed
        ? "Task completed"
        : "Task marked incomplete",
      todo,
    });

  } catch (error) {
    console.log("TOGGLE TODO ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// DELETE TODO
export const deleteToDo = async (req, res) => {
  try {

    const deletedTodo = await ToDo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    // Check if todo exists
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });

  } catch (error) {
    console.log("DELETE TODO ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  try {

    return res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {
    console.log("GET CURRENT USER ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};