const taskContainer = document.querySelector(".task__container")
let globalTaskData = [];

const generateHTML = (taskData) => 
`<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
  <div class="card">
    <div class="card-header gap-1 d-flex justify-content-end">
      <button class = "btn btn-outline-info"><i class = "fal fa-pencil"></i></button>
      <button class = "btn btn-outline-danger"><i class = "far fa-trash-alt"></i></button>
    </div>
    <div class="card-body">
      <img src=${taskData.image} alt="image" class = "card-img">
      <h5 class="card-title mt-4">${taskData.title}</h5>
      <p class="card-text">${taskData.description}</p>
      <span class="badge bg-primary">${taskData.type}</span>
    </div>
    <div class="card-footer">
      <button class = "btn btn-outline-primary">Open Task</button>
    </div>
  </div>
</div>`

const insertToDOM = (content) => taskContainer.insertAdjacentHTML("beforeend", content);

const addNewCard = () => {
  //get task data
  const taskData = {
    id: `${Date.now()}`, //template literal
    title: document.getElementById("taskTitle").value,
    image: document.getElementById("imageURL").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value,
  }; //.value is used to obtain the value of the object alone else it will return the whole object

  globalTaskData.push(taskData);

  //update the localstorage
  localStorage.setItem("taskyCA", JSON.stringify({card: globalTaskData})); //stringify converts javascript object into a JSON object
  
  //generate HTML Code
  const newCard = generateHTML(taskData);

  //Inject it to DOM
  insertToDOM(newCard);

  //clear the form
  document.getElementById("taskTitle").value = "";
  document.getElementById("imageURL").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("taskDescription").value = ""; 

  return;
};

//this function is to load the existing cards into the app
const loadExistingCards = () => {

  //check localstorage
  const getData = localStorage.getItem("taskyCA");

  //parse JSON data, if exist
  if(!getData) return;

  const taskCards = JSON.parse(getData);
  globalTaskData = taskCards.card;

  globalTaskData.map((taskData) => {
    //generate HTML code for those data
    const newCard = generateHTML(taskData);

    //inject to the DOM
    insertToDOM(newCard);

  });

  return;
};

//stringify
//JS Object -> JSON

//parse
//JSON -> JS Object