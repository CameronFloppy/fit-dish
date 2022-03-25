let maxCalEl = $("#maxCal");
let minCalEL = $("#minCal");
let maxProtEl = $("#maxProt");
let minProtEl = $("#minProt");
let maxCarbsEl = $("#maxCarb");
let minCarbsEl = $("#minCarb");
let minFatEl = $("#minFat");
let maxFatEl = $("#maxFat");

let recipeListEl = document.querySelector(".recipes")
let offset = 0;

let maxCal = 10000
let minCal = 0
let maxProt = 1000
let minProt = 0
let maxCarbs = 1000
let minCarbs = 0
let maxFat = 1000
let minFat = 0


function getRecipeInfo() {
    if(maxCal){
    let maxCal = maxCalEl.val()
    }
    if(minCal){
    let minCal = minCalEL.val() 
    }
    if(maxProt){
    let maxProt = maxProtEl.val()
    }
    if(minProt){
    let minProt = minProtEl.val()
    }
    if(maxCarbs){
    let maxCarbs = maxCarbsEl.val()
    }
    if(minCarbs){
    let minCarbs = minCarbsEl.val()
    }
    if(maxFat){
    let maxFat = maxFatEl.val()
    }
    if(minFat){
    let minFat = minFatEl.val()
    }
    console.log(maxCal)
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + maxCal + "&minCalories=" + minCal + "&maxProtein=" + maxProt + "&minProtein=" + minProt + "&maxCarbs=" + maxCarbs + "&minCarbs=" + minCarbs + "&maxFat=" + maxFat + "&minFat=" + minFat + "&sort=popularity&offset=" + offset + "&number=10&apiKey=12e90f7110fa407caf3c0a919ae2be54";

    let cardDivEl = document.createElement("div")
    cardDivEl.setAttribute("class", "recipe-cards")

  
    fetch(apiUrl)
        .then(function(response) {

            response.json().then(function(data){
                console.log(data)
                for(let i = 0; i < data.results.length; i++) {
                    let recipeCard = document.createElement("div");
                    recipeCard.setAttribute("class", "card recipe-card");
                    let recipeName = data.results[i].title
                    console.log(recipeName)
                    let cardTitle = document.createElement("h2");
                    cardTitle.setAttribute("class", "card-content");
                    cardTitle.textContent = recipeName;
                    recipeCard.append(cardTitle);
                    cardDivEl.append(recipeCard);
                }
                })
            }) 
    recipeListEl.append(cardDivEl)
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

function clearRecipes() {
    let recipeList = document.querySelector(".recipe-cards");
    recipeList.remove();
}

