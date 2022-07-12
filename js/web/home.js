var api = "http://localhost:8080";

// show data in home

function ShowProduct(products)
{
    let product = ""
                products.forEach(pd => {
                    if (pd['sale']==0)
                        product  += `<div class="card product_card" style="width: 18rem;">
                                            <img class="card-img-top" src="${api+pd['image'].split(" ")[0]}" alt="Card image cap">
                                            <div class="card-body">
                                            <h5 class="card-title">${pd['name']}</h5>
                                            <p>Prices: ${pd['prices']} VND</p>
                                            <p class="card-text">Number of products: ${pd['num_Of_products']} ${pd['dvt']} </p>
                                            <a href="#" class="btn btn-primary">Xem chi tiết</a>
                                            </div>
                                    </div>`
                    else
                        product  += `<div class="card product_card" style="width: 18rem;">
                                            <img class="card-img-top" src="${api+pd['image'].split(" ")[0]}" alt="Card image cap">
                                            <div class="card-body">
                                            <h5 class="card-title">${pd['name']}</h5>
                                            <p>Prices: <del>${pd['prices']}</del> ${parseInt(pd['prices']*(100-pd['sale'])/100)}  VND</p>
                                            <p class="card-text">Number of products: ${pd['num_Of_products']} ${pd['dvt']} </p>
                                            <a href="#" class="btn btn-primary">Xem chi tiết</a>
                                            </div>
                                    </div>`

            });
    return product
}

$(document).ready(function() {
        $.ajax({
          url: api+'/api/v1/home',
          type: 'GET',
          dataType: 'json',
          success: function (data) {
            let categoryList = `<div class="category_checkbox">
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
            console.log(data)
            
            let product = ShowProduct(data['products'])
            $(".product").html(product)

            // Lấy id của danh mục nếu click vào
            $(document).ready(function() {
                $('.category_checkbox .selectCategory').change(function() {
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
            }); 
        },

        error: function (e) {
            alert("Error get home page")
        }})
  });





