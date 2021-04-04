
function add_to_cart(pid,pname,price)
{
    let cart = localStorage .getItem("cart");
    if(cart == null)
    {
        //no card yet
        let products = [];
        let product = { productId: pid, productName: pname, productQuantity:1, productPrice: price};
        products.push(product);
        localStorage.setItem("cart",JSON.stringify(products));
        // console.log("product is added first time");
        showToast("Item is added to Bag");

    }else{
        //cart is alredy present
        let pcart = JSON.parse(cart);
        let oldproduct = pcart.find((item) => item.productId == pid)
        if(oldproduct)
        {
            //only we to increase the quantity
            oldproduct.productQuantity = oldproduct.productQuantity+1;
            pcart.map((item) => {
                if(item.productId == oldproduct.productId)
                {
                    item.productQuantity = oldproduct.productQuantity;
                }
            })
             localStorage.setItem("cart",JSON.stringify(pcart));
             // console.log("product quantity increase");
             showToast("product quantity increased,Quantity:" + oldproduct.productQuantity);
        }else{
            //we have to add product
            let product = { productId: pid, productName: pname, productQuantity:1, productPrice: price};
            pcart.push(product);
            localStorage.setItem("cart",JSON.stringify(pcart));
            // console.log("new product is added");
            showToast("new product is added");
        }
    }
    updateCard();
}

//update cart
function updateCard(){
    let cartString = localStorage.getItem("cart");
    let cart = JSON.parse(cartString);
    if(cart == null || cart.length == 0)
    {
        // console.log("Bag is empty !");
        $(".cart-items").html("0");
        $(".cart-body").html(`
            <div class="d-flex justify-content-center align-items-center flex-column">
            <img src='images/shopping-bag4.png' class="img-fluid" width="200" height="200">
            <h4>Bag is empty...OOPS</h4>
            </div>`);
        $(".checkout-btn").addClass('disabled');
    }
    else
    {
        //there is something in bag"
        console.log(cart);
         $(".cart-items").html(`(${cart.length})`);
         let table = `
                <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Remove From Bag</th>
                    </tr>
                </thead>

         `;
            let totalPrice = 0;
            cart.map((item) => {
                    table += `
                    <tr>
                        <td><img src="${item.productName}"/ class="img-fluid" width="100" height="100"></td>
                        <td>${item.productPrice}</td>
                        <td>${item.productQuantity}</td>
                        <td>${item.productQuantity*item.productPrice}</td>
                        <td><button onclick="deleteItemFromCart(${item.productId})"class="btn btn-danger btn-sm">Remove</button></td>
                    </tr>
                    `
                    totalPrice += item.productPrice*item.productQuantity;
                })


         table = table+`
            <tr><td colspan='5' class="text-right font-weight-bold tp">Total Price : ${totalPrice}</td></tr>
         </table>`

         $(".cart-body").html(table);
    }

}
//delete item
function deleteItemFromCart(pid){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = cart.filter((item) => item.productId != pid);
    localStorage.setItem('cart',JSON.stringify(newcart)); 
     showToast("Item is removed form Bag");
     setTimeout(()=>
     {
        document.location.reload(true);
     },800) 
    updateCart();
}
$(document).ready(function(){
    updateCard();
})
    
function showToast(content){
    $('#toast').addClass('display');
    $('#toast').addClass('toast-msg');
    $('.toast-msg').html(content);
    setTimeout(() => {
        $('#toast').removeClass('display');
    },1000)
}