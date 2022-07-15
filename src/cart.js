let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");



//keeps the basket updated on the cart page
let basket = JSON.parse(localStorage.getItem("data")) || [];


//function to calculate total items for the cart
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];

                return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt=""/>
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="card-item-price">$ ${search.price}</p>
                        </h4>
                        <i  onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}"class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                
                    <h3>$ ${item * search.price}</h3>
                 </div>
             </div>
            
            `;

            })
            .join(" "));

    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to Home</button>
        </a>
        `;
    }

};

generateCartItems();


//pulled functions to update items from main.js 
let increment = (id) => {
    let selectedItem = id;
    //searches the basket to see if the item already exists
    let search = basket.find((x) => x.id === selectedItem.id)

    //adds items to the basket 
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else { search.item++ };

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));

};

let decrement = (id) => {

    let selectedItem = id;
    //searches the basket to see if the item already exists
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;

    //adds items to the basket 
    if (search.item === 0) {
        return;
    } else { search.item-- };

    update(selectedItem.id);

    //filters through our local storage to check if there is a number in the item or if it needs to be deleted
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};


let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            //destructing the  array
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;

            //add the reduce function to allow the numbers to be counted correctly
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return
}


totalAmount();