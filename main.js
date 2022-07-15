let shop = document.getElementById('shop');
let shopItemsData = [

    {
        id: "casualShirt",
        name: "Casual Shirt",
        price: 45,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing",
        img: "images/img-1.jpg "
    },
    {
        id: "buisShirt",
        name: "Office Shirt",
        price: 100,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing",
        img: "images/img-2.jpg "
    },
    {
        id: "teeShirt",
        name: "T Shirt",
        price: 25,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing",
        img: "images/img-3.jpg "
    },
    {
        id: "mensSuit",
        name: "Men's Suit",
        price: 300,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing",
        img: "images/img-4.jpg "
    }
]

//if there is data in our local storage the basket will reflect that, if it is not it will be an empty array
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x
        //search function is to retrieve the objects if they are  already in the array 
        let search = basket.find((x) => x.id === id) || [];
        return ` 
        <div  id="product-id-${id} "class="item">
                <img width="220" src=${img}alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}"class="quantity">
                             ${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join(""));
}

generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    caculation();
};

//function to caluculate total items for the cart
let caculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

caculation();
