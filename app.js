const url = "https://randomuser.me/api/?results=12&nat=us&inc=name, picture,email, location, phone, dob, nat & noinfo";
const container = document.querySelector(".container");
const modal = document.getElementById('myModal');
var personIndex;
const search = document.getElementById('search');
let index = 0
const prev = document.querySelectorAll('.prev');
const next = document.querySelectorAll('.next');



// fetch data
fetch(url)
  .then(response => response.json())
  .then(data => {
    generateEmployees(data.results)
    generateModalDetails(data.results)
  })
  .catch(error => console.log('Uh oh, something has gone wrong.', error))

// Generate Employee cards
function generateEmployees(data) {
  for ( let i = 0; i < data.length; i++) {
  let html =
  `<div class="card" id="${[i]}">
  <img class="profile-image" src='${data[i].picture.large}' alt='${data[i].name.first} ${data[i].name.last}' />
  <div class="profile-text">
  <h3>${data[i].name.first} ${data[i].name.last}</h3>
  <p class="email">${data[i].email}</p>
  <p>${data[i].location.city}</p>
  </div>
  </div>`;
  container.innerHTML += html;
  } 
}

// Generate modal Information
function generateModalDetails(data) {
  for ( let i = 0; i < data.length; i++) {
    let html =
   `<div class="modal-content" id="person${[i]}">
    <span class="close">&times;</span>
    <span class="prev"><</span>
    <img class="profile-image" src='${data[i].picture.large}' alt='${data[i].name.first} ${data[i].name.last}' />
    <span class="next">></span>
    <h3>${data[i].name.first} ${data[i].name.last}</h3>
    <p><a href="mailto:${data[i].email}" target="_blank">${data[i].email}</a></p>
    <p>${data[i].location.city}</p>
    <hr>
    <p>${data[i].phone}</p>
    <p>Birthday: ${data[i].dob.date.substring(5, 7)}/${data[i].dob.date.substring(8, 10)}/${data[i].dob.date.substring(0, 4)} </p>
    <p>${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
    </div>
    </div>
  `;
  modal.innerHTML += html;
  }
}

// Get Employee card index
window.addEventListener('load', function () {
  container.addEventListener('click', (e) => {
    if (e.target.parentElement.parentElement.className === "card"
    || e.target.parentElement.className === "card"
    || e.target.className === "card") {
      if(e.target.id !== '') {
        personIndex = e.target.id;
        return personIndex;
      }
      if(e.target.parentElement.id !== '') {
        personIndex = e.target.parentElement.id;
        return personIndex;
      }
      if(e.target.parentElement.parentElement.id !== '') {
        personIndex = e.target.parentElement.parentElement.id;
        return personIndex;
      }
    }
  });
});

// Display Modal with selected employee information
window.addEventListener('load', function () {
  container.addEventListener('click', (e) => {
    if (e.target.parentElement.parentElement.className === "card" || e.target.parentElement.className === "card" || e.target.className === "card")
    {
      modal.style.display = "block";
      modal.children[personIndex].style.display= "block";
    }
  });
});

// Close modal clicking 'X' or outside modal 
function closeModal() {
  modal.style.display ='none';
  modal.children[personIndex].style.display= "none";
}

modal.addEventListener('click', (event) => {
  if(event.target.className === 'close') {
    closeModal();
  } else if (event.target == modal){ 
    closeModal();
  } 
});

// Employee filter search
function searchFilter() {
  let searchValue = search.value.toLowerCase();
  let employeeCard = document.querySelectorAll(".card");
  let employeeText = document.querySelectorAll(".profile-text");
  for (let i = 0; i < employeeCard.length; i++) {
    let title = employeeText[i].getElementsByTagName("h3")[0];
    let name = title.textContent;
    if (name.toLowerCase().indexOf(searchValue) > -1) {
      employeeCard[i].style.display = "";
    } else {
      employeeCard[i].style.display = "none";
    }
  }
}

search.addEventListener('keyup', (e) => searchFilter());



// else if(event.target.className === prev) {
//   // display previous
//   index --;
//   modal.children[personIndex].style.display= "block";
// } else if(event.target.className === next) {
//   // display next
//   index ++;
//   modal.children[personIndex].style.display= "block";
// }

//Next Button 
let employeeModal = document.querySelectorAll('.modal-content');
next.addEventListener('click', (e) => {
  let index = employeeModal;
  if(index >= 1) {
        index--;
        console.log(index);
        generateModalDetails(index);
      }
      else {
        console.log(index);
        generateModalDetails(11);
      }
    });



// Previous Button
prev.addEventListener('click', () => {
  let index = employeeModal;
  if(index >= 1) {
    index--;
    console.log(index);
    generateModalDetails(index);
  }
  else {
    console.log(index);
    generateModalDetails(11);
  }
});
