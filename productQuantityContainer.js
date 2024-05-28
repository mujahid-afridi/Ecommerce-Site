import { addtocart } from "./addtocart.js"
export function productQuantityIncrement(event, id, stock, price){

    let curCard = document.querySelector(`#card${id}`)
    let quantityElement = curCard.querySelector(".quantity-value")
    let quantity = parseInt(quantityElement.getAttribute('data-quantity')) || 0

    if((event.target.className === "increment-btn")){
        if(quantity < stock){
            quantity +=1
        }else if(quantity === stock){
            quantity = stock
        }
    }

    if((event.target.className === "decrement-btn")){
        if(quantity > 1){
            quantity -=1
        }
    }
 
    quantityElement.innerText = quantity
    quantityElement.setAttribute('data-quantity' , quantity)


    curCard.querySelector('.add-to-cart-btn').addEventListener('click', (event)=>{
        addtocart(event, id)

        let tosteBar = document.querySelector(".toste-bar")
        tosteBar.innerText = `Product with ID ${id} has been added`
        tosteBar.classList.add('toste-bar-transition-add')
        tosteBar.classList.remove('toste-bar-transition-remove')
        function removeTostBar(){
            tosteBar.classList.remove('toste-bar-transition-add')
            tosteBar.classList.add('toste-bar-transition-remove')
        }

        setTimeout(removeTostBar, 1000)

    })

    return quantity
}
