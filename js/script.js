

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


// ^ -------------  navbar menu part  -----------------

function openNav() {
    $(".navbar-menu").animate({
        left: 0
    }, 500)


    $(".toggle-icon").removeClass("fa-align-justify");
    $(".toggle-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeNav() {
    let boxWidth = $(".navbar-menu .nav-tab").outerWidth()
    $(".navbar-menu").animate({
        left: -boxWidth
    }, 500)

    $(".toggle-icon").addClass("fa-align-justify");
    $(".toggle-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeNav()
$(".navbar-menu i.toggle-icon").click(() => {
    if ($(".navbar-menu").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})


// ^ -------------  meals show part  -----------------


function createMealItem(meal) {
    return `
    <div class="col-md-3">
        <div onclick="mealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${meal.strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
    </div>`;
}

function displayMeals(arr) {
    let mealCard = '';
    for (let i = 0; i < arr.length; i++) {
        mealCard += createMealItem(arr[i]);
    }
    document.getElementById("rowData").innerHTML = mealCard;
}




// ~ -------------  meals/ categories only -----------------


async function mealsByCategories(){

    document.getElementById("rowData").innerHTML=''
    $(".loading-screen").fadeIn(400)
    document.getElementById("searchContainer").innerHTML="";


    let response= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    response = await response.json();

    displayCategories(response.categories)
    $(".loading-screen").fadeOut(400)
}

function displayCategories(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="mealsCategories('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2 justify-content-center align-content-center">
                        <h3 >${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    document.getElementById("rowData").innerHTML = cartona;
}

// ~ -------------  meals/ area only -----------------
async function mealsByArea() {
    document.getElementById("rowData").innerHTML = ""
    $(".loading-screen").fadeIn(400)

    document.getElementById("searchContainer").innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response.meals);

    displayArea(response.meals)
    $(".loading-screen").fadeOut(400)

}


function displayArea(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    document.getElementById("rowData").innerHTML = cartona;
}


// ~ -------------  meals /ingredients only -----------------
async function getIngredients() {
    document.getElementById("rowData").innerHTML = ""
    $(".loading-screen").fadeIn(400)

    document.getElementById("searchContainer").innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log(response.meals);

    displayIngredients(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(400)

}


function displayIngredients(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    document.getElementById("rowData").innerHTML = cartona
}


// ~ -------------  meals with details-----------------

async function mealsCategories(category) {
    document.getElementById("rowData").innerHTML = ""
    $(".loading-screen").fadeIn(400)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(400)

}



async function getAreaMeals(area) {
    document.getElementById("rowData").innerHTML = ""
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}


async function getIngredientsMeals(ingredients) {
    document.getElementById("rowData").innerHTML = ""
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}

async function mealDetails(mealId) {
    closeNav()
    document.getElementById("rowData").innerHTML = ""
    $(".loading-screen").fadeIn(300)

    document.getElementById("searchContainer").innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    response = await response.json();

    showMealDetails(response.meals[0])
    $(".loading-screen").fadeOut(300)

}

function showMealDetails(meal) {
    document.getElementById("searchContainer").innerHTML = "";
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredientsList += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    let tagsArray = meal.strTags ? meal.strTags.split(",") : [];
    let tagsList = tagsArray.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join("");
    let mealDetails = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3>Recipes:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredientsList}
        </ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsList}
        </ul>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
    </div>`;
    document.getElementById("rowData").innerHTML = mealDetails;
}




// ^ -------------  search part  -----------------

function showSearchInputs() {
    document.getElementById("searchContainer").innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control  text-danger" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control  text-danger" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    document.getElementById("rowData").innerHTML = "";
}

async function searchByName(word) {
    closeNav()
    document.getElementById("rowData").innerHTML = "";
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(300)

}

async function searchByFirstLetter(word) {
    closeNav()
    document.getElementById("rowData").innerHTML = "";
    $(".loading-screen").fadeIn(300)

    word === "" ? word == "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${word}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(300)

}



// ^ -------------  Contact Us part  -----------------


let nameInputActivated = false;
let emailInputActivated = false;
let phoneInputActivated = false;
let ageInputActivated = false;
let passwordInputActivated = false;
let repasswordInputActivated = false;

function contactUs() {
    document.getElementById("rowData").innerHTML = `
    <div class="contact vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers are not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email is not valid *exemple@abcd.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid repassword 
                </div>
            </div>
        </div>
        
        <button id="submitBtn" disabled class="btn btn-outline-success px-2 mt-3">Submit</button>
    </div>
</div> `

    // checking user input status 
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputActivated = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputActivated = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        emailInputActivated = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        emailInputActivated = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputActivated = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputActivated = true
    })
}

// ~ -------------  Alerts -----------------

function alert(inputActivated, validationFunc, alertName) { // compressed way 
    let alertElement = document.getElementById(alertName);
    if (inputActivated) {
        if (validationFunc()) {
            alertElement.classList.replace("d-block", "d-none");
        } else {
            alertElement.classList.replace("d-none", "d-block");
        }
    }
}

function inputsValidation() {
    alert(nameInputActivated, nameValidation, "nameAlert");
    alert(emailInputActivated, emailValidation, "emailAlert");
    alert(phoneInputActivated, phoneValidation, "phoneAlert");
    alert(ageInputActivated, ageValidation, "ageAlert");
    alert(passwordInputActivated, passwordValidation, "passwordAlert");
    alert(repasswordInputActivated, repasswordValidation, "repasswordAlert");

    if (
        nameValidation() && 
        emailValidation() && 
        phoneValidation() && 
        ageValidation() && 
        passwordValidation() && 
        repasswordValidation()
    ) {
        document.getElementById("submitBtn").removeAttribute("disabled");
    } else {
        document.getElementById("submitBtn").setAttribute("disabled", true)
    }
}

// another way 
// function inputsValidation() {
//     if (nameInputActivated) {
//         if (nameValidation()) {
//             document.getElementById("nameAlert").classList.replace("d-block", "d-none")

//         } else {
//             document.getElementById("nameAlert").classList.replace("d-none", "d-block")

//         }
//     }
//     if (emailInputActivated) {

//         if (emailValidation()) {
//             document.getElementById("emailAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("emailAlert").classList.replace("d-none", "d-block")

//         }
//     }

//     if (phoneInputActivated) {
//         if (phoneValidation()) {
//             document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

//         }
//     }

//     if (ageInputActivated) {
//         if (ageValidation()) {
//             document.getElementById("ageAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("ageAlert").classList.replace("d-none", "d-block")

//         }
//     }

//     if (passwordInputActivated) {
//         if (passwordValidation()) {
//             document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

//         }
//     }
//     if (repasswordInputActivated) {
//         if (repasswordValidation()) {
//             document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
//         } else {
//             document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

//         }
//     }


//     if (nameValidation() && emailValidation() && phoneValidation() &&
//         ageValidation() && passwordValidation() && repasswordValidation()) {
//         submitBtn.removeAttribute("disabled")
//     } else {
//         submitBtn.setAttribute("disabled", true)
//     }
// }


function nameValidation() {
    return (/^[a-zA-Z\s]+$/.test(document.getElementById("nameInput").value));
}

function emailValidation() {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("emailInput").value));
}

function phoneValidation() {
    return (/^\d{3}[-\s.]?\d{3}[-\s.]?\d{4,6}$/.test(document.getElementById("phoneInput").value));
}

// function ageValidation() {
//     const age = document.getElementById("ageInput").value;
//     return (/^\d{1,2}$/.test(age) && Number(age) < 100);
// }

function ageValidation() {
    return (/^([1-9]|[1-9][0-9])$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{8,}$/.test(document.getElementById("passwordInput").value));
}


function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}