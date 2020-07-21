
const database = firebase.firestore();
const auth = firebase.auth();
function addProduct(product){
    let docID = product.id;
    product = product.data();

    let title = product.title;
    let description = product.description;
    let imgPath = product.imgPath;
    // let price = product.price;
    // let availability =  product.availability;
 
    let baseDiv = $(`<div class="product" id= ${docID}></div>`);
    let imgDiv  = $('<div class="product-img"></div>').append('<a href="#"><img src="' + imgPath + '" alt="' + title + '"></a>');
    let headerDiv = $('<div class="img-heading"><span>'+title +'</span></div>');
    let descriptionDiv = $('<div class="product-desc"><span></span> </div>').text(description);
    let otherDiv = $('<div class="more-details"><a href="#">Know More</a></div><a href="#" class="add-product">    ADD TO CART </a>')
    
    if(product.type =='eggs'){
        var container = $('#eggContainer');
    }
    else{
        var container = $('#meatContainer');
    };

    container.append(baseDiv.append( imgDiv, headerDiv, descriptionDiv, otherDiv));
    console.log(title, description);
}

function addProducts(){
    database.collection("products").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addProduct(doc);
            console.log(doc.id, " => ", doc.data());
        });
    });
    
}

$(".add-product").on("click",function(){
    var available = true;
    const product = database.collection("products").doc("kadakEggs").get().then(doc => {
        available = doc.data().availability;
    });
    console.log("hello");
    const addToCart = firebase.functions().httpsCallable("addToCart");
    addToCart({ availability: available }).then((result) => {
        console.log(result.data);
    })
    .catch(err => {
        console.log(err);
    });
});  

$(document).ready(function(){
    console.log('started');
    var url = 'https://us-central1-kadakadda-testing.cloudfunctions.net/getProducts';

    addProducts();
    $.ajax(url, {
        crossDomain: true, 
        success: function(products){
            products.forEach(addProduct);
        }, 
        crossDomain:true, 
        headers: {
            'Access-Control-Allow-Origin':  '*', 
            'Access-Control-Allow-Methods' :[ 'PUT', 'GET']
        }
    })
})


