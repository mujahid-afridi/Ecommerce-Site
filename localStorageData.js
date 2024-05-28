export function localStorageData(event, id){
    let data = localStorage.getItem('productDataFromLS')
    if(!data){
        return []
    }

    data = JSON.parse(data)

    document.querySelector("#cart-value").innerText = data.length//Total product in cart

    return data
}