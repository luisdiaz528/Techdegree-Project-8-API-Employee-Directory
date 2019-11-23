const url = "https://randomuser.me/api/?results=12&nat=us&inc=name, picture,email, location, phone, dob, nat & noinfo";
const container = document.querySelector(".container");
const modal = document.getElementById('myModal');
var personIndex;


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
    <img class="profile-image" src='${data[i].picture.large}' alt='${data[i].name.first} ${data[i].name.last}' />
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

// Filter search content
let search = document.querySelector('#search');
let employee = document.querySelectorAll('.card');

search.addEventListener('keyup', (e) => {
    for(let i = 0; i < employee.length; i ++ ) {
      let employeeDetails = document.getElementsByTagName('h3');
      let name = employeeDetails.textContent;
        if(employee[i].includes(search.value.toLowerCase()) || search.value.length === 0 || employee[i].includes(name.toLowerCase())) {
          employee[i].style.display = '';
        } else {
          employee[i].style.display = 'none';
        }
    }
    console.log('works');
});



