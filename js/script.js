let employeeList = [];
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
        console.log(data);
        employeeList = data.results;
        createEmployeeCard(employeeList);
    }
});
function createEmployeeCard(employeeList){
    for(let i = 0; i < employeeList.length; i++){
        let card = 
        `<div class="card" index="${i}">
            <div class="card-img-container">
                <img class="card-img" src="${employeeList[i].picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employeeList[i].name.first} ${employeeList[i].name.last}</h3>
                <p class="card-text">${employeeList[i].email}</p>
                <p class="card-text cap">${employeeList[i].location.city},${employeeList[i].location.state}</p>
            </div>
        </div>`;
    $('#gallery').append(card);
}
    function checkForName(element){
        if (element.hasClass('card')){
            return element;
        } else {
           return checkForName(element.parent());
        }
    }
    $('.card').on('click', function(event){
        $('.modal-container').show();
        let nameCard = checkForName($(event.target)).attr('index');
        let chosenCard = employeeList[nameCard];
        modal(chosenCard);
    });
}
    function modal(employee){
    let options = {date: 'short' };
    let modalContainer =
    `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.cell}</p>
                    <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">${(new Date(employee.dob.date)).toLocaleDateString("en-US", options)}</p>
                </div>
            </div>;`
    $('body').append(modalContainer);
    }