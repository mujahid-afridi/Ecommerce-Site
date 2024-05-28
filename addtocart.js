import {localStorageData} from './localStorageData.js'
localStorageData()
export function addtocart(event, id){

    let arrLocalStorageProduct = localStorageData()

    let cardCur = document.querySelector(`#card${id}`)
    // console.log(cardCur)
    let quantity = cardCur.querySelector('.quantity-value').innerText
    let price = cardCur.querySelector('.discount-price').innerText

    price = price.replace('$', "")
    price = Number(price)
    quantity = Number(quantity)

    let existingPro = arrLocalStorageProduct.find((curProduct)=>{
        return curProduct.id === id
    })
    if(existingPro){

        existingPro.quantity = quantity
        price = price * quantity
        let updateCart = {id, price, quantity}

        updateCart =  arrLocalStorageProduct.map((curPro)=>{
            return (curPro.id === id) ? updateCart : curPro
        })

        localStorage.setItem('productDataFromLS', JSON.stringify(updateCart))

        document.querySelector("#cart-value").innerText = arrLocalStorageProduct.length
    }
    
    if(existingPro){
        // alert("product is same")
        return false
    }

    price = price * quantity

    arrLocalStorageProduct.push({id, quantity, price})

    localStorage.setItem('productDataFromLS', JSON.stringify(arrLocalStorageProduct))

    document.querySelector("#cart-value").innerText = arrLocalStorageProduct.length

    
}