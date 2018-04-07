$(document).ready(function() {
  
    $("#search").submit(function(e){
        e.preventDefault();
        var search = document.getElementById("query").value;
  
        $.ajax({
          'url': 'https://en.wikipedia.org/w/api.php?' + 'format=json' + '&action=query' + '&list=search' + '&srsearch=' + search + '&origin=*',
          'dataType': 'json',
          'type': 'GET',
          'success': function(data) {
            var list = data.query.search
            console.log(list);
            $("#results").empty();          
            for(var i = 0; i < list.length; i++) {
              $("#results").append('<h3>' + list[i].title + '</h3>');
              $("#results").append(list[i].snippet);
              $("#results").append('<a href=' + 'https://en.wikipedia.org/?curid=' + list[i].pageid + ' ' + 'target=_blank' + '> See Wiki</a>')
            }  
          }
        });
    });
});