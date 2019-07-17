let employeeList = [];
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
        console.log(data);
        employeeList = data.results;
        createAllCards(employeeList);
    }
});
function createAllCards(list){
    for(let i = 0; i < list.length; i++){
        createEmployeeCard(employeeList[i]);
    }
}
function createEmployeeCard(employee){
    let card = 
        `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city},${employee.location.state}</p>
            </div>
        </div>`;
    $('#gallery').append(card);
}
function createmodal(list){
    for(let i = 0; i < list.length; i++){
        modal(employeeList[i]);
    }
}
$('.modal__overlay').style = 'display: inline-block';
    function modal(employee){
    let modalContainer =
    `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.thumbnail}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.cell}</p>
                    <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">${employee.dob.date}</p>
                </div>
            </div>;`
            $('body').append(modalContainer);
}