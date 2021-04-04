
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
        console.log("product is added first time");

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
             console.log("product quantity increase");
        }else{
            //we have to add product
            let product = { productId: pid, productName: pname, productQuantity:1, productPrice: price};
            pcart.push(product);
            localStorage.setItem("cart",JSON.stringify(pcart));
            console.log("new product is added");
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
        console.log("Bag is empty !");
        $(".cart-items").html("( 0 )");
        $(".cart-body").html("<h4>Bag does not have any items.");
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
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

         `;
            let totalPrice = 0;
            cart.map((item) => {
                    table += `
                    <tr>
                        <td><img src="${item.productName}"/ width="100" height="100"></td>
                        <td>${item.productPrice}</td>
                        <td>${item.productQuantity}</td>
                        <td>${item.productQuantity*item.productPrice}</td>
                        <td><button onclick="deleteItemFromCart(${item.productId})"class="btn btn-danger btn-sm">Remove</button></td>
                    </tr>
                    `
                    totalPrice +=item.productPrice*item.productQuantity;
                })


         table = table+`
            <tr><td colspan='5' class="text-right font-weight-bold">Total Price : ${totalPrice}</td></tr>
         </table>`
         $(".cart-body").html(table);
    }
}
//delete item
function deleteItemFromCart(pid){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = cart.filter((item) => item.productId != pid);
    localStorage.setItem('cart',JSON.stringify(newcart));
    document.location.reload(true);
    updateCart();
}
$(document).ready(function(){
    updateCard();
})
    
