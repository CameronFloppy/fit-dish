let maxCal=1000
let minCal = 0
let maxProt = 100
let minProt = 0
let maxCarbs = 90
let minCarbs = 0
let maxFat = 100
let minFat = 0
let recipeListEl = $(".recipes")
let offset = 0;






function getRecipeInfo() {

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
                    recipeListEl.append(recipeCard);
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

// $(".recipe-cards").sortable({
//     connectWith: $(".calendar"),
//     scroll: false,
//     tolerance: "pointer",
//     helper: "clone",
//     activate: function(event) {
//         $(this).addClass("dropover");
//         $(".bottom-trash").addClass("bottom-trash-drag");
//     },
//     deactivate: function(event) {
//         $(this).removeClass("dropover");
//         $(".bottom-trash").removeClass("bottom-trash-drag");
//     },
//     over: function(event) {
//         $(event.target).addClass("dropover-active");
//     },
//     out: function(event) {
//         $(event.target).removeClass("dropover-active");
//     }
// })
getRecipeInfo();

$(".recipe-cards").sortable({
    connectWith: $(".calendar"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
});

$(".calendar").sortable({
    connectWith: $(".recipe-cards")
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

