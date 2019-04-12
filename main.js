// adding a eventListener for page load
window.addEventListener("load", fetchBookmarks);

// Find a form and add eventListener to it
document.querySelector("form").addEventListener("submit",saveBookmark);

// Saved Bookmarks
function saveBookmark(event) {

    // Prevent the page from reloading
    event.preventDefault();

   // Get site name and site url
    var siteName = document.querySelector("#siteName").value;
    var siteUrl = document.querySelector("#siteUrl").value;
    // Creat a bookmark object
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    // Check if local storage is empty also
    if(localStorage.getItem("bookmarks") === null) {
        // Init bookmarks array
        var bookmarks =[];
        // Adding first bookmark
        bookmarks.push(bookmark);
        // Adding or setting it to local storage
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        // Else case means local storage is not empty
    } else {
        //Get current bookmarks from local storage
        // String has to be transfered back to array JSON.parse is method
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        // Push new bookmark into bookmarks
        bookmarks.push(bookmark);
        //Once pushed going to send back to local storage
        //set bookmarks to local storage
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }
    // Reset the form
    document.querySelector("form").reset();
    //Fetch bookmarks 
    fetchBookmarks();
}
function fetchBookmarks() {
    // Get the bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Select the bookmarks div
    var output = document.querySelector("#bookmarks");
    // Reset the bookmarks div
    output.innerHTML = "";
    // edit bookmarks one by one need a loop
    // Loop over bookmarks
    for (var i=0;i<bookmarks.length;i++) {
        //Create a div
        var div =document.createElement("div");
        //Create a h3
        var h3 = document.createElement("h3");
        h3.textContent = bookmarks[i].name;
       //Creat a  Visit Link
        var a = document.createElement("a");
        //
        a.href = bookmarks[i].url;
        a.className = "btn btn-success";
        a.textContent = "Visit";
       //Create a delete button
       var button = document.createElement("button");
       button.className = "btn btn-danger";
       button.textContent = "Delete";
      
        button.addEventListener("click",function(event){
            var name = event.target.parentElement.children[0].textContent;
            deleteBookmark(name);
        })
     // append h3,a and button together into div
        div.appendChild(h3);
        div.appendChild(a);
        div.appendChild(button);
    // append div into output
        output.appendChild(div);
    }
}
// still have to a delete bookmark function
function deleteBookmark(name) {

    // Get bookmarks from localStorage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// Loop over bookmarks 
for(var i=0; i<bookmarks.length;i++) {
    //looking for bookmarks by given name

    if(bookmarks[i].name === name) {
        bookmarks.splice(i, 1);
        break;
    }
}
//Reset bookmarks back to localStorage
localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
//Re-fetch bookmarks output
fetchBookmarks();
}
