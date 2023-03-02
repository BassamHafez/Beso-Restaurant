var recipes = [];
var detailsArray=[];
var rows=document.getElementById("rows");
var navLink=document.querySelectorAll(".food");
var homeLink=document.getElementById("home");
var footer=document.getElementById("footer");
var details=document.getElementById("details");
var viewDetails=document.getElementById("viewDetails");
var currentMeal;
var reveals=document.querySelectorAll(".reveal");
var reveal4=document.querySelector(".reveal4")
var nav=document.querySelector(".navbar");
var loadScreen=document.querySelector(".loading")


document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        loadScreen.style.display = "flex";
        document.getElementById("body").style.cssText="overflow-y:hidden";

    } else {
        loadScreen.style.display = "none";
        document.getElementById("body").style.cssText="overflow-y:auto";
    }
}

homeLink.addEventListener("click",function(){
    footer.classList.remove=("d-none");
    details.classList.remove("d-none"); 
    rows.classList.add("d-none");
    for(var i=0;i<navLink.length;i++){
        navLink[i].classList.remove("active");
    }
    this.classList.add("active");
})


for(var i=0;i<navLink.length;i++){
navLink[i].addEventListener("click",function(e){
currentMeal=e.target.text;
footer.classList.add=("d-none");
details.classList.add("d-none");
rows.classList.remove("d-none");
this.classList.add("active");
homeLink.classList.remove("active");
getRecipes(currentMeal);
})
}


async function getRecipes(type) {
    loadScreen.style.display = "flex";
    document.getElementById("body").style.cssText="overflow-y:hidden";
    var response =await fetch( `https://forkify-api.herokuapp.com/api/search?q=${type}`);
    recipes=(await response.json()).recipes;
    display();
    // var httpRequest = new XMLHttpRequest();
    // httpRequest.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${type}`);
    // httpRequest.send();
    // httpRequest.addEventListener("readystatechange", function () {
    //     if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    //         recipes = JSON.parse(httpRequest.response).recipes;
    //         display();

    //     }
    // })
}

function display() {
    var recipe = "";
    for (var i = 0; i < recipes.length; i++) {
        recipe += `
   
        <div class=" col-sm-6 col-md-4 col-lg-3 ">  
        <div class="meal">
        <div class="img-meal">
          <img src="${recipes[i].image_url}" class="w-100 meal-img" alt="meal">
          
           <div class="recipe-title p-3">
            <p class="title-p">${recipes[i].title}</p>
            <a href=${recipes[i].source_url} target="_blank" class="btn btn-outline-warning my-1 ">Source</a>
            <a href=# onclick="getDetails(${recipes[i].recipe_id})" class="btn btn-outline-warning my-1 " data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
            </div>
           </div>
        </div>
    </div>
        `
    }

rows.innerHTML=recipe;
loadScreen.style.display = "none";
document.getElementById("body").style.cssText="overflow-y:auto";
}

async function getDetails(Id){
var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${Id}`);
detailsArray=(await response.json()).recipe;
displayDetails();
}

function displayDetails(){
    var detailsCartoona="";
    detailsCartoona+=
    `
    <h1>${detailsArray.title}</h1>
    <img src="${detailsArray.image_url}"></img>
    <p>${detailsArray.publisher}</p>
    <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Show ingredients <i class="fa-solid fa-angles-down"></i>
    </button>
    <div class="collapse" id="collapseExample">
    <div class="card card-body mt-2">
    <ul id='ingredients'></ul>
    </div>
    </div>
    `
    viewDetails.innerHTML=detailsCartoona;
    seperateIngredients();
}

function seperateIngredients(){
    cartoona=''; 
    for(i=0;i<detailsArray.ingredients.length;i++){
        cartoona+= `<li><i class="fa-solid fa-utensils"></i> ${detailsArray.ingredients[i]}</li>`
    }
    document.getElementById("ingredients").innerHTML=cartoona;
}


window.addEventListener("scroll",getReveal);

function getReveal(){
    for(let i=0;i<reveals.length;i++){
        let windoHeight=window.innerHeight;
        const revealPoint=150;
        let distanceTop=reveals[i].getBoundingClientRect().top;
        if(distanceTop<windoHeight-revealPoint){
            reveals[i].classList.add("showing");
        }
        else{
            reveal4.classList.remove("showing");
        }
    }    
    
}

window.addEventListener('scroll',getNavScroll);

function getNavScroll(){
    var scrolled=window.scrollY;
if(scrolled>400){
    nav.classList.add("nav-color");
    document.querySelector(".arrow-up").classList.remove("d-none");
}

else if(scrolled<400){
    nav.classList.remove("nav-color");
    document.querySelector(".arrow-up").classList.add("d-none");

}
}

