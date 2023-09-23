let listCartItems = [];

console.log(listCartItems);

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
addCartToHTML();


function addCartToHTML(){

    let listCartItemsHTML = document.querySelector('.returnCart .list');
    listCartItemsHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0 ;
    let totalPrice = 0;

        if(listCartItems){

            listCartItems.forEach(product =>{

                if(product){

                    let newCart = document.createElement('div')
                    newCart.classList.add('item');
                    newCart.innerHTML=
                    `<img src="${product.image}" alt="">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price"> $${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">${product.quantity * product.price}</div>
                    `

                    listCartItemsHTML.appendChild(newCart);
                    totalQuantity = totalQuantity + product.quantity;
                    totalPrice = totalPrice + (product.quantity * product.price);
                }
 

            })

            totalPriceHTML.innerText = "$" + totalPrice ;
            totalQuantityHTML.innerText = totalQuantity ;

        }


}