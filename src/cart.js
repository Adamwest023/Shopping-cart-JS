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
                    <div class="title-price-x"></div>

                    <div class="cart-buttons"></div>
                
                    <h3></h3>
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