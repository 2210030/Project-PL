inventory = []; 
maxComputer = 0; // initializing computer numbers to zero
listOfSerialNumber = [];
const password = "password"; // setting password
// a computer class is created with attributes serialNumber, brand, model and price
class Computer {
    constructor(serialNumber, brand, model, price) {
      this.serialNumber = serialNumber;
      this.brand = brand;
      this.model = model;
      this.price = price;
      inventory.push({"serialNumber":this.serialNumber,"brand":this.brand,"model":this.model,"price":this.price})
    }
    workshop() {
        return inventory.length;
    }
}

function main(){
    alert("Welcome to My Computer Shop"); // alert message when enters the website
}
// To input number of computers in the shop
function maxComputerInput(){
    maxComputer = parseInt(prompt("Enter maximum number of computers"));
    if(!maxComputer){
        maxComputerInput();
    }
}
// This function will append the user inputs from inventory to table.
// It also append the inputs when they are changed using edit button
function render(){
    $("#tbody").empty();
    inventory.forEach(element => {
        $("#tbody").append(
            `<tr>\
            <td>${element.serialNumber}</td>\
            <td>${element.brand}</td>\
            <td>${element.model}</td>\
            <td>${element.price}</td>\
            <td><img class="edit" src = "editicon.png" alt="edit icon" onclick="edit('${element.serialNumber}')"/></td>\ 
            </tr>`
        )
    });
}
function edit(serialNumber){
    $('#exampleModalCenter').modal('show');
    element = inventory.filter(item =>{ 
        return item.serialNumber == serialNumber;
    })
    $("#editserialnumber").val(element[0].serialNumber);
    $("#editbrand").val(element[0].brand);
    $("#editmodel").val(element[0].model); 
    $("#editprice").val(element[0].price);
}
// User authentication 
function authUser(loginAttempt = 0){
    userpass = prompt("Enter your password");
    if(userpass == password){
        return true;
    }
    else if(userpass!= password && loginAttempt < 2){
        return authUser(loginAttempt+1);
    }
    else{
        return false
    }
}
// form creation and conditions
function formSubmit(e){
    e.preventDefault();
    serialNumber = $("#serialnumber").val();
    brand = $("#brand").val();
    model = $("#model").val(); 
    price = $("#price").val();
    if(inventory.length < maxComputer){
        if(!listOfSerialNumber.includes(serialNumber) && authUser()){
            listOfSerialNumber.push(serialNumber);
            obj = new Computer(serialNumber,brand,model,price);
            $("#total").text(inventory.length)
            render();
        }
        else if(listOfSerialNumber.includes(serialNumber)){
            alert("Serial number is already taken"); 
        }
        else{
            alert("Incorrect passoword!");
        }
    }
    else{
        alert("Inventory is full, Computer cannot be added!")
    }
    
    $("#reset").click();
}
// updates the table with the values entered by the user
function updateTable(e){
    e.preventDefault();
    editserialnumber = $("#editserialnumber").val();
    editbrand = $("#editbrand").val();
    editmodel = $("#editmodel").val(); 
    editprice = $("#editprice").val();
    inventory.forEach(element => {
        if(element.serialNumber ==  editserialnumber){
            element.brand = editbrand;
            element.model = editmodel;
            element.price = editprice
        }
    });
    $('#exampleModalCenter').modal('toggle');
    render();
    
}
main();
maxComputerInput();


