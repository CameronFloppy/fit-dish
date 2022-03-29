// create variables linked to form elements
let maxCalEl = $("#maxCal");
let minCalEl = $("#minCal");
let maxProtEl = $("#maxProt");
let minProtEl = $("#minProt");
let maxCarbsEl = $("#maxCarb");
let minCarbsEl = $("#minCarb");
let maxFatEl = $("#maxFat");
let minFatEl = $("#minFat");
let recipeCardContainer = $("#recipe-container")

// Receive parameters from input and add them to an object
let recipesGroup = []
let searchData = {
    "maxCal" : "0",
    "minCal" : "100000",
    "maxProt" : "0",
    "minProt" : "1000",
    "maxCarbs" : "0",
    "minCarbs" : "1000",
    "maxFat" : "0",
    "minFat" : "1000"
}

function getSearchInfo (){
    // check to see if inputs have content, if not use default values
    if(maxCalEl.val()){
        searchData.maxCal = maxCalEl.val()
    }else{
        searchData.maxCal = "100000"
    }

    if(minCalEl.val()){
        searchData.minCal = minCalEl.val()
    }else{
        searchData.minCal = "1"
    }

    if(maxProtEl.val()){
        searchData.maxProt = maxProtEl.val()
    }else{
        searchData.maxProt = "100000"
    }

    if(minProtEl.val()){
        searchData.minProt = minProtEl.val()
    }else{
        searchData.minProt = "1"
    }

    if(maxCarbsEl.val()){
        searchData.maxCarbs = maxCarbsEl.val()
    }else{
        searchData.maxCarbs = "100000"
    }

    if(minCarbsEl.val()){
        searchData.minCarbs = minCarbsEl.val()
    }else{
        searchData.minCarbs = "1"
    }

    if(maxFatEl.val()){
        searchData.maxFat = maxFatEl.val()
    }else{
        searchData.maxFat = "100000"
    }

    if(minFatEl.val()){
        searchData.minFat = minFatEl.val()
    }else{
        searchData.minFat = "1"
    }

    return searchData;
    
}

// Call API with paramters in the link

//\\ let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + maxCal + "&minCalories=" + minCal + "&maxProtein=" + maxProt + "&minProtein=" + minProt + "&maxCarbs=" + maxCarbs + "&minCarbs=" + minCarbs + "&maxFat=" + maxFat + "&minFat=" + minFat + "&sort=popularity&offset=" + offset + "&number=10&apiKey=12e90f7110fa407caf3c0a919ae2be54";


function searchAPI (){
    // update api pull with search parameters
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + searchData.maxCal + "&minCalories=" + searchData.minCal + "&maxProtein=" + searchData.maxProt + "&minProtein=" + searchData.minProt + "&maxCarbs=" + searchData.maxCarbs + "&minCarbs=" + searchData.minCarbs + "&maxFat=" + searchData.maxFat + "&minFat=" + searchData.minFat + "&number=10&apiKey=ca8918d717774bfab6f09f6113ce122c"
    
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function(data){
                    for(i=0; i<10; i++){
                        let recipeData = {
                            "title" : data.results[i].title,
                            "image" : data.results[i].image
                        }
                        recipesGroup.push(recipeData)

                        recipeCard = document.createElement("div")
                        recipeCard.setAttribute("class", "card recipe-card");
                        recipeCardContainer.append(recipeCard)
                        
                        recipeTitle = document.createElement("h2")
                        recipeTitle.textContent = recipesGroup[i].title
                        recipeCard.append(recipeTitle)

                        recipePhotoDiv = document.createElement("div")
                        recipeCard.append(recipePhotoDiv)
                        recipePhotoDiv.setAttribute("class", "card-image")
                        recipePhoto = document.createElement("figure") 
                        recipePhoto.setAttribute("class", "image")
                        recipePhotoDiv.append(recipePhoto)
                        recipeImageFile = document.createElement("img")
                        recipeImageFile.setAttribute("src", data.results[i].image)
                        recipePhotoDiv.append(recipeImageFile)
                    }
                    
                    
                });
            }
            else{
                alert("help")
            }
        });
};


// Iterate through search results and display them on the page

// get image and title data and create cards on the page


// add prev and next functionality which gets more data after 10

// call get recipe info when submit is clicked
$("#gen-btn").on("click", function() {
    getSearchInfo();
    searchAPI(searchData);
})