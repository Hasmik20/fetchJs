const thead = document.querySelector("#tHead");
const table = document.querySelector(".tableContainer");
const tBody = document.querySelector("#tbody");
const btn = document.querySelector("#btnList");
const btnAddComment = document.querySelector("#btnAddNew");
const table1 = document.querySelector(".tableContainer1")

// function add events for get 
btn.addEventListener("click", addList);

function addList(){
  table.style.display = "block";
  table1.style.display = "none";
  signContainer.style.display = "none"
}

// function add events for post comments
btnAddComment.addEventListener("click", addNewComments)

function addNewComments(){
table1.style.display = "block";
table.style.display = "none";
signContainer.style.display = "none"
}

// fetch to add table, get method
let url = "https://jsonplaceholder.typicode.com/users";

fetch(url)
// .then(function(response) {
//         if (!response.ok) {
//           throw Error("ERROR");
//         }
//       })

  .then(res => res.json())
  .then(data => {
    let elements = data;
    addTable(elements);
  })
  .catch(err => console.log(err))


function addTable(elements){
  let row;
  let html = elements.map(element =>{
return row = `<tr class="trNew">
    
<td>${element.id}</td>
<td>${element.name}</td>
<td>${element.username}</td>
<td>${element.email}</td>

<td>${element.address.street}</td>
<td>${element.address.suite}</td>
<td>${element.address.city}</td>
<td>${element.address.zipcode}</td>
<td>${element.phone}</td>
<td>${element.website}</td>
<td>${element.company.name}</td>
<td>${element.company.catchPhrase}</td>
<td>${element.company.bs}</td>
</tr>`
  })
  
tBody.insertAdjacentHTML('afterbegin', html);
}

// add filter
const filterItems = document.querySelector("#search");
filterItems.addEventListener("keyup", filterNames)

function filterNames(e){
  // e.preventDefault();

let inputValue = filterItems.value.toUpperCase();

let tr = tBody.querySelectorAll("tr.trNew");
for(let i = 0; i < tr.length; i++){

  if(tr[i].innerHTML.toUpperCase().indexOf(inputValue) > -1){
   tr[i].style.backgroundColor= "rgba(141, 168, 64,.7)";
   tr[i].style.color = "white"

  }
}
}

// fetch post method: comments

// for submit function
let comBody = document.querySelector("#comBody");
 const form2 = document.querySelector("#form2");

 form2.addEventListener("submit", addCommFunc);

 function addCommFunc(e){
  e.preventDefault();
// get values of input
let name = document.querySelector("#name").value;
let email = document.querySelector("#email").value;
let text = document.querySelector("#message").value;


// call fetch request
const url1 = "https://jsonplaceholder.typicode.com/comments";

fetch(url1, {
  method: 'POST',
  body: JSON.stringify({
    name: name,
    email: email,
    body: text,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
.then(res => res.json())
.then(data =>{
  let elements = data;
  console.log(data)
  addComHTML(elements)
})

 }

 function addComHTML (elements){

  let html1 = `<tr class="trNew">
            
                <td>${elements.id}</td>
                <td>${elements.name}</td>
                <td>${elements.email}</td>
                <td>${elements.body}</td>
              </tr>`
  
comBody.insertAdjacentHTML('afterbegin', html1);
}

// signIn/signUp: post fetch
const signContainer = document.querySelector("#sign-container");
const header = document.querySelector("header");
const btnGroup = document.querySelector(".btn");
let form3Container = document.querySelector("#form3-container")
const form3 = document.querySelector("#form3");
const signBtn = document.querySelector("#signBtn");

signBtn.addEventListener("click",()=>{
  signContainer.style.display = "block"
  table1.style.display = "none";
})


form3.addEventListener("submit", logIn);

function logIn(e){
  e.preventDefault();
// get values of input
let name1 = document.querySelector("#name1").value;

// call fetch request
const url2 = "https://jsonplaceholder.typicode.com/users";

fetch(url2, {
  method: 'POST',
  body: JSON.stringify({
    name: name1,
  
    
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

.then(res => res.json())
.then(data =>{
  let elements = data;
  console.log(data)
  addLoginHTML(elements)
})
.catch((error) => {
  console.error('Error:', error);
});
 }

 function addLoginHTML (elements){
  // let name1 = document.querySelector("#name1").value;

  let password = document.querySelector("#password").value;
  let message = document.querySelector('.message');
  if(name1 === "" && password === ""){
        message.classList.add('error')
        message.style.marginLeft = "-26%"
        message.innerHTML = "Please fill out your name/email and password!";
        setTimeout(() => message.remove(), 4000)
}else if(name1 === ""){
          message.classList.add('error')
          message.innerHTML = "Please fill out your name/email!";
          setTimeout(() => message.remove(), 4000)
}else if(password === ""){
          message.classList.add('error')
          message.innerHTML = "Please fill out your password!";
          setTimeout(() => message.remove(), 4000)
}
else{
  let html = `  
  <p class="tableTitle font">Here is your ID No: ${elements.id}</p>
  <h2 class="tableTitle">${elements.name.toUpperCase()}, you are welcome!</h2>
  <img src="http://placeimg.com/100/100/people" alt=" photo" class="profile-image">

 `
form3Container.style.display = "none";
btnGroup.style.display = "none";
header.style.height = "13vh"
signContainer.insertAdjacentHTML('afterbegin', html);
}
 
}
