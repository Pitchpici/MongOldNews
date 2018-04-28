// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page

    var row = $("<tr>");
    var cell1 = $("<td>");
    var cell2 = $("<td>");
    var cell3 = $("<td>");
    var cell4 = $("<td>");
    var cell5 = $("<td>");
    var cell6 = $("<td>");
    var link = $("<a>");
    var delete_button = $("<button>");
    var button = $("<button>");

    delete_button.attr("data-id", data[i]._id);
    delete_button.addClass("btn btn-danger btn_delete");
    delete_button.attr("type", "button");
    delete_button.text("Delete");

    button.attr("data-id", data[i]._id);
    button.addClass("btn btn_modal btn-primary");
    button.attr("type", "button");
    button.attr("data-toggle", "modal");
    button.attr("data-target", "#exampleModal");
    button.text("Comments");


    row.attr("id", "row" + data[i]._id);

    link.text("View Article");
    link.attr("href", data[i].link);
    link.attr("target", "_blank");

    cell1.append(i+1);
    cell2.addClass("bold").append(data[i].headline);
    cell3.append(data[i].summary);
    cell4.append(link)
    cell5.append(button);
    cell6.append(delete_button);

    row.append(cell1);
    row.append(cell2);
    row.append(cell3);
    row.append(cell4);
    row.append(cell5);
    row.append(cell6);

    $("tbody").append(row);

  }
});

// Whenever someone clicks a Comments button
$(document).on("click", ".btn_modal", function() {
  console.log("found click");
  // Empty the notes from the comment section
  $(".modal-title").empty();
  $(".modal-body").empty();

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the comment information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $(".modal-title").append(data.headline);

      // A textarea to add a new comment body
      $(".modal-body").append("<textarea id='bodyinput' name='body'> </textarea>");



      $(".btn-save-changes").attr("data-id", data._id);
    
      // If there's a comment in the article
      if (data.comment) {
        // Place the body of the comment in the body textarea
        $("#bodyinput").append(data.comment.body);
      }
    });
});


// Whenever someone clicks a Delete button
$(document).on("click", ".btn_delete", function() {
  console.log("found delete click");

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log("this is the article id " + thisId);

  // Now make an ajax call for the Article
  // Run a POST request to delete just the article thisId
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      location.reload();
    });

});


// When you click the scrape button
$(document).on("click", ".btn-scrape", function() {
  console.log("in the scrape!");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/scrape/"
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      location.reload();
    });
});

// When you click the delete button
$(document).on("click", ".btn-delete", function() {
  console.log("in the scrape!");

  // Run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/delete/all/"
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      location.reload();
    });
});



// When you click the savecomment button
$(document).on("click", ".btn-save-changes", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  var bodyText = $("#bodyinput").val();

  console.log ("bodyText: " + bodyText);

  // Run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      type: "save",
      
      // Value taken from comment textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the comments section
   
    });
});

// When you click the deletecomment button
$(document).on("click", "#deletecomment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      type: "delete",
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the comments section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});