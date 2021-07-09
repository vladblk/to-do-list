//  SELECTORS
const toDoInput = document.querySelector('.todo-input');
const addItemBtn = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-items');


// EVENT LISTENERS
// display todos items from local storage on load
document.addEventListener('DOMContentLoaded', displayLocalStorageToDos);

// add a new item to the to-do list
addItemBtn.addEventListener('click', addToDo);

// manage check and delete buttons functionality
toDoList.addEventListener('click', itemBtnLogic);

// manage filter options
filterOption.addEventListener('change', filterLogic);


// FUNCTIONS
// CREATE ADD TO DO ITEM FUNCTION
function addToDo(event){
  // Prevent form from submitting when clicking addItem button
  event.preventDefault();

  // create to do item
  if(toDoInput.value !== ''){
    createToDoItem(toDoInput.value);
  }
  
  // save to do item in local storage
  saveLocalStorageToDos(toDoInput.value);

  // remove the text from the input after adding the item
  toDoInput.value = '';

  // put the focus on the input after adding an item
  toDoInput.focus();
};

// CREATE CHECK AND DELETE BUTTONS FUNCTION
function itemBtnLogic(event){
  // select check or delete buttons
  const btn = event.target.parentElement;

  // delete the item
  if(btn.classList[0] === 'delete-btn'){
    // select each item todo container
    const item = btn.parentElement;
    item.classList.add('delete-transition');
    // deletes to-do item container
    item.addEventListener('transitionend', function(){
      item.remove();
    });

    // remove from local storage
    removeLocalStorageToDos(item);
  };

  // check the item
  if(btn.classList[0] === 'check-btn'){
    // selectes each item todo container
    const item = btn.parentElement;
    // check the item
    item.classList.toggle('completed');
  };
};

// CREATE FILTER LOGIC FUNCTION
function filterLogic(event){
  // grab all to-dos item container
  const todos = document.querySelectorAll('.todo');

  todos.forEach( (todo) => {
    if(event.target.value === 'completed-option'){
      // show marked/completd todos
      if(todo.classList.contains('completed')){
        todo.style.display = 'flex';
      } else {
        todo.style.display = 'none';
      }
    } else if(event.target.value === 'uncompleted-option'){
      // show uncompleted/unmarked todos
      if(!todo.classList.contains('completed')){
        todo.style.display = 'flex';
      } else {
        todo.style.display = 'none';
      }
    } else if(event.target.value === 'all-option') {
      // show all todos
      todo.style.display = 'flex';
    }
  });
};


// SAVE TO LOCAL STORAGE FUNCTION
function saveLocalStorageToDos(todo){
  const todosArr = checkLocalStorage();

  // add the toDoInput in the todosArr array
  todosArr.push(todo);
  // save the todosArr array in the local storage
  if(todo !== ''){
    localStorage.setItem('todos', JSON.stringify(todosArr));
  }
};


// DISPLAY TODOS ITEMS FROM LOCAL STORAGE TO THE UI FUNCTION
function displayLocalStorageToDos(){
  const todosArr = checkLocalStorage();

  todosArr.forEach(function(todo) {
    createToDoItem(todo);
  });
};

// REMOVE FROM LOCAL STORAGE FUNCTION
function removeLocalStorageToDos(todo){
  const todosArr = checkLocalStorage();

  // get each todo item text when pressing the delete button
  const item = todo.children[0].innerText;

  // get the index of each element
  const itemIndex = todosArr.indexOf(item);

  // remove that element from the array
  todosArr.splice(itemIndex, 1);
  // save the new array to the local storage
  localStorage.setItem('todos', JSON.stringify(todosArr));
};


function createToDoItem(value){
  // CREATE TO-DO CONTAINER
  const toDoItemContainer = document.createElement('div');
  // add a class to the to-do container
  toDoItemContainer.classList.add('todo')

  // CREATE TO-DO LIST ITEM
  const listItem = document.createElement('li');
  // add a class to the list item
  listItem.classList.add('todo-item');
  // add the value from the user input to the list item
  listItem.innerHTML = value;
  // append the item to the to-do div
  toDoItemContainer.appendChild(listItem);

  // CREATE CHECK AND DELETE BUTTONS
  const checkBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  // add class to both check and delete buttons
  checkBtn.classList.add('check-btn');
  deleteBtn.classList.add('delete-btn');

  // add icons to check and delete buttons
  checkBtn.innerHTML = '<i class="fas fa-check"></i>';
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

  // append buttons to the to-do div
  toDoItemContainer.appendChild(checkBtn);
  toDoItemContainer.appendChild(deleteBtn);

  // append to-do div to the to-do ul
  toDoList.appendChild(toDoItemContainer);

  return toDoList;
}

function checkLocalStorage(){
  // create empty variable for todos items
  let arr;

  // check the local storage
  if(localStorage.getItem('todos') === null){
    // if it's empty, create an empty array
    arr = [];
  } else {
    // if there's an item in the array, get the array
    arr = JSON.parse(localStorage.getItem('todos')); 
  }

  return arr;
}

