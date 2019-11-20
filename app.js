const url = "https://randomuser.me/api/?results=12&nat=us&inc=name, picture,email, location, phone, dob, nat & noinfo";
const employeeInfo = document.getElementById('employee-info');
const modal = document.getElementById('myModal');
const span = document.querySelector('.close');



fetch(url)
  .then(response => response.json())
  .then(data => {
    generateEmployees(data.results)
    generateModalDetails(data.results)
  })
  .catch(error => console.log('Uh oh, something has gone wrong.', error))

  window.addEventListener('DOMContentLoaded', (event) => {
    span.addEventListener('click', closeModal);
  });

function generateEmployees(data) {
  for ( let i = 0; i < data.length; i++) {
  let html =
  `<div class="card">
  <img class="profile-image" src='${data[i].picture.large}' alt='${data[i].name.first} ${data[i].name.last}' />
  <div class="profile-text">
  <h3>${data[i].name.first} ${data[i].name.last}</h3>
  <p>${data[i].email}</p>
  <p>${data[i].location.city}</p>
  </div>
  </div>`;
  employeeInfo.innerHTML += html;
  } 
}

function generateModalDetails(data) {
  for ( let i = 0; i < data.length; i++) {
    let html =
   `<div class="modal-content" id="m${[i]}">
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

function closeModal() {
  modal.style.display ='none';
  employeeInfo.style.display ='none';
}

employeeInfo.addEventListener('click', (e) => {
  modal.style.display = 'block';
});

