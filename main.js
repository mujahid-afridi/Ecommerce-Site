import { data } from './data.js';
import { productQuantityIncrement } from "./productQuantityContainer.js";

let productList = document.querySelector(".products-list")
let productTemplate = document.querySelector(".product-template").content


data.forEach((product)=>{
    const{id, category, img, name, description, stock, price, alt} = product;

    let template = document.importNode(productTemplate, true)

    template.querySelector("#first-card").id = `card${id}`
    let productCategory = template.querySelector(".tag span")
    let productImage = template.querySelector("#product-img")
    let productName = template.querySelector(".product-name")
    let productDescription = template.querySelector("#product-discription")
    let productPrice = template.querySelector(".discount-price")
    let actualPrice = template.querySelector(".actual-price")
    let productStock = template.querySelector(".stock-quantity")
    let productQuantity = template.querySelector(".quantity-value")

    productCategory.innerText =category
    productImage.src  = img
    productName.innerText = name
    productDescription.innerText = description
    productPrice.innerText = `$${price}`
    actualPrice.innerText = `$${price * 3}`
    productStock.innerText = stock
    productImage.alt = alt
    productQuantity.innerText = 0

    template.querySelector(".quantity").addEventListener("click", (event)=>{
        productQuantityIncrement(event, id, stock, price)
        
    })

    productList.appendChild(template)
})
