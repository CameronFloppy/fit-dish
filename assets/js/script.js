let maxCal=1000
let minCal = 0
let maxProt = 100
let minProt = 0
let maxCarbs = 90
let minCarbs = 0
let maxFat = 100
let minFat = 0



function getRecipeInfo() {
    let apiUrl = "https://api.spoonacular.com/recipes/complexSearch?maxCalories=" + maxCal + "&minCalories=" + minCal + "&maxProtein=" + maxProt + "&minProtein=" + minProt + "&maxCarbs=" + maxCarbs + "&minCarbs=" + minCarbs + "&maxFat=" + maxFat + "&minFat=" + minFat + "&sort=popularity&offset=0&number=10&apiKey=12e90f7110fa407caf3c0a919ae2be54";

    fetch(apiUrl).then( function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
    })
}

getRecipeInfo();