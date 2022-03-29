let maxCalEl = $("#maxCal");
let minCalEL = $("#minCal");
let maxProtEl = $("#maxProt");
let minProtEl = $("#minProt");
let maxCarbsEl = $("#maxCarb");
let minCarbsEl = $("#minCarb");
let minFatEl = $("#minFat");
let maxFatEl = $("#maxFat");
let recipeCardContainer = $("#recipe-container")
var generationCounter = 0

let recipeListEl = document.querySelector(".recipes")
let offset = 0;



function error404 (){
    $( "#dialog" ).dialog({
        autoOpen: true 
    });
}


function getRecipeInfo() {

    let maxCal = maxCalEl.val()
    if(!maxCal){
        maxCal = 100000
    }
    else if(isNaN(maxCal)){
        error404();  
        return;
    }

    let minCal = minCalEL.val()
    if(!minCal){
        minCal = 0
    }
    else if(isNaN(minCal)){
        error404();  
        return;
    }

    let maxProt = maxProtEl.val()
    if(!maxProt){
        maxProt = 10000
    }
    else if(isNaN(minCal)){
        error404();  
        return;
    }

    let minProt = minProtEl.val()
    if(!minProt){
        minProt = 0
    }
    else if(isNaN(minProt)){
        error404();  
        return;
    }

    let maxCarbs = maxCarbsEl.val()
    if(!maxCarbs){
        maxCarbs = 10000
    }
    else if(isNaN(maxCarbs)){
        error404();  
        return;
    }

    let minCarbs = minCarbsEl.val()
    if(!minCarbs){
        minCarbs = 0
    }
    else if(isNaN(minCarbs)){
        error404();  
        return;
    }

    let maxFat = maxFatEl.val()
    if(!maxFat){
        maxFat = 10000
    }
    else if(isNaN(maxFat)){
        error404();  
        return;
    }

    let minFat = minFatEl.val()
    if(!minFat){
        minFat = 0
    }
    else if(isNaN(minFat)){
        error404();  
        return;
    }
    
    // let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + maxCal + "&minCalories=" + minCal + "&maxProtein=" + maxProt + "&minProtein=" + minProt + "&maxCarbs=" + maxCarbs + "&minCarbs=" + minCarbs + "&maxFat=" + maxFat + "&minFat=" + minFat + "&sort=popularity&offset=" + offset + "&number=10&apiKey=12e90f7110fa407caf3c0a919ae2be54";
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + maxCal + "&minCalories=" + minCal + "&maxProtein=" + maxProt + "&minProtein=" + minProt + "&maxCarbs=" + maxCarbs + "&minCarbs=" + minCarbs + "&maxFat=" + maxFat + "&minFat=" + minFat + "&sort=popularity&offset=" + offset + "&number=10&apiKey=ca8918d717774bfab6f09f6113ce122c";
    

    let cardDivEl = document.createElement("div")
    cardDivEl.setAttribute("class", "recipe-cards")

    

    fetch(apiUrl)
        .then(function(response) {
        if(response.ok) {
            
            response.json().then(function(data){
                
                
              if(generationCounter===0) {                 
                for(let i = 0; i < 10; i++) {
                    
                    recipeCard = document.createElement("div")
                    recipeCard.setAttribute("class", "card recipe-card");
                    
                    recipeTitle = document.createElement("h2")
                    recipeTitle.textContent = data.results[i].title
                    recipeCard.appendChild(recipeTitle)
                    
                    recipeCardContainer.append(recipeCard)
                    
                    generationCounter++;
                }   
             }
            else if(generationCounter>0){

                   location.reload() 
                
                    $('#recipe-container').children('div').each(function () {
                        $(this).text("bleh")
                    });
                 
            }
                })
        } else{
            if(generationCounter===0) {                 
                for(let i = 0; i < 10; i++) {
                    
                    recipeCard = document.createElement("div")
                    recipeCard.setAttribute("class", "card recipe-card");
                    
                    recipeTitle = document.createElement("h2")
                    recipeTitle.textContent = ("Placeholder" + i)
                    recipeCard.appendChild(recipeTitle)
                    
                    recipeCardContainer.append(recipeCard)
                    
                    generationCounter++;
                }   
             }
            else if(generationCounter>0){
            
                    $('#recipe-container').children('div').each(function () {
                        $(this).text("hello")
                    });
                 
            }
                
            }}) 
    
}

$("#gen-btn").on("click", function() {
    getRecipeInfo();
})

$(".recipe-cards").sortable({
    connectWith: $(".calendar"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
});

$(".dropZone").droppable({
    connectWith: $(".recipe-cards"),
    drop: function() {
        this.textContent = "drop";
    }
})

$("#prev-btn").on("click", function(){
    if (offset >= 10) {
        offset -= 10
        console.log(offset)
        clearRecipes()
        getRecipeInfo(offset)
    }
})

$("#next-btn").on("click", function() {
    offset += 10
    console.log(offset)
    clearRecipes()
    getRecipeInfo(offset);
})

// function clearRecipes() {
//     let recipeList = document.querySelector(".recipe-cards");
//     recipeList.remove();
// }

