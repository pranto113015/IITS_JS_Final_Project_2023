// Your solution goes here
// API -> https://64bbef077b33a35a4446d2cd.mockapi.io/copyshop



let fetchedData = [];

// All Selector 
let searchSection = document.getElementById("searchSection");
let iits_cart_counter = document.getElementById("iits-cart_counter");
let iits_searchBox = document.getElementById("iits-searchBox");
let addToCartBtn = document.querySelectorAll(".addToCartBtn");
let iits_items = document.getElementById("iits-items");
let cart_dec = document.getElementById("cart_dec");
let menu_section = document.getElementById("menu-section");
let searchForm = document.getElementById("searchForm");
let all_toggle = document.getElementById("all_toggle");
let coffee_toggle = document.getElementById("coffee_toggle");
let burger_toggle = document.getElementById("burger_toggle");
let iits_adminBtn = document.getElementById("iits-adminBtn");
let iits_adminSection = document.getElementById("iits-adminSection");
let iits_cancelBtn = document.getElementById("iits-cancelBtn");
let iits_developer = document.getElementById("iits-developer");



// show update conter view
function newcounter() {
  iits_cart_counter.innerText = cartCount;
}





// function of local storage
function Count() {
  let storeCount = localStorage.getItem("cartCount");
  if (storeCount !== null) {
    cartCount = parseInt(storeCount, 10);
    newcounter();
  }
}
Count();//outside function calling






// click evenlisteners 
addToCartBtn.forEach((button) => {
  button.addEventListener("click", addtocardbtn);
});
// Add to cart button click evenlisteners function
function addtocardbtn() {
  cartCount++; // counter increment 
  localStorage.setItem("cartCount", cartCount);
  newcounter();
}



// this is render section function
function render(items) {
  iits_items.innerHTML = "";
  if (items.length === 0) {
    iits_items.innerHTML = '<span class="bg-danger text-white py-2 rounded">Nothing Found. Sorry!</span>';
    return;
  }
  // show the item views design
  items.forEach((item) => {
    let carditem =
      `
      <div class="item col-md-6 col-lg-4 p-3" data-category="${item.type}">
        <div class="card">
          <div class="img-container">
            <img src="${item.url}" alt="${item.name}" />
            <span class="category-pill">${item.type}</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.desc}</p>
            <button class="addToCartBtn btn w-100">Add to cart</button>
          </div>
        </div>
      </div>
      `;
    iits_items.innerHTML += carditem;
  });
  let addToCartBtn = document.querySelectorAll(".addToCartBtn"); // selctor of new item "add to card" property
  addToCartBtn.forEach((button) => {
    button.addEventListener("click", addtocardbtn); //new item "add to card" evenlistener 
  });
}






// cart decrement event listener function
cart_dec.addEventListener("click", function (e) {
  e.preventDefault();
  if (cartCount > 0) {
    cartCount--; // counter decrement 
  }
  localStorage.setItem("cartCount", cartCount);
  newcounter();
});









// Fetch data from the API
iits_items.innerHTML = "Loading...";
let getData = async () => {
  let url = "https://64bbef077b33a35a4446d2cd.mockapi.io/copyshop"; //this is api link
  let option = {
    method: "GET",
  };
  try {
    let response = await fetch(url, option);
    let data = await response.json();
    data.forEach((element) => {
      fetchedData.push(element);
    });
    render(fetchedData);
  }
  catch (err) {
    console.log(err);
  }
};
getData();// function call of api





all_toggle.addEventListener("click", CategoryToggle);//all item lisner
coffee_toggle.addEventListener("click", CategoryToggle);//coffee lisner
burger_toggle.addEventListener("click", CategoryToggle);//burger lisner

// CategoryToggle function 
function CategoryToggle(e) {
  let selectedCategory = e.target.value;
  let fecthdata2 = fetchedData.filter((item) => item.type === selectedCategory);
  let filter = selectedCategory === "all" ? fetchedData : fecthdata2  // item wise filtering
  render(filter);
}




//search form event listener and function
searchForm.addEventListener("submit", function (e) {
  e.preventDefault(); // for by Defalut event none
  let searchValue = iits_searchBox.value.toLowerCase();
  let filter = fetchedData.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );
  render(filter);
  iits_searchBox.value = "";
});






//admin section conditon cheak function
iits_adminBtn.addEventListener("click", function () {
  let addmiName = prompt("Enter your username:");
  let adminPassword = prompt("Enter your password:");
  if (addmiName === "iits" && adminPassword === "23") {
    iits_adminSection.classList.remove("hidden");
    let addNewItemBtn = document.querySelector("#iits-addNewForm button");
    addNewItemBtn.addEventListener("click", function (e) { // admin section from input work function
      e.preventDefault();

      let nInput = document.getElementById("name");
      let pInput = document.getElementById("pic");
      let dInput = document.getElementById("desc");
      let tItemInput = document.getElementById("typeItem");

      if (!nInput.value || !pInput.value || !dInput.value || tItemInput.value === "null") {
        alert("Please select valid type"); // show the alert message
        //by default clear input filed
        nInput.value = "", pInput.value = "", dInput.value = "", tItemInput.value = "null";
        return;
      }

      let length = fetchedData.length; // new item catch the object
      let newObj = {
        id: length + 1,
        name: nInput.value,
        desc: dInput.value,
        url: pInput.value,
        type: tItemInput.value,
      };
      fetchedData.push(newObj); // puch the date newobj
      render(fetchedData);

      //after input clear input filed
      nInput.value = "", pInput.value = "", dInput.value = "", tItemInput.value = "null";

      iits_adminSection.classList.add("hidden"); // hide iits_adminSection
    });
  } else {
    alert("Invalid credentials");
  }
});


// cancel button enenlistner
iits_cancelBtn.addEventListener("click", function () {
  iits_adminSection.classList.add("hidden");
});


iits_developer.textContent = "Pranto Kumar Dept. of BCSE"; // Change the foother message




let btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
  performSearch();
});

function performSearch() {
  iits_searchBox.value.toLowerCase();
  let form_check = document.querySelector(".form-check");
  let radio = document.getElementsByName('categoryToggle');

  if (iits_searchBox) {
    switch (iits_searchBox) {
      case "Espresso":
        form_check.radio.checked = true;
        break;

      case "Americano":
        form_check.radio.checked = true;
        break;

      case "Classic Burger":
        form_check.radio.checked = true;
        break;
      case "Cheeseburger":
        form_check.radio.checked = true;
        break;

        case " Dark Maxicano":
          form_check.coffee_toggle.radio.checked = true;
          break;
       

      default:
        form_check.radio.checked = true;
        break;
    }
  } else {
    form_check.radio.checked = true;
  }
}
























