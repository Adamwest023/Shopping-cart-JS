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
        id: "mensSuit ",
        name: "Men's Suit",
        price: 300,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing",
        img: "images/img-4.jpg "
    }
]

let basket = [
];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x
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
                            <div id="${id}"class="quantity">0</div>
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
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else { search.item++ }; 

    console.log(basket);
};

let decrement = (id) => {
    let selectedItem = id;
    console.log(selectedItem.id);

    basket.pop();
    console.log(basket);
};

let update = () => { };

