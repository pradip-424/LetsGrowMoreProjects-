const taskinput = document.querySelector(".task-in input");
const taskBox=document.querySelector(".task-box");
const filters=document.querySelectorAll(".filters span");
const clearAll=document.querySelector(".clear")
let editId;
let isEditedTask=false;

filters.forEach(button => {
 button.addEventListener("click",()=>{

    document.querySelector(".filters .active").classList.remove("active")
   button.classList.add("active")
   showtodo(button.id);

 })


})

//getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));
function showtodo(filter) {
 let li = "";
 if(todos){
  todos.forEach((todo, id) => {
    //if todo status is completed ,set the iscomplted value to checked
   let iscompleted= todo.status== "completed" ? "checked" : "";
   if(filter==todo.status || filter=="all"){


    li  += `  <li class="task">
    <label for="${id}">
     <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${iscompleted}>
    <p class="${iscompleted}">${todo.name}</p>
   </label>
   <div class="settings">
   <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
   <ul class="task-menu">
       <li onclick="editTask(${id} ,'${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
       <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>

   </ul>

</div>
</li>`;

   }
  
   });
  }
   taskBox.innerHTML=li || `<span>you don't have ay task here</span>`
}
showtodo("all")
function showMenu(selectedTask){
 let taskMenu=selectedTask.parentElement.lastElementChild;
 taskMenu.classList.add("show");
 document.addEventListener("click",e=>{
  //removing show class from the menu on the documnet click
  if(e.target.tagName !="I" || e.target != selectedTask){
    taskMenu.classList.remove("show");
  }
 })
}


 function updateStatus(selectedTask){
   //getting paragraph that contains task name
   let taskname=selectedTask.parentElement.lastElementChild;
   if(selectedTask.checked){
     taskname.classList.add("checked")
     //updating the status of selected task to complted
     todos[selectedTask.id].status="completed"
   }
   else{
     taskname.classList.remove("checked")
         //updating the status of selected task to pending
 
     todos[selectedTask.id].status="pending"
 
   }
   localStorage.setItem("todo-list",JSON.stringify( todos));
 }

function editTask(taskid,taskname){
  editId=taskid;
taskinput.value=taskname;
isEditedTask=true;
}
  
function deleteTask(deleteid){
  //removing selected task from todos

  todos.splice(deleteid,1);
  localStorage.setItem("todo-list",JSON.stringify(todos))
showtodo("all");
}
clearAll.addEventListener("click", ()=>{
  todos.splice(0,todos.length);
  localStorage.setItem("todo-list",JSON.stringify(todos))
showtodo("all");

})

taskinput.addEventListener("keyup", e => {
  
    let userTask = taskinput.value.trim();
    if (e.key == "Enter" && userTask) {
    
        if(!isEditedTask){
          if (!todos) {
          todos = [];
        }
        let taskInfo = { name: userTask, status: "pending" };
         todos.push(taskInfo); //adding new task to todo
  
      }else{
        isEditedTask=false;
        todos[editId].name=userTask
      }
      taskinput.value = "";
    localStorage.setItem("todo-list",JSON.stringify( todos));
   showtodo("all");
    }
  
});


