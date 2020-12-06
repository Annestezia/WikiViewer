$(document).ready(function(){
 // all about input
  $('#reset').on('click', function(){
    $('#searchInput').val('');
    $('#result').text('');
  })
  $('#searchInput').keyup(function(e){
    if(e.which == 13){
      $('#searchButton').click();
    }
  });  
  $('#searchButton').click(function(){
    let input = $('#searchInput').val();
    // here goes api call  and putting  output together

    const wikiAPIEndpoint = 'https://en.wikipedia.org/w/api.php';
    let queryLink = wikiAPIEndpoint + '?action=query&list=search&format=json&continue=-%7C%7C&utf8=1&srsearch=' + encodeURI(input) + '&srlimit=10&origin=*';
     // $('.resultHeader').hide().fadeIn('fast');
     $('#result').empty();
    
    //get JSON
    $.getJSON(queryLink, function(obj){
     let title,
         snippet,
         articleURL;
      if (obj.query.search.length!==0) {
         for( let i = 0; i<obj.query.search.length; i++){
         title = obj.query.search[i].title;
         snippet = obj.query.search[i].snippet;
         articleURL = 'https://en.wikipedia.org/wiki/' + title;
         let articleDiv ='<a href="' + articleURL + '"><div class="article"><h4>' +title+'</h4>'+ snippet + '...</div></a>';
         $('#result').append(articleDiv).hide().fadeIn('fast');
         // $(articleDiv).hide().appendTo("#result").fadeIn('fast');
            } 
      } else { let  input = $('#searchInput').val();
        $('#result').html('<h2>Oops... Can\'t find anything  like ' + input + ' :( <br />Try something else</h2>');
      }
   }); 
  });
});