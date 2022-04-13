// Step One - get -controller accept requrests
function getMessage() {
    let msg = document.getElementById("message").value;
    displayMessage(msg);
}

// final step - display those values
function displayMessage(message) {
    // <li class="list-group-item">A List Item</li>

    // let item = `<li class="list-group-item">${message}</li>`;

    // Frist get the ol element from the page
    element = document.getElementById("results");

    // Next create a new li element
    let item = document.createElement("li");
    // add classes to the li element
    item.classList.add("list-group-item");
    // set the message for the li element
    item.innerHTML = message;

    // add the new item to the list
    element.appendChild(item);


}