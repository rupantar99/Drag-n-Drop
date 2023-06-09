var draggedItem = null;
var droppedItems = [];

// Add event listeners to the items
var items = document.getElementsByClassName("item");

for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("dragstart", function (event) {
    draggedItem = this;
    this.classList.add("dragged");
    event.dataTransfer.setData("text/plain", draggedItem.innerText);
  });
  items[i].addEventListener("dragend", function (event) {
    this.classList.remove("dragged");
  });
}


var containers = document.getElementsByClassName("container");

for (var i = 0; i < containers.length; i++) {
  containers[i].addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  containers[i].addEventListener("drop", function (event) {

    event.preventDefault();

    if (draggedItem !== null && draggedItem.parentNode !== this) {

      var itemText = event.dataTransfer.getData("text/plain");
      var newItem = document.createElement("div");
      newItem.classList.add("item");

      newItem.innerText = itemText;
      this.appendChild(newItem);

      draggedItem.parentNode.removeChild(draggedItem);
      draggedItem = null;
      var itemNumber = Array.from(this.children).indexOf(newItem) + 1;

      if (this.id === "container2") {
        addDroppedItem(itemText, itemNumber);
      }
    }
  });
  containers[i].addEventListener("dragenter", function (event) {
    event.preventDefault();
    this.classList.add("highlight");
  });


  containers[i].addEventListener("dragleave", function (event) {
    event.preventDefault();
    this.classList.remove("highlight");
  });
}

// Show a message in the specified container 2
function showMessage(message, containerId) {
  var container = document.getElementById(containerId);
  container.innerText = message;
  if (message === "") {
    container.classList.remove("show");
  } else {
    container.classList.add("show");
  }
}

// Add the dropped item to the list

function addDroppedItem(itemText, itemNumber) {
  var droppedItem = { itemText: itemText, itemNumber: itemNumber };
  droppedItems.push(droppedItem);
  showDroppedItems();
}

function showDroppedItems() {
  var container2 = document.getElementById("container2");
  container2.innerHTML = "";
  for (var i = 0; i < droppedItems.length; i++) {
    var newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerText = droppedItems[i].itemText;
    container2.appendChild(newItem);
  }
}

// Reset tfunction
function reset() {
  var container1 = document.getElementById("container1");
  var container2 = document.getElementById("container2");

  container1.innerHTML =
    '<div class="item" draggable="true">Item 1</div>' +
    '<div class="item" draggable="true">Item 2</div>' +
    '<div class="item" draggable="true">Item 3</div>' +
    '<div class="item" draggable="true">Item 4</div>';
  container2.innerHTML = "";
  droppedItems = [];

  showMessage("", "Successful");
  attachEventListeners(); 
}

// Attach event listeners to the items
function attachEventListeners() {
  var items = document.getElementsByClassName("item");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("dragstart", function (event) {
      draggedItem = this;
      this.classList.add("dragged");
      event.dataTransfer.setData("text/plain", draggedItem.innerText);
    });
    items[i].addEventListener("dragend", function (event) {
      this.classList.remove("dragged");
    });
  }
}

// Call the attachEventListeners function initially
attachEventListeners();
