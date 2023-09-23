const iconCart = document.querySelector('.iconCart');
const listCart = document.querySelector('.listCart');
const container = document.querySelector('.container');
const Close = document.querySelector('.close');


const loadMoreButton = document.getElementById('load-more-button');
const searchBar = document.getElementById('search-bar');


/* Cart */

iconCart.addEventListener('click', function(){

    if(listCart.style.right == '-100%'){
        listCart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        listCart.style.right = '-100%';
        container.style.transform = 'translateX(0)'; 
    }
})

Close.addEventListener('click',function(){

    listCart.style.right = '-100%';
    container.style.transform = 'translateX(0)'; 
    
})


/* product list */
let products = null ; 


/* load more products */


fetch('product.json')
.then(response => response.json())
.then(data => {

    products = data ; 
    addDataToHtml();
})

/* show data to Html */
function addDataToHtml(){

    /* remove existing data */
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';


    /*append new data*/
    if(products != null){
    
        const productPerPage = 6;

        for(let i = 0 ; i<productPerPage && i<products.length ; i++){

            const product = products[i];

            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `   <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price"> $ ${product.price} </div>
                <button onclick="addCart(${product.id})"> Add to cart </button>
            `;
            listProductHTML.appendChild(newProduct);
        };
    }
   
}

let currentIndex = 6 ;
const productPerPage = 6;




function loadMoreProducts(){

        if (products !== null) {
          const endIndex = currentIndex + productPerPage;
          const productsToLoad = products.slice(currentIndex, endIndex);
      
          console.log(currentIndex);
         
          const listProductHTML = document.querySelector('.listProduct');
      
         
          productsToLoad.forEach(product => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
              <img src="${product.image}" alt="">
              <h2>${product.name}</h2>
              <div class="price"> $ ${product.price} </div>
              <button onclick="addCart(${product.id})"> Add to cart </button>
            `;
            listProductHTML.appendChild(newProduct);
          });
      
          currentIndex = endIndex;
       
          if (currentIndex > products.length) {
            const loadMoreButton = document.getElementById('load-more-button');
            loadMoreButton.style.display = 'none'; 

          }
        }
      }

loadMoreButton.addEventListener('click', loadMoreProducts);

let listCartItems = [];

function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCartItems='));
    if (cookieValue) {
        listCartItems = JSON.parse(cookieValue.split('=')[1]);
    } else {
        listCartItems = [];
    }
}

checkCart();

function addCart($idProduct) {
    let productsCopy = JSON.parse(JSON.stringify(products));
    if (!listCartItems[$idProduct]) {
        listCartItems[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCartItems[$idProduct].quantity = 1;
    } else {
        listCartItems[$idProduct].quantity++;
    }

   
    document.cookie = "listCartItems=" + JSON.stringify(listCartItems) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}

addCartToHTML();

function addCartToHTML() {
    let listCartItemsHTML = document.querySelector('.itemCart');
    listCartItemsHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if (listCartItems) {
        listCartItems.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartItemsHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            }
        });
    }
    totalHTML.innerText = totalQuantity;
}

function changeQuantity($idProduct, $quantity) {
    switch ($quantity) {
        case '+':
            listCartItems[$idProduct].quantity++;
            break;
        case '-':
            listCartItems[$idProduct].quantity--;
            if (listCartItems[$idProduct].quantity <= 0) {
                delete listCartItems[$idProduct];
            }
            break;
        default:
            break;
    }

    document.cookie = "listCartItems=" + JSON.stringify(listCartItems) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}



searchBar.addEventListener('keyup', (e) => {

    const productSearched = e.target.value.toUpperCase();
    const filteredProduct = products.filter((product) => {
      return (
        product.name.toUpperCase().includes(productSearched) ||
        product.price.toString().toUpperCase().includes(productSearched)
      );
    });

    displaySearchedProduct(filteredProduct);

  });

  
  function displaySearchedProduct(searchedProducts){

    const listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    if(searchedProducts!==null && searchedProducts.length > 0){
    const newProductList = searchedProducts.map((searchedProduct)=>{ 
        return `<div class="item">
        <img src="${searchedProduct.image}" alt="">
        <h2>${searchedProduct.name}</h2>
        <div class="price"> $${searchedProduct.price}</div>
        <button> Add to cart </button>
    </div>
        `;
    }).join('');

    listProductHTML.innerHTML = newProductList;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display ='none';
    }
    else{

        const errorMessage = document.getElementById('error-message');
        loadMoreButton.style.display = 'none';
        errorMessage.style.display = 'flex';
    }
}

































