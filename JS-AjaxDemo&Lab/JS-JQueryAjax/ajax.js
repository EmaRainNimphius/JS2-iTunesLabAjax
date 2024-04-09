// this won't be .ready it'll be on submit or click or something
$(document).ready(function (){
    // run when page is loaded

    const params = {
        q: 'javascript', // change this to user input
        maxResults: 24,
    }

    $.get(
        'https://www.googleapis.com/books/v1/volumes', //endpoint (url)
        params,
        function (data){
            console.log('results', data);

            // looping through data.items
            // data.items is unique to Google Books
            // when doing lab it'll be different. You need to look up what the api returns it ass
            for(let item of data.items){
                // item will be the individual book

                $('#results').append(`
                    <h3>${ item.volumeInfo.title }</h3>
                    <p>SubTitle: ${ item.volumeInfo?.subtitle?.toUpperCase() ?? 'N/A' }</p>
                    <!-- the ? is an optional thing, so if a subtitle exits itll change it to upper case
                        if it doesn't exist then it'll output an empty string-->
                    <p>Author(s): ${ item.volumeInfo?.authors?.join(', ') }</p>
                    <br>
                `)
            }
        },
        'json'
    );

    console.log('done loading');

});