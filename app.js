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
              $("#results").append(
                '<div class="single-result">' +
                  '<h3>' + list[i].title + '</h3>' +
                  list[i].snippet +
                  '<a href=' + 'https://en.wikipedia.org/?curid=' + list[i].pageid + ' ' + 'target=_blank' + '> See Wiki</a>' +
                '</div>'
              );
            }  
          }
        });
    });
});