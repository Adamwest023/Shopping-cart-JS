let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");



//keeos the basket updated on the cart page
let basket = JSON.parse(localStorage.getItem("data")) || [];


//function to caluculate total items for the cart
let caculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

caculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {

        });

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