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