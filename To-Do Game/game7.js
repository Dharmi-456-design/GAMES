//DOM ELEMENTS

var todoList = []
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button")
var todoInput = document.getElementById("todo-input")
var deleteAllButton = document.getElementById("delete-all")
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected")
var all = document.getElementById("all")
var rem = document.getElementById("rem")
var com = document.getElementById("com")


function updateList(){
  comdoList = todoList.filter((data)=> {
    // if(data.complete == true){
    //     return data;
    return data.complete;
    
  });

  remList = todoList.filter((data)=> {
    // if(data.complete == false){
    //     return data;
    // }
    return !data.complete;
  });

   document.querySelector('#c-count').textContent = comdoList.length;

 }
 
 function appendTask(todoList){
  allTodos.innerHTML ="";
  todoList.forEach((element)=>{
    var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.content}</strike>` : element.content}</p>
    <div class="todo-actions">
    <button class="complete btn btn-success">
    <i class = " ci bx bx-check bx-sm"></i>
    </button>
    
    <button class="delete btn btn-error">
    <i class ="di bx bx-trash bx-sm"></i>
    </button>
    </div>
    </li>`
    allTodos.innerHTML += x;
  })
 }




 //EVENT LISTENERS FOR ADD AND DELETE
 
 function addTask(){
    var task = todoInput.value;

    if(task == ""){
      alert('content is compulsory and no empty content is allowed')
      return;
    }

    // EACH TASK -> TRACE...

    todoList.push({
        content : task,
        id : Date.now().toString(),
        complete  : false
    });

    todoList.forEach((data)=>{
        console.log(data);
    });
    
    document.querySelector('#r-count').textContent = todoList.length;
     
    updateList();
    appendTask(todoList); // FUNCTION -> FILTER AND COMPLETED VARIABLE REFLEXTION...
 
}

 addButton.addEventListener('click',addTask);


todoInput.addEventListener('keypress', (event)=>{
   if(event.key === 'Enter'){
    addTask();
   }
});

function deleteTask(event){
  console.log(event.target.parentElement);

  console.log(event.target.parentElement.parentElement);

  console.log(event.target.parentElement.parentElement.getAttribute('id'));

  var id = event.target.parentElement.parentElement.getAttribute('id');

  todoList = todoList.filter((data)=>{
    return data.id != id;
  })
  updateList();
  appendTask(todoList);
}

function complete(event){
  var id = event.target.parentElement.parentElement.getAttribute('id');
  todoList.forEach((data)=>{
    if(data.id == id){
      if(data.complete == false){
        data.complete = true;
        event.target.parentElement.parentElement.querySelector('#task').classList.add('line');
      }
      else{
        if(data.complete == true){
          data.complete = false;
          event.target.parentElement.parentElement.querySelector('#task').classList.remove('line');
        }
      }
    }
  })
  updateList();
  appendTask(todoList);
}

document.addEventListener('click',(event)=>{
  if(event.target.classList.contains('delete') || event.target.classList.contains('di')){
    console.log(event.target);
    deleteTask(event);
  }
  if(event.target.classList.contains('complete' || event.target.classList.contains('ci'))){
    console.log(event.target)
    complete(event);
  }
})

function deleteAll(){
  todoList = [];
  updateList();
  appendTask(todoList);
}
deleteAllButton.addEventListener("click",deleteAll)

function deleteS(){
  todoList  = todoList.filter((data)=>{
    return !data.complete;
  });
  updateList();
  appendTask(todoList);
}

function allbtn(){
  appendTask(todoList);
}

function rembtn(){
  appendTask(remList);
}
function combtn(){
  appendTask(comdoList);
}
deleteSButton.addEventListener("click", deleteS)
all.addEventListener("click",allbtn);
rem.addEventListener("click",rembtn);
com.addEventListener("click",combtn);