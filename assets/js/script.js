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



console.log($("#maxCal").val())


function getRecipeInfo() {
    let maxCal = maxCalEl.val()
    if(!maxCal){
        maxCal = 100000
    }
    let minCal = minCalEL.val()
    if(!minCal){
        minCal = 0
    }
    let maxProt = maxProtEl.val()
    if(!maxProt){
        maxProt = 10000
    }
    let minProt = minProtEl.val()
    if(!minProt){
        minProt = 0
    }
    let maxCarbs = maxCarbsEl.val()
    if(!maxCarbs){
        maxCarbs = 10000
    }
    let minCarbs = minCarbsEl.val()
    if(!minCarbs){
        minCarbs = 0
    }
    let maxFat = maxFatEl.val()
    if(!maxFat){
        maxFat = 10000
    }
    let minFat = minFatEl.val()
    if(!minFat){
        minFat = 0
    }
    console.log(maxCal)
    console.log(maxFat)
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + maxCal + "&minCalories=" + minCal + "&maxProtein=" + maxProt + "&minProtein=" + minProt + "&maxCarbs=" + maxCarbs + "&minCarbs=" + minCarbs + "&maxFat=" + maxFat + "&minFat=" + minFat + "&sort=popularity&offset=" + offset + "&number=10&apiKey=12e90f7110fa407caf3c0a919ae2be54";

    let cardDivEl = document.createElement("div")
    cardDivEl.setAttribute("class", "recipe-cards")

    

    fetch(apiUrl)
        .then(function(response) {
        if(response.ok) {
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
        } else {
            for(let i = 0; i < 10; i++) {
                let recipeCard = document.createElement("div");
                recipeCard.setAttribute("class", "card recipe-card");
                let recipeName = "Placeholder " + i
                // console.log(recipeName)
                let cardTitle = document.createElement("h2");
                cardTitle.setAttribute("class", "card-content");
                cardTitle.textContent = recipeName;
                recipeCard.append(cardTitle);
                cardDivEl.append(recipeCard);
        }}}) 
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

