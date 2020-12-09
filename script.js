$(document).ready(function(){
 // all about input
  $('#reset').on('click', function(){
    $('#searchInput').val('');
    $('#result').text('');
  });
  $('#searchInput').keyup(function(e){
    if(e.which == 13){
      $('#searchButton').click();
    }
  });  
  $('#searchButton').click(function(){
    const input = $('#searchInput').val();
    // here goes api call  and putting  output together
    const wikiAPIEndpoint = 'https://en.wikipedia.org/w/api.php';
    const queryLink = `${wikiAPIEndpoint}?action=query&list=search&format=json&utf8=1&srsearch=${encodeURI(input)}&srlimit=10&origin=*`;
     $('#result').empty();    
    //get JSON
    $.getJSON(queryLink, function(obj){
      const searchResult = obj.query.search;

      if (searchResult.length!==0) {
        $.each(searchResult,(i, value)=>{
          const {title, snippet, pageid}=value;
          const articleURL = `https://en.wikipedia.org/wiki/${title}`;
          const articleDiv =`<a href="${articleURL}"><div class="article"><h4> ${title}</h4>${snippet}...</div></a>`;

          $('#result').append(articleDiv).hide().fadeIn(500);
        });
      } else {
        $('#result').html(`<h2>Oops... Can\'t find anything  like ${input} :( <br />Try something else</h2>`);
      }
   }); 
  });
});