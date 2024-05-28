import { data } from "./data.js"
import { localStorageData } from "./localStorageData.js"

let tosteBar = document.querySelector(".toste-bar")

let dataFromLS = JSON.parse(localStorage.getItem('productDataFromLS')) || []

let carValue = document.querySelector("#cart-value")
carValue.innerText = dataFromLS.length

let cartContainer = document.querySelector(".cart-product-contianer")


let productTemplate = document.querySelector(".cart-product-template").content

let subTotalPrice = document.querySelector("#sub-total")
let textCost = document.querySelector("#tax-cost")
let finalBill = document.querySelector("#final-total")

let sum = 0;

if(dataFromLS.length === 0){
    subTotalPrice.innerText = `$0.0`
    textCost.innerText = `$0.0`
    finalBill.innerText = `$0.0`
}else{
    dataFromLS.forEach((curProData)=>{
        sum += curProData.price
        subTotalPrice.innerText = `$${sum}`
        // console.log(curProData.price)
    })
    
    if(sum < 1500){
        textCost.innerText = `$${Math.floor(sum * 0.05) }`
    }else{
        textCost.innerText = `$${Math.floor(sum * 0.12) }`
    }
    let price = subTotalPrice.innerText.replace('$',"")
    let tex = textCost.innerText.replace('$',"")
    finalBill.innerText = `$${Number(price) + Number(tex)}`
}





dataFromLS.forEach((curPro)=>{
    data.forEach((dataPro)=>{
        if(curPro.id === dataPro.id){

            let product  = document.importNode(productTemplate, true)

            let x = product.querySelector("#product1").setAttribute('id', `${curPro.id}`)
            let category = product.querySelector(".tag span")
            category.innerText = dataPro.category
            let image = product.querySelector("#cart-product-img")
            image.src = dataPro.img
            let name = product.querySelector("#cart-product-name")
            name.innerText = dataPro.name
            let price = product.querySelector("#cart-product-price")
            price.innerText = curPro.price
            let quantity = product.querySelector(".quantity-value")
            quantity.innerText = curPro.quantity

            cartContainer.appendChild(product)

        }
    })
})


let quantityContainer = document.querySelectorAll(".quantity")
quantityContainer.forEach((quan)=>{
    
    quan.addEventListener("click",(event)=>{
        if(event.target.className === "increment-btn"){
            sum=0;
            let curElement = event.target
            let curElementParent = curElement.parentElement
            let curElementParentParent = curElementParent.parentElement

            data.forEach((product)=>{
                    if(Number(curElementParentParent.id) === product.id){
                        let quantityOfProduct = curElementParentParent.querySelector(".quantity-value")
                        let priceOfProduct = curElementParentParent.querySelector("#cart-product-price")
                        if(Number(quantityOfProduct.innerText) < product.stock){
                            quantityOfProduct.innerText =Number(quantityOfProduct.innerText) + 1
                            priceOfProduct.innerText = product.price * Number(quantityOfProduct.innerText)
                        }else if(Number(quantityOfProduct.innerText) >= product.stock){
                            quantityOfProduct.innerText = product.stock
                        }
                        
                        cartDataInLs(curElementParentParent.id,quantityOfProduct.innerText, product.price)//updating the localStorage date with incrementing the quantity of product
                    
                        dataFromLS = JSON.parse(localStorage.getItem('productDataFromLS')) || []
                        dataFromLS.forEach((curProData)=>{
                            sum += curProData.price
                            subTotalPrice.innerText = `$${sum}`
                            if(sum < 1500){
                                textCost.innerText = `$${Math.floor(sum * 0.12) }`
                            }else{
                                textCost.innerText = Math.floor(sum * 0.12) 
                            }
                            let price = subTotalPrice.innerText.replace('$',"")
                            let tex = textCost.innerText.replace('$',"")
                            finalBill.innerText = `$${Number(price) + Number(tex)}`
                         })
                    
                    }
            })
        }
        if(event.target.className === "decrement-btn"){
            sum=0;
            let curElement = event.target
            let curElementParent = curElement.parentElement
            let curElementParentParent = curElementParent.parentElement
            // console.log(curElementParentParent)

            data.forEach((product)=>{
                if(Number(curElementParentParent.id)=== product.id){
                    let quantityOfProduct = curElementParentParent.querySelector(".quantity-value")
                    let priceOfProduct = curElementParentParent.querySelector("#cart-product-price")
                    if(Number(quantityOfProduct.innerText) > 1){
                        quantityOfProduct.innerText = Number(quantityOfProduct.innerText) - 1
                        priceOfProduct.innerText = product.price * Number(quantityOfProduct.innerText)
                    }
                    

                    cartDataInLs(curElementParentParent.id,quantityOfProduct.innerText, product.price)//updating the localStorage date with decrementing the quantity of product 
                
                    dataFromLS = JSON.parse(localStorage.getItem('productDataFromLS')) || []
                    dataFromLS.forEach((curProData)=>{
                        sum += curProData.price
                        subTotalPrice.innerText = `$${sum}`
                        if(sum < 1500){
                            textCost.innerText = `$${Math.floor(sum * 0.12) }`
                        }else{
                            textCost.innerText = Math.floor(sum * 0.12) 
                        }
                        let price = subTotalPrice.innerText.replace('$',"")
                        let tex = textCost.innerText.replace('$',"")
                        finalBill.innerText = `$${Number(price) + Number(tex)}`
                    })
                
                
                }
            })

        }
    })
})

function cartDataInLs(elementID,quantityOfProduct, priceOfProduct){
    let dataLS = localStorageData(event, Number(elementID))

    let existingData = dataLS.find((element)=>{
        return element.id === Number(elementID)
    })

    if(existingData){
        // console.log(existingData)
        existingData.quantity = Number(quantityOfProduct)
        existingData.price = priceOfProduct * Number(quantityOfProduct)
        // console.log(existingData)

        let id = Number(elementID)
        let price =  existingData.price
        let quantity = existingData.quantity
        let updateCart = {id, price, quantity}

        updateCart = dataLS.map((curData)=>{
            return curData.id === Number(elementID) ? updateCart : curData
        })

        localStorage.setItem('productDataFromLS', JSON.stringify(updateCart))
    }
}


let removeProductFromCart = document.querySelectorAll(".cart-product-remove-btn")
// dataFromLS = JSON.parse(localStorage.getItem('productDataFromLS')) || []
console.log(dataFromLS)
removeProductFromCart.forEach((curPro)=>{
    
    curPro.addEventListener('click', (event)=>{
        sum=0;
        let parent = curPro.parentElement

        dataFromLS = dataFromLS.filter((object)=>{
           return object.id !== Number(parent.id) 
        })
        console.log(dataFromLS)
        parent.style.display = 'none'
        localStorage.setItem("productDataFromLS", JSON.stringify(dataFromLS))
        document.querySelector("#cart-value").innerText = dataFromLS.length//Total product in cart

        dataFromLS = JSON.parse(localStorage.getItem('productDataFromLS')) || []
        if(dataFromLS.length === 0){
            subTotalPrice.innerText = `$0.0`
            textCost.innerText = `$0.0`
            finalBill.innerText = `$0.0`
        }else{
            dataFromLS.forEach((curProData)=>{
                console.log("hello",curProData)
                if(curProData){
                    if(curProData.price){
                        sum += curProData.price
                        subTotalPrice.innerText = `$${sum}`
                        if(sum < 1500){
                            textCost.innerText = `$${Math.floor(sum * 0.12) }`
                        }else{
                            textCost.innerText = Math.floor(sum * 0.12) 
                        }
                        let price = subTotalPrice.innerText.replace('$',"")
                        let tex = textCost.innerText.replace('$',"")
                        finalBill.innerText = `$${Number(price) + Number(tex)}`
                        console.log(sum)
                    }
                }
            })
        }

        tosteBar.innerText = `Product with ID ${parent.id} has been deleted.`
        tosteBar.classList.add('toste-bar-transition-add')
        tosteBar.classList.remove('toste-bar-transition-remove')
        function x(){
            tosteBar.classList.add('toste-bar-transition-remove')
            tosteBar.classList.remove('toste-bar-transition-add')
        }
        setTimeout(x, 1000)

    })
})