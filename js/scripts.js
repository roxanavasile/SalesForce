/**
 * Author:  Roxana D Vasile 
 * Date: 03/10/2020 
 * Description: Main js file that contains the logic for the CRUD operations.
 */

var submitMode          = true;  //adding a new user
var jsonId              = "";

function clearFormData() 
{
    $("#title").val("");
    $("#text").val("");
}


function GetPosts()
{
    //clearFormData() 
    
    // GET all resources
    // Ideally this function would be async and display an animations while loading.
    fetch('https://restedblog.herokuapp.com/rvasile/api/')
        .then(response => response.json())
        .then(function (data) 
        {

           var tBody = $("#container")
            tBody.empty();

            data.forEach((post) => 
            {
                // border should be added, however the html looks like it's adding a closing <div>
                const { id , title, text } = post;
                tBody.append("<div id= \"container_"+ id + " class=\"border\" >");
                tBody.append("<h1 id= \"title_"+ id +"\">" + title +" </h1>");
                tBody.append("<p id= \"text_"+ id +"\">" + text +" </p>");
                tBody.append("<button id= \"buttonEdit_"+ id +"\"  type=\"submit\" class=\"button btn-info\"  onclick=\"Put(this.id)\">Edit</button><button id= \"buttonEdit_"+ id +"\"  type=\"submit\" class=\"button btn-danger\" onclick=\"Delete(this.id)\">Delete</button></td>");
                tBody.append(" </div>");
            })
        })
}

function Post(e) 
{
    $("#expandCollapse").removeClass("collapse")
    submitMode = true;
    $("#title").val("");
    $("#text").val("");
    $("#editOrAdd").html("Add New User")
    title = document.getElementById("title");
    title.focus();
}

function onSubmit() 
{// creates or edits a new resource on submit
    
    var title = $("#title").val();
    var text = $("#text").val();
    /* might not need variable below, but it is present in the json object */
    var timestamp = new Date();

    //flag to determine if editor is adding a new post or editing an existing one
    if(submitMode)
    {
        fetch("https://restedblog.herokuapp.com/rvasile/api/", 
        {
            method: "POST",
            body: JSON.stringify
            ({
                "title": title,
                "text": text
            }),
            headers: 
            {
            "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response => response.json())
            .then(json => GetPosts())
            clearFormData() 
            $("#expandCollapse").addClass("collapse")
            /*here I would like to also add logic that would update the user if the post was successfully submitted*/
    }  
    else 
    {
        var remove = window.confirm("Are you sure you want to edit this post?");
        if(remove)
        {
            // PUT to the resource with id = 5 to change the name of task
            fetch('https://restedblog.herokuapp.com/rvasile/api/' + jsonId , 
            {
                method: "PUT",
                body: JSON.stringify
                ({
                    "title": title,
                    "text": text,
                    "timestamp" : timestamp
                }),
                headers:
                {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then( GetPosts )
            .catch(console.log("error")) /*I would like this to be a function that would let the user know the update failed*/
        }
    }
}

function Put(e) 
{
    $("#expandCollapse").toggleClass("collapse")
    submitMode = false;

        var id              = e.replace(/buttonEdit_/, '');
        var title           = $("#title_" + id).html();
        var text            = $("#text_"+ id).html();
    
        $("#title").val(title);
        $("#text").val(text);
    
        jsonId = id;   
    
        $("#editOrAdd").html("Edit User") ;
}

function Delete(e) 
{
    var remove = window.confirm("Are you sure you want to delete this post?");

    if(remove)
    {
        var id = e.replace(/buttonEdit_/, '');
    
        fetch('https://restedblog.herokuapp.com/rvasile/api/' + id, 
        {
            method: 'DELETE'
        })
        .then( GetPosts )
    }
}




