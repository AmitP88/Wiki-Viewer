$(document).ready(function() { 
    $("#search").submit(function(e){
        e.preventDefault();
        var search = document.getElementById("query").value;
  
        $.ajax({
          'url': 'https://en.wikipedia.org/w/api.php?' + 'format=json' + '&action=query' + '&list=search' + '&srsearch=' + search + '&origin=*',
          'dataType': 'json',
          'type': 'GET',
          'success': function(data) {
            var list = data.query.search;
            $("#results").empty();          
            if (list.length > 0){
              stagger(list, 0);
            }
            function stagger(list, i) {
              $("#results").append(
                '<div class="single-result slideRight">' +
                  '<a href=' + 'https://en.wikipedia.org/?curid=' + list[i].pageid + ' ' + 'target=_blank' + '>' +
                    '<h3>' + list[i].title + '</h3>' +
                  '</a>' +
                  list[i].snippet + '<a href=' + 'https://en.wikipedia.org/?curid=' + list[i].pageid + ' ' + 'target=_blank' + '>' + ' ...' + '</a>' +
                '</div>'
              );
              i++;
              if (i < list.length) {
                setTimeout(() => stagger(list, i), 1000);
              }
            }
            // display "No results found if no wiki articles were found based on search criteria"
            if(list.length === 0){
              $("#results").append(
                '<p class="no-results">No results found</p>'
              );
            }

            // empties search box after search is complete
            document.getElementById("query").value = "";

          }
        });
    });
});