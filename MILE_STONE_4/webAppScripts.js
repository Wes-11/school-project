

//list of json objects, this is probably a really bad way to do this but for now it's good for testing
//also the favorite column comes from a seperate table using a union operation
function buildTable(beer) { //remove the beer arg to go back to last known functionality
  console.log("build table has been reached")
  for (var i in beer) {
    var row = "<tr><td id = \"control\">" + beer[i].beername + "</td><td>" + beer[i].type + "</td><td>" + beer[i].Rating + "</td><td>" + beer[i].price + "</td><td>" + beer[i].description + "</tr>";;
    $("#example tbody").append(row);
  }
  $("#example").DataTable({
    "paging": false,
    "ordering": true,
    "info": false,
    "columnDefs": [{
      "visible": false,
      "targets": [4]
    }]
  });
  return row;
}

function buildFavs() {
  for (var i in beer) {
    if (beer[i].favorite == 1) {
      var row = "<tr><td id = \"control\">" + beer[i].name + "</td><td>" + beer[i].type + "</td><td>" + beer[i].rating + "</td><td>" + beer[i].price + "</td><td>" + beer[i].description + "</tr>";;
      $("#favorite tbody").append(row);
    }
  }
  $("#favorite").DataTable({
    "paging": false,
    "ordering": true,
    "info": false,
    "columnDefs": [{
      "visible": false,
      "targets": [4]
    }] //the description column needs to exist but not be seen
  });

  //the above two functions really need to be combined at some point
  return row;
}

function logCheck() {
  if (sessionStorage.getItem('status') == null) {
    alert("please log in to track your drinks"); //blatant advertising
    document.getElementById("fav").disabled = true; //disable until log in
    return 0;
  } else {
    return 1;
  }
}

function childSpawn(table) {
  var target = '#' + table;
  console.log(target);
  var table = $('#' + table).DataTable();

  function format(current) {

    //return a big mess of markup that generates a child row, DO NOT TOUCH
    return '<table cellpadding="0" cellspacing="0" border="0" style="padding-left:50px;">' +
      '<tr>' +
      '<td><div class="d-inline-flex">' +
      '<div class = "card rounded" style = "width: 50%;">' +
      '<p style = \"font-size:80%;\">' + current[4] + '</p>' +
      '</div>' +
      '<div  class = "card" style = "width: 50%;">' +
      '<form action="/review" method = "POST" >' +
         '<input type="text" name = "score"  id = "review" class ="form-control-lg" placeholder = "/5"   style="width:100%;">' +
         '<input type = "hidden" name = "beer" value = "' + current[0] + '">' +
         '<input type = "hidden" name = "user" value="wes">' +
         '<button type="submit" class="btn btn-info" style = "width:100%">submit</button>' +
      '</form>' +
      '</td>' +
      '</div>' +

      '</div>' +
      '</tr>' +
    '</table>';

  }
  var targetBody = target + ' tbody'
  $(targetBody).on('click', '#control', function() {
    var tr = $(this).parents('tr');
    var row = table.row(tr);
    if (row.child.isShown()) {
      // close an open row
      row.child.hide();
      tr.removeClass('shown');
    } else {
      console.log("reached target body variable")
      // open a row
      // data comes from the json object and is turned into an array, just js things
      row.child(format(row.data())).show();
      tr.addClass('shown');
    }
  });
}

function tabulate(evt, table) {
  var i, content, link;
  content = document.getElementsByClassName("content");
  for (i = 0; i < content.length; i++) {
    //oddly enough a for each loop wont work here, returns an undefined object
    content[i].style.display = "none";
  }
  link = document.getElementsByClassName("link");
  for (i = 0; i < link.length; i++) {
    link[i].className = link[i].className.replace(" active", "");
  }
  document.getElementById(table).style.display = "block";
  evt.currentTarget.className += " active";
}
