//creating a variable to hold an empty array
let employeeList = [];
//starting up the ajax for the page
$.ajax({
    //pulling the 12 cards that need to be used from the randomuser website
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data) {
        console.log(data);
        //setting employeeList (the empty array), equal to the data results 
        employeeList = data.results;
        //calling the createEmployeeCard function
        createEmployeeCard(employeeList);
    }
});
//creating a function to hold the individual employee card and the for loop to make 12 cards
//giving the card an index to connect it to the modal, the for loop shows each 12 cards' index
function createEmployeeCard(employeeList){
    //creating a for loop to loop up to 12 cards
    for(let i = 0; i < employeeList.length; i++){
        //employee card
        let card = 
        `<div class="card" index="${i}">
            <div class="card-img-container">
                <img class="card-img" src="${employeeList[i].picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employeeList[i].name.first} ${employeeList[i].name.last}</h3>
                <p class="card-text">${employeeList[i].email}</p>
                <p class="card-text cap">${employeeList[i].location.city}, ${employeeList[i].location.state}</p>
            </div>
        </div>`;
    //appending the card to the gallery dynamically
    $('#gallery').append(card);
}
    //creating a function to check for the classname card and moving to the parent until it finds it 
    function checkForName(element){
        if (element.hasClass('card')){
            return element;
        } else {
           return checkForName(element.parent());
        }
    }
    //creating a click function to show the modal container with the correct information and calling it
    $('.card').on('click', function(event){
        $('.modal-container').show();
        let nameCard = checkForName($(event.target)).attr('index');
        let chosenCard = employeeList[nameCard];
        modal(chosenCard);
    });
}
    //creating a function to hold the modal with the card information and append the modal container to the body
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
                    <p class="modal-text cap">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">${(new Date(employee.dob.date)).toLocaleDateString("en-US", options)}</p>
                </div>
            </div>`;
    $('body').append(modalContainer);
    //removing the modal when the 'x' button is clicked 
    $('#modal-close-btn').on('click', function(event){
        $('.modal-container').remove();
    });  
  }