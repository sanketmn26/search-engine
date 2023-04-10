

//below function will fire when user clicks on search icon or presses 'Enter' key
function fetch_data() {

    //this will fetch query data from key in session storage
    let query = sessionStorage.getItem("query");
    document.getElementById("query").value = query;
    console.log(query);

    //this will change <title> of the document
    document.title = query;

    //this will clear image and links container
    document.getElementById("div1").innerHTML = "";
    document.getElementById("div2").innerHTML = "";
    document.getElementById("text_result").innerHTML = "";


    //article data fetch API (Used Web Search api from rapidapi.com - https://rapidapi.com/herosAPI/api/web-search24/)
    const web_options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a56dfa7cfamshf2f6d4d227ecf64p19da2cjsn1b4006d1d8cc',
            'X-RapidAPI-Host': 'web-search24.p.rapidapi.com'
        }
    };

    //fetching query data from link
    let data_URL = `https://web-search24.p.rapidapi.com/?query=${query}&max=100&proxy=US`

    //store response in Promise
    let data = fetch(data_URL, web_options)

    //convert JSON into object
    data.then(response => response.json())

        .then(
            result => {
                console.log(result);

                //storing array from JSON file, to get its length
                let array=result.results;
                console.log(array.length);

                //iterating through JSON data and show 20 articles on result section 
                for (let i = 0; i <= array.length; i++) {

                    document.getElementById("text_result").innerHTML += `<div class="article_cards">
            <p class="link">&#10148;${result.results[i].url}</p>
            <a href="${result.results[i].url}"><span class="heading">${result.results[i].title}</span></a>
            <p class="description">${result.results[i].description}</p>
            </div>`;
                }
            })


        .catch(err => console.error(err));




    /*----- Image fetch API -----*/

    //Image fetch API (Used Web Search api from rapidapi.com - https://rapidapi.com/jojapi/api/joj-image-search)
    const img_options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a56dfa7cfamshf2f6d4d227ecf64p19da2cjsn1b4006d1d8cc',
            'X-RapidAPI-Host': 'joj-image-search.p.rapidapi.com'
        }
    };

    //fetching query data from link
    let img_URL = `https://joj-image-search.p.rapidapi.com/v2/?q=${query}&hl=en`;

    //store response in Promise
    let images = fetch(img_URL, img_options);

    //convert JSON into object
    images.then(response => response.json())

        .then(
            result => {
                console.log(result);

                let count1 = 0;
                let count2 = 0;

                //iterating through JSON data and show 10 images on result section 
                for (let i = 0; i < 60; i++) {

                    // showing images which are more than 180 pixels in height for better viewing experience
                    if (result.response.images[i].thumbnail.height < 180) {
                        continue;
                    }

                    // showing sorted images from above in div1 and div2 (5 images in each div for for better viewing experience)
                    if (count1 < 5) {
                        document.getElementById("div1").innerHTML += `<img src="${result.response.images[i].thumbnail.url}">`;
                        count1++;
                    }
                    else if (count2 < 5) {
                        document.getElementById("div2").innerHTML += `<img src="${result.response.images[i].thumbnail.url}">`;
                        count2++;
                    }
                }

                // applying media query - if screen is less than 990 pixels then div2 images will merge 
                // into div1 and div2 will be hidden. This is for better viewing experience.
                let x = window.matchMedia("(max-width:990px)");
                if (x.matches) {
                    let d1 = document.getElementById("div1").innerHTML;
                    let d2 = document.getElementById("div2").innerHTML;
                    document.getElementById("div1").innerHTML = d1 + d2;
                    document.getElementById("div2").style.display = "none";
                }
            }
        );


}

// *******************************************************************************************




// // Code below is used for trial. Using demo JSON files.


// /*-----Demo images fetching-----*/

// let promise1 = fetch('image_data.json');
// promise1.then(response => response.json())
//     .then(
//         result => {
//             console.log(result);

//             let count1 = 0;
//             let count2 = 0;

//             for (let i = 0; i < 60; i++) {

//                 if (result.response.images[i].thumbnail.height < 180) {
//                     continue;
//                 }

//                 if (count1 < 5) {
//                     document.getElementById("div1").innerHTML += `<img src="${result.response.images[i].thumbnail.url}">`;
//                     count1++;
//                 }
//                 else if (count2 < 5) {
//                     document.getElementById("div2").innerHTML += `<img src="${result.response.images[i].thumbnail.url}">`;
//                     count2++;
//                 }
//             }

//             let x = window.matchMedia("(max-width:990px)");
//             if (x.matches) {
//                 let d1 = document.getElementById("div1").innerHTML;
//                 let d2 = document.getElementById("div2").innerHTML;
//                 document.getElementById("div1").innerHTML = d1 + d2;
//                 document.getElementById("div2").style.display = "none";
//             }
//         }
//     );




// /*-----Demo article data fetching-----*/

// let promise = fetch('data.json');

// promise.then(response => response.json())
//     .then(
//         result => {
//             console.log(result);

//             for (let i = 0; i <= 19; i++) {

//                 document.getElementById("text_result").innerHTML += `<div class="article_cards">
//                 <p class="link">&#10148;${result.results[i].url}</p>
//                 <a href="${result.results[i].url}"><span class="heading">${result.results[i].title}</span></a>
//                 <p class="description">${result.results[i].description}</p>
//                 </div>`;

//             }
//         }

//     );