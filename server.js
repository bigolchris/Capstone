const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
app.listen(4000, () => console.log('Server is running'))

let tasks = [];
const html = `<main class="main_container">
<div class="list_container todo_container" data-board="todo">
  <h2 class="list_title todo_container_title">To-Do</h2>
  <input type="text" class="input_form  todo_input" placeholder="Enter a task">
  <button class="list_new_task_button todo_list_new_task" >New Task</button>
  <ul class="list todo_list" >
  </ul>
</div>
<div class="list_container in_progress_container" data-board="in_progress">
    <h2 class="list_title in_progress_title">In Progress</h2>
    <input type="text" class="input_form in_progress_input" placeholder="Enter a task">
    <button class="list_new_task_button todo_list_new_task">New Task</button>
    <ul class="list in_progress_list" ></ul>
</div>
<div class="list_container completed_container" data-board="completed">
    <h2 class="list_title completed_container_title">Completed</h2>
    <input type="text" class="input_form completed_input" placeholder="Enter a task">
    <button class="list_new_task_button todo_list_new_task" >New Task</button>
    <ul class="list completed_list" ></ul>
</div>
</main>`;

//get request to serve html;
app.get('/getHTML', (req, res) => {
    res.send(html);
})
//post push req body into the tasks array
app.post('/postNewTask', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    console.log("completed")
    return
})