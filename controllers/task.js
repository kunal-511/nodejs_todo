import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


// Creating a new task controller
export const createTask = async (req, res, next) => {

try {
    const {title, description} = req.body

await Task.create({title, description, user:req.user})

res.status(201).json({
    success: true,
    message: "Task Created Successfully"
});

} catch (error) {
    next(error)
}

}

// Getting all tasks controller
export const getMyTask = async (req, res, next) => {
   try {
    const userId = req.user._id


    const tasks = await Task.find({user:userId})
    res.status(200).json({
        success: true,
        tasks
    });
   } catch (error) {
    next(error)
   }
}

// Updating a task controller
export const updateTask = async (req, res, next) => {

try {
    const task = await Task.findById(req.params.id)
task.isCompleted = !task.isCompleted
await task.save()


if(!task) return next(new ErrorHandler("Task not found", 404));


res.status(200).json({
    success: true,
    message: "Task Updated Successfully"
});
} catch (error) {
 next(error)   
}
}

// Deleting a task controller
export const delteTask = async (req, res, next) => {

   try {
    const task = await Task.findById(req.params.id)


    if(!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne()
    res.status(200).json({
        success: true,
        message: "Task Deleted Successfully"
    });
   } catch (error) {
    next(error)
   }
}