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





function getRecipeInfo() {
    let maxCal = maxCalEl.val()
    let minCal = minCalEL.val()
    let maxProt = maxProtEl.val()
    let minProt = minProtEl.val()
    let maxCarbs = maxCarbsEl.val()
    let minCarbs = minCarbsEl.val()
    let maxFat = maxFatEl.val()
    let minFat = minFatEl.val()
    console.log(maxCal)
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + maxCal + "&minCalories=" + minCal + "&maxProtein=" + maxProt + "&minProtein=" + minProt + "&maxCarbs=" + maxCarbs + "&minCarbs=" + minCarbs + "&maxFat=" + maxFat + "&minFat=" + minFat + "&sort=popularity&addRecipeInformation=true&offset=" + offset + "&number=10&apiKey=12e90f7110fa407caf3c0a919ae2be54";

    let cardDivEl = document.createElement("div")
    cardDivEl.setAttribute("class", "recipe-cards")
    

    

    fetch(apiUrl)
        .then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data)
                for(let i = 0; i < data.results.length; i++) {
                    let recipeCard = document.createElement("div");
                    recipeCard.setAttribute("class", "card recipe-card draggable");
                    let recipeName = data.results[i].title
                    console.log(recipeName)
                    let cardTitle = document.createElement("h2");
                    cardTitle.setAttribute("class", "card-content");
                    let recipeLink = document.createElement("a")
                    recipeLink.setAttribute("href", data.results[i].spoonacularSourceUrl);
                    recipeLink.setAttribute("target", "_blank");
                    recipeLink.textContent = " Link to Recipe"
                    cardTitle.textContent = recipeName;
                    cardTitle.append(recipeLink);
                    recipeCard.append(cardTitle);
                    cardDivEl.append(recipeCard);
                }
                $(".draggable").draggable({
                    revert: "valid",
                });
                $(".test").droppable();
                })
                
        } else {
            for(let i = 0; i < 10; i++) {
                let recipeCard = document.createElement("div");
                recipeCard.setAttribute("class", "card recipe-card");
                recipeCard.setAttribute("id", "draggable")
                let recipeName = "Placeholder " + i
                // console.log(recipeName)
                let cardTitle = document.createElement("h2");
                cardTitle.setAttribute("class", "card-content");
                cardTitle.textContent = recipeName;
                recipeCard.append(cardTitle);
                cardDivEl.append(recipeCard);
        }}}) 
    recipeListEl.append(cardDivEl);
}

$("#gen-btn").on("click", function() {
    getRecipeInfo();
})

$(".dropZone").droppable({
    connectWith: $(".recipe-cards"),
    drop: function() {
        let dropItem = ui.draggable
        console.log(dropItem)
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

