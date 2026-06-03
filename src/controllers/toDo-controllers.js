import ToDo from "../models/toDo-model.js";

export const createToDo = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("USER:", req.user);

    const toDo = await ToDo.create({
      title: req.body.title,
      user: req.user.id,
      completed: false,
    });

    return res.status(200).json({
      success: true,
      message: "Created Successfully",
      toDo,
    });
  } catch (error) {
    console.log(error); 
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getToDos = async (req, res) => {
  try {
    const todos = await ToDo.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const toggleToDo = async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "ToDo not found",
      });
    }
    todo.completed = !todo.completed;
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Task Completed  ",
      todo,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteToDo = async (req, res) => {
  try {
    await ToDo.findByIdAndDelete(req.params.id);

    res.json({ message: "ToDo Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
    });
  }
};
              