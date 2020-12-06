


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

    const queryLink = `${wikiAPIEndpoint}?action=query&list=search&format=json&continue=-%7C%7C&utf8=1&srsearch=${encodeURI(input)}&srlimit=10&prop=url&origin=*&continue`;
    $('#result').empty();
    
    //get JSON
    $.getJSON(queryLink, function(obj){
      const searchResult = obj.query.search;
      console.log(obj);

      if (searchResult.length!==0) {
        $.each(searchResult,(i, value)=>{
          const {title, snippet, pageid}=value;
          const articleURL = `https://en.wikipedia.org/wiki/${title}`;
          const articleDiv =`<a href="${articleURL}"><div class="article"><h4> ${title}</h4>${snippet}...</div></a>`;
          const more = `<a href="" class="btn btn-success" id="moreBtn">Load more >></a>`;

          $('#result').append(articleDiv).hide().fadeIn(500);
          if(i===searchResult.length-1&&!obj.batchcomplete){            
            $('#result').append(more);
            $("#moreBtn").click(e=>{
              e.preventDefault(); 
            });            
          }
        });


      } else { const  input = $('#searchInput').val();
        $('#result').html(`<h2>Oops... Can\'t find anything  like ${input} :( <br />Try something else</h2>`);
      }
   }); 
  });
});