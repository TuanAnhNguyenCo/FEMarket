var api = "http://localhost:8080";

// show data in home

function ShowProduct(products)
{
    let product = ""
                products.forEach(pd => {
                    if (pd['sale']==0)
                        product  += `<div class="card product_card" style="width: 18rem">
                                            <img class="card-img-top" src="${api+pd['image'].split(" ")[0]}" alt="Card image cap">
                                            <div class="card-body">
                                            <h5 class="card-title" >${pd['name']}</h5>
                                            <p>Prices: ${pd['prices']} VND</p>
                                            <p class="card-text">Number of products: ${pd['num_Of_products']} ${pd['dvt']} </p>
                                            <p><button class="btn btn-primary product-detail">Xem chi tiết</button></p>
                                            <p><button class="btn btn-primary add-product-butt" value=${pd['id']} >Thêm vào giỏ hàng</button></p>
                                            </div>
                                    </div>`
                    else
                        product  += `<div class="card product_card" style="width: 18rem;">
                                            <img class="card-img-top" src="${api+pd['image'].split(" ")[0]}" alt="Card image cap">
                                            <div class="card-body">
                                            <h5 class="card-title">${pd['name']}</h5>
                                            <p>Prices: <del>${pd['prices']}</del> ${parseInt(pd['prices']*(100-pd['sale'])/100)}  VND</p>
                                            <p class="card-text">Number of products: ${pd['num_Of_products']} ${pd['dvt']} </p>
                                            <p><button class="btn btn-primary product-detail">Xem chi tiết</button></p>
                                            <p><button class="btn btn-primary add-product-butt" value=${pd['id']} >Thêm vào giỏ hàng</button></p>
                                            </div>
                                    </div>`

            });
    return product
}


$.ajax({
        url: api+'/api/v1/home',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            
                let categoryList = `    <h3 id="category_title">Danh mục sản phẩm</h3>
                                        <div class="category_checkbox">
                                        <span>Tất cả sản phẩm</span>
                                        <input type="radio" name = "category" class='selectCategory' value = '0' checked>
                                    </div>`
                data['categoryList'].forEach(category => {
                    categoryList+=`<div class="category_checkbox">
                                        <span>${category['name']}</span>
                                        <input type="radio" name = "category" class='selectCategory' value = '${category['id']}'>
                                </div>`
                });
                $(".category").html(categoryList);

                
                let product = ShowProduct(data['products'])
                $(".product").html(product)

                // Lấy id của danh mục nếu click vào
                
                $('.category_checkbox .selectCategory').click(function() {
                        // Lấy giá trị của thẻ đc check
                        $.ajax({
                            url: api+'/api/v1/product/category/get',
                            type: 'GET',
                            dataType: 'json',
                            data : {
                                "Category_id":this.value
                            },
                            success: function (data) {
                                let product = ShowProduct(data)
                                $(".product").html(product)
        
                            },
                            error: function (e) {
                                alert("Error get product by category_id")
                            },
                        }); 
                });
                
              
                
                $('.add-product-butt').click(function(){
                    $.ajax({
                        url: api+'/api/v1/order/add/product',
                        type: 'POST',
                        data:{
                            product_id:this.value
                        },
                        headers:{
                            "Authorization":`Bearer ${localStorage.getItem("token")}`,
                        },
                        success: function (data1) {
                            alert("Success")
                        },
                            
                        error: function (e1) {
                            alert("Error please check number of products")
                        }  
                    })});
        },

        error: function (e) {
            alert("Error get home page")
}})
  






