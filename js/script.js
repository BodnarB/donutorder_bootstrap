const addBtn = document.querySelectorAll('.js-add')
const cartHTML = document.querySelector('.js-cart')
const totalPriceHTML = document.querySelector('.js-total')
const cartItemsNumber = document.querySelector('.js-cart-items')
const shoppingCartTitle = document.querySelector('.js-shopping-cart-title')
let totalCart = []
let sum

addBtn.forEach(n => n.addEventListener('click', () => {
    let prodName = n.parentElement.parentElement.children[0].innerHTML
    let prodPrice = parseInt(n.parentElement.parentElement.children[2].innerHTML)
    let prodImg = n.parentElement.parentElement.previousElementSibling
    if (totalCart.filter(e => e.productName === prodName).length > 0) {
        let index = totalCart.findIndex(x => x.productName === prodName)
        totalCart[index].productQty += 1
        totalCart[index].productTotalPrice = totalCart[index].productQty * prodPrice
    }
    else {
        totalCart.push({
            ['productName']: prodName,
            ['productQty']: 1,
            ['productPrice']: prodPrice,
            ['productTotalPrice']: prodPrice,
            ['productImg']: prodImg.src
        })
    }
    render()
    changeQty()
    removeItem()
    sumCart()
}))

// TODO: add ID for products, and check cart by prodId, not prodName (To prevent errors, in case products has same name.)

function sumCart() {
    sum = totalCart.reduce((prev, next) => prev + next.productTotalPrice, 0)
    totalPriceHTML.innerText = `Total: ${sum}€`
    let totalQty = 0
    for (let i = 0; i < totalCart.length; i++) {
        totalQty += totalCart[i].productQty
    }
    if (totalQty <= 1) {
        shoppingCartTitle.innerText = `Shopping cart (${totalQty} item)`
    }
    else {
        shoppingCartTitle.innerText = `Shopping cart (${totalQty} items)`
    }
    cartItemsNumber.innerHTML = totalQty
}

function render() {
    let text = ``
    sumCart()
    totalCart.forEach(prod => text += `    
    <div class="product"><div><p class="product-title">${prod.productName}</p>
    <div><p class="quantity">Qty:</p><input id="${prod.productName}" type="number" class="qty" name="quantity" min="1" max="25" value="${prod.productQty}">
    <p class="product-price fw-bold">${prod.productPrice} €</p></div>
    <i class="bi bi-trash3-fill remove-icon js-remove"></i></div>
    <img class="product-img img-thumbnail" src="${prod.productImg}" alt="">
    </div>`)
    cartHTML.innerHTML = text
}

function removeItem() {
    document.querySelectorAll('.js-remove').forEach(d => d.addEventListener('click', () => {
        let delId = d.parentElement.firstChild.innerHTML
        let index = totalCart.findIndex(x => x.productName === delId)
        totalCart.splice(index, 1)
        d.parentElement.parentElement.remove()
        sumCart()
    }))
}

function changeQty() {
    document.querySelectorAll('.qty').forEach(c => c.addEventListener('click', () => {
        let index = totalCart.findIndex(x => x.productName === c.id)
        totalCart[index].productQty = parseInt(c.value)
        totalCart[index].productTotalPrice = totalCart[index].productQty * totalCart[index].productPrice
        sumCart()
    }))
}