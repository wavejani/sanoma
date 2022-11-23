//
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

// moment.js date
let date = moment();
let currentDate = date.format('D/MM/YYYY'); 
console.log(currentDate); 
document.getElementById("date").innerHTML = currentDate;


// Modal form 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("virhe");
    msg.innerHTML = "Kirjoita nimi";
  } else {
    console.log("ok");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// Collect form data
let data = [{}];

let acceptData = () => {
  data.push({
    date: currentDate,  
    text: textInput.value.toUpperCase(),
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

// Print
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="small text-primary">${x.date}</span>
          <span class="fw-bold">${x.text}</span>
          <p>${x.description}</p>
  
          <span class="options" style="color: #1DA1F2;">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit fa-lg"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt fa-lg"></i>
          </span>
        </div>
    `);
  });
  resetForm();
};

// Delete
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data); 
};

// Edit
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

// Reset
let resetForm = () => {
  textInput.value = "";
  textarea.value = "";
};

// Local storage
(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();



