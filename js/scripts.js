/**
 * Author:  Roxana D Vasile 
 * Date: 03/10/2020 
 * Description: Main js file that contains the logic for the CRUD operations.
 */

var addNewPostMode      = true;  //adding a new user
var jsonId              = "";
var api_url             = 'https://restedblog.herokuapp.com/rvasile/api/';

function clearFormData() 
{
    $("#title").val("");
    $("#text").val("");
}

function sortPosts(property) 
{
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
    };
};


function GetPosts()
{

        
        // GET all resources
          $.ajax
          ({
              url: api_url,
              type: "GET",
              contentType: "application/json",
              dataType: "json",
              success: function(data)
              {
                var tBody = $("#container")
                tBody.empty();
                data.sort(sortPosts('id'))
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
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) 
              { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
              }       
          });
}

function Post(e) 
{
    $("#expandCollapse").removeClass("collapse")
    addNewPostMode = true;
    $("#title").val("");
    $("#text").val("");
    $("#editOrAdd").html("Add New Post")
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
    if(addNewPostMode)
    {
        $.ajax
        ({
            type: "POST",
            url: api_url,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify
            ({
                "title": title,
                "text": text
            }),
            success: GetPosts
          });
            clearFormData() 
            $("#expandCollapse").addClass("collapse")
    }  
    else 
    {
        var remove = window.confirm("Are you sure you want to edit this post?");
        if(remove)
        {
            
            $.ajax({
                url: api_url + jsonId,
                type: 'PUT',
                data: JSON.stringify
                ({
                    "title": title,
                    "text": text
                }),
                dataType: "application/json; charset=UTF-8",
                success: function(data) {
                  alert('Load was performed.');
                }
              });
        }
    }
}

function Put(e) 
{
    $("#expandCollapse").toggleClass("collapse")
    addNewPostMode = false;

        var id              = e.replace(/buttonEdit_/, '');
        var title           = $("#title_" + id).html();
        var text            = $("#text_"+ id).html();
    
        $("#title").val(title);
        $("#text").val(text);
    
        jsonId = id;   
        titleFocus = document.getElementById("title");
        titleFocus.focus();
        $("#editOrAdd").html("Edit User") ;
}

function Delete(e) 
{
    var remove = window.confirm("Are you sure you want to delete this post?");

    if(remove)
    {
        var id = e.replace(/buttonEdit_/, '');
    
        $.ajax
        ({
            url: api_url + id,
            type: 'DELETE',
            success: GetPosts
        });
    }
}