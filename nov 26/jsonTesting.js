
var beer = [
  {name: "turbodog",       type: "type",rating: 4.5,price: 3.1,favorite: 1, description:"this is whrere the description will go","favorite":1},
  {name:'Alaskan stout',   type:'type', rating: 4.9,price: 5.0,favorite: 1, description:"this is whrere the description will go","favorite":0},
  {name:'allagash tripple',type: 'type',rating: 3.7,price: 4.0,favorite: 0, description:"this is whrere the description will go","favorite":1},
  {name:'liberty ale',     type: 'type',rating: 2.4,price: 6.8,favorite: 0, description:"this is whrere the description will go","favorite":1},
  {name:'hop ottin',       type: 'type',rating: 3.6,price: 7.8,favorite: 0, description:"this is whrere the description will go","favorite":0},
  {name:'steam beer',      type: 'type',rating: 4.8,price: 3.9,favorite: 1, description:"this is whrere the description will go","favorite":0},
  {name:'old foghorn',     type: 'type',rating: 3.0,price: 7.8,favorite: 1, description:"this is whrere the description will go","favorite":0},
  {name:'poleeko gold',    type: 'type',rating: 2.8,price: 5.3,favorite: 0, description:"this is whrere the description will go","favorite":1},
  {name:'allagash white',  type: 'type',rating: 4.5,price: 5.1,favorite: 0, description:"this is whrere the description will go","favorite":0},
  {name:'oberon',          type: 'type',rating: 3.0,price: 4.4,favorite: 0, description:"this is whrere the description will go","favorite":1}
];
//list of json objects, this is probably a really bad way to do this
function buildTable(){
  for (var i in beer){
    var row = "<tr><td id = \"control\">" + beer[i].name + "</td><td>" + beer[i].type + "</td><td>"+ beer[i].rating +"</td><td>" + beer[i].price+"</td><td>"+ beer[i].description+ "</tr>";                       ;
      $("#example tbody").append(row);
   }
   $("#example").DataTable( {
       "paging":   false,
       "ordering": true,
       "info":     false,
       "columnDefs": [{"visible":false,"targets":[4]}]
     });
    return row;
}
function buildFavs(){
    for (var i in beer){
      if(beer[i].favorite == 1){
      var row = "<tr><td id = \"control\">" + beer[i].name + "</td><td>" + beer[i].type + "</td><td>"+ beer[i].rating +"</td><td>" + beer[i].price+"</td><td>"+ beer[i].description+ "</tr>";                       ;
        $("#favorite tbody").append(row);
     }
   }
     $("#favorite").DataTable( {
         "paging":   false,
         "ordering": true,
         "info":     false,
         "columnDefs": [{"visible":false,"targets":[4]}] //the description column needs to exist but not be seen
       });

//the above two functions really need to be combined at some point
      return row;
}
function logCheck(){
    if (sessionStorage.getItem('status') == null){
      alert("please log in to track your drinks"); //blatant advertising
      document.getElementById("fav").disabled = true; //disable until log in
      return 0;
    } else {
      return 1;
    }
}

function childSpawn(table){
  var target = '#'+table;
  console.log(target);
  var table = $('#'+table).DataTable();
  function format (current) {
    //return a big mess of markup that generates a child row, DO NOT TOUCH
      return '<table cellpadding="0" cellspacing="0" border="0" style="padding-left:50px;">'+
                '<tr>'+
                 '<td><div class="d-inline-flex">'+
                          '<div class = "card rounded" style = "width: 50%;">' +
                               '<p style = \"font-size:80%;\">' + current[4] +  '</p>'+
                          '</div>' +
                          '<div  class = "card" style = "width: 50%;">' +
                              '<form action="/review.js" method = "POST" >' +
                              '<input type="text"  id = "review" class ="form-control-lg" placeholder = "/5"   style="width:100%;">'+
                          '</div>'+
                       '</div> <button type="submit" class="btn btn-info" style = "width:100%">submit</button></td>' +
                '</tr>';
             '</table>';
  }
  var targetBody = target + ' tbody'
$(targetBody).on('click', '#control', function () {
  var tr = $(this).parents('tr');
  var row = table.row(tr);
  if ( row.child.isShown() ) {
      // close an open row
      row.child.hide();
      tr.removeClass('shown');
  }
  else {
      // open a row
      // data comes from the json object
      row.child(format(row.data())).show();
      tr.addClass('shown');
  }
} );
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
function openForm(id) {
  console.log('hello' + id);
  document.getElementById(id).style.display = "block";
}

function closeForm() {
  document.getElementById(id).style.display = "none";
}
