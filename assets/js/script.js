// function to see if value exists in array
// needed to avoid duplicate tasks
function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

// Initiate the array of items to do
let myItems;

// Get the text which says list is empty
let empty = document.getElementById("empty-list-text");

// If items were added to the list, retrieve them and fill the list with the items
if(localStorage.getItem("tasks")){
    myItems = JSON.parse(localStorage.getItem("tasks"));
    if(myItems.length == 0){
        empty.style.display = "block";
    }
    else{
        empty.style.display = "none";
    }
   
}


// let myItems = [
//     "Do Task 1",
//     "Do Task 2",
//     "Do Task 3",
//     "Do Task 4"
// ]
//console.log(myItems);

// Retrieve the ul element which is the list
let itemsList = document.getElementById("list");
// If the retrieved list from localstorage is not empty, add the elements to the list from the array
if(myItems != null)
{
    for(let i = 0 ; i < myItems.length ; i++){

        //TODO: Replace loop contents with call to addItem function

        /* Create the item */
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(myItems[i]));
        li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    
        /* Create the X label */
        var span = document.createElement("span");
        // Add the class name for the X text
        span.setAttribute("class", "badge badge-primary badge-pill text-dark");
    
        /* Create the X button */
        var xButton = document.createElement("button");
        xButton.appendChild(document.createTextNode("X"));
        // Give the button a class name
        xButton.setAttribute("class", "delete-item h6");
        // If button is clicked, call the deleteItem function
        xButton.setAttribute("onclick","deleteItem(this);");
        
    
        /* Add the item to the list */
        itemsList.appendChild(li);
        li.appendChild(span);
        span.appendChild(xButton);
    }
}


function deleteItem(el) {
     // find items list 
    let itemsList = document.querySelectorAll(".list-group-item");

    // find out which list element correspond to the button pressed
    let child = el.closest("div li");

    // find the spand in the list item to remove it since innerHTML also includes the span tag.
    // We want to use the innerHTML to know which item to remove from the list, but we can't do so if the span tag 
    // is retrieved along with the text
    let span = el.closest("div li span");
    // remove the span tag so only the item text will be left in the li
    child.removeChild(span);
    // store the text inside the item - will use to find out which item to remove
    myText =  child.innerHTML;
    // remove the li tag from the html
    child.parentNode.removeChild(child);
    
    // find the updated items list after the item removal
    itemsList = document.querySelectorAll(".list-group-item");
    

    // Retrieve the current stored array (this is now oudated and we need to remove an item)
    myItems = JSON.parse(localStorage.getItem("tasks"));
    // if the array is not empty - look for the item which matches the text of the removed item, and remove it from the array
    if(myItems){
        for( var i = 0; i < myItems.length; i++){ 
    
            if ( myItems[i].toLowerCase() == myText.toLowerCase()) { 
        
                myItems.splice(i, 1); 
            }
        
        }
        
        // add the updated array to localstorage
        localStorage.setItem("tasks", JSON.stringify(myItems));

        if(myItems.length == 0)
            empty.style.display = "block";
    }

    else{
        empty.style.display = "block";
    }
    //itemsList.removeChild(el.closest("div li")) ;
    // // find delete buttons
    // let deleteBtn = document.querySelectorAll(".delete-item");
    // console.log("Pressed Delete");
    // // find items list 
    // let itemsList = document.querySelectorAll(".list-group-item");

    // console.log(myItems);
    // for (let i = 0; i < deleteBtn.length; i++) {
    //     // deleteBtn[i].onclick = function () {
    //     console.log("Item " + i);
    //     myItems = myItems.splice(i, 1);
    //     // }
    // }
    // console.log(myItems);

}

function addItem(item_text){
    // TODO: Don't allow duplicates

    // if an argument is passed, set it to that, else set to null
    // we will use null as an argument when we use the "Add Item" button
    // we will use an argument with a value when we want to iterate through the array and add the items to the lsit
    item_text = item_text || null;
    let task;

    if(item_text == null){
        task = document.getElementById("new-task").value;
    }
    else{
        task = item_text;
    }
     // Get the input

    //var myItems = JSON.parse(localStorage.getItem("tasks"));
    let myItems;

    if (localStorage.getItem("tasks")) {
        myItems = JSON.parse(localStorage.getItem("tasks"));
    } else {
        myItems = [];
    }
    if(myItems && !isInArray(task, myItems))
    {
        if(myItems){
            myItems.push(task);
         }
         else{
            myItems = [task];
         }
         empty.style.display = "none";
         //console.log("Retrieved: " + myItems); 
         localStorage.setItem("tasks", JSON.stringify(myItems));
         //console.log(task);
         document.getElementById("new-task").value= "";
         //console.log(task);
    
         /* Create the item */
         var li = document.createElement("li");
         li.appendChild(document.createTextNode(task));
         li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    
         /* Create the X */
         var span = document.createElement("span");
         span.setAttribute("class", "badge badge-primary badge-pill text-dark");
    
         /* Create the X button */
         var xButton = document.createElement("button");
         xButton.appendChild(document.createTextNode("X"));
         xButton.setAttribute("class", "delete-item h6");
         xButton.setAttribute("onclick","deleteItem(this);");
         
    
         /* Add the item to the list */
         itemsList.appendChild(li);
         li.appendChild(span);
         span.appendChild(xButton);
    }
    else{
        document.getElementById("new-task").value = "";
    }

  
}