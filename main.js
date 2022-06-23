import './style.css'

import axios from 'axios';


// const btns = document.querySelectorAll(".list_new_task_button");
// const lists = document.querySelectorAll(".list");
// const boards = ["todo", "in_progress", "completed"];
// // const tasks = await getTasks();

const getHTML = async () => {
    const res = await axios.get("http://localhost:4000/getHTML");
    const html = res.data;
    document.body.innerHTML += html;
}
await getHTML();

const btns = document.querySelectorAll(".list_new_task_button");
const lists = document.querySelectorAll(".list");
const boards = ["todo", "in_progress", "completed"];

const postTask = async (task) => {
    try {
      await axios.post("http://localhost:4000/postNewTask", {body: task})
             
    
    } catch (err) {
        
    }
}

for(let btn of btns) {
    btn.addEventListener("click", async (e) => {
        const board = e.target.parentElement.dataset.board;
        const taskDesc = document.querySelector(`.${board}_input`).value;
        const listItem = `<li >
        <p>${taskDesc}</p>
        <button class="move_left">Left</button>
        <button class="delete_btn">Delete</button>
        <button class="move_right">Right</button>
      </li>`
        const list = document.querySelector(`.${board}_list`)
        list.innerHTML += listItem;
        try {
        await postTask(taskDesc);
      } catch (err) {
        
      }
        // select list element
        // append new list item to list element
    })
}

for(let list of lists) {
    list.addEventListener("click", async (e)=> {
        if(e.target.classList.contains("delete_btn")) {
            e.target.parentElement.remove();
        }
        if(e.target.classList.contains("move_right")) {
            const board = e.target.parentElement.parentElement.parentElement.dataset.board;
            const newBoardIndex = boards.indexOf(board)+1;
            if(boards.indexOf(board) !== boards.length-1) {
                const newDiv = document.querySelector(`.${boards[newBoardIndex]}_container`)
                const newList = newDiv.querySelector("ul");
                newList.innerHTML += e.target.parentElement.outerHTML;
                e.target.parentElement.remove();
            }
        }
        if(e.target.classList.contains("move_left")) {
            const board = e.target.parentElement.parentElement.parentElement.dataset.board;
            const newBoardIndex = boards.indexOf(board)-1;
            if(boards.indexOf(board) !== 0) {
                const newDiv = document.querySelector(`.${boards[newBoardIndex]}_container`)
                const newList = newDiv.querySelector("ul");
                newList.innerHTML += e.target.parentElement.outerHTML;
                e.target.parentElement.remove();
            }
        }
    })
}
