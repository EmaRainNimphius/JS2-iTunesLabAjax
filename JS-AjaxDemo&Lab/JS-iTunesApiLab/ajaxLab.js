function submitForm(){

    let userInput = document.getElementById("artist").value;

    if(userInput == ""){
        console.log("invalid user input")
        $('#invalidInput').append(`
                    <h3 style="color: #A81620">Invalid Input: please enter artist's name</h3>
                `)

    }else {

        const params = {
            term: userInput,
        }


        $.get(
            'https://itunes.apple.com/search' || 'https://itunes.apple.com/lookup',
            params,
            function (data){
                console.log('Results', data);
                let savedId = 0;
                for(let item of data.results){
                    // did to upper so that it's not case-sensitive and will display
                    if(item.artistName.toUpperCase() === userInput.toUpperCase()){
                        $('#artistName').append(`
                    <h2>${'Songs By/Featuring: ' + userInput} </h2>
                    <hr>
                `)
                        savedId = item.artistId
                        console.log('Saved Artist Id', savedId);
                        break;
                    }
                }

                // creating and adding collection names to array
                var itemList = [];
                for(item of data.results){
                    if(item.artistId === savedId){

                        itemList.push(item.trackName);
                    }
                }
                console.log('Unfiltered Tracks Length: ' + itemList.length);

                // getting unique items
                var uniqueList = itemList.filter((value, index, array) => array.indexOf(value) === index);
                console.log('Unique Tracks', uniqueList)
                // displaying array
                let count = 1;
                for (var i = 0; i < uniqueList.length; i++) {

                    $('#artistAlbums').append(`
                    <p>${ count + '&nbsp;|&nbsp;&nbsp;&nbsp;' + uniqueList[i] }</p>
                `)
                    count++;
                }

            },
            'json'
        );
    }

};