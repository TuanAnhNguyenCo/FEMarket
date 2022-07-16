var api = "http://localhost:8080";

// show data in home

if (localStorage.getItem('num'))
{
    $("#Num-of-pd-type").html(localStorage.getItem('num'))
    $("#Num-of-pd-type").css('background-color',"red")
}else
{
    localStorage.setItem('num',0)
}


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
function ShowCategory(data)
{
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
            return categoryList
}
function ShowButtonProduct()
{
    // click khi mà chua nhấn vào category
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
                num = parseInt(localStorage.getItem('num'))+1
                localStorage.setItem('num',num)
                $("#Num-of-pd-type").html(num)
                $("#Num-of-pd-type").css('background-color',"red")

            },
                
            error: function (e1) {
                alert("Error please check number of products")
            }  
        })});
}






$.ajax({
        url: api+'/api/v1/home',
        type: 'GET',
        dataType: 'json',
        data:{
            id:0,
        },
        success: function (data) {

                $(".category").html(ShowCategory(data));
                let product = ShowProduct(data['products'])
                $(".product").html(product)

                // Lấy id của danh mục nếu click vào
                
                
                $('.category_checkbox .selectCategory').click(function() {
                        // Lấy giá trị của thẻ đc check
                        $.ajax({
                            url: api+'/api/v1/home',
                            type: 'GET',
                            dataType: 'json',
                            data : {
                                id:this.value
                            },
                            success: function (data) {
                                let product = ShowProduct(data['products'])
                                $(".product").html(product)
                                // Show button add and see detail
                                ShowButtonProduct()
        
                            },
                            error: function (e) {
                                alert("Error get product by category_id")
                            },
                        }); 
                });
                
                ShowButtonProduct()
                
                // Tìm kiếm
                $('.search').submit(function(e){
                    e.preventDefault(e);
                    let name = $('.pd-name').val()
                    let categoryID = 0
                    let len = $('.selectCategory').length
                    for(let i=0;i<len;i++)
                    {
                        if ($('.selectCategory')[i]['checked'])
                            categoryID  = $('.selectCategory')[i]['value']
                    }

                    $.ajax({
                        url: api+'/api/v1/product',
                        type: 'GET',
                        data:{
                            name:name,
                            categoryID:categoryID
                        },
                        headers:{
                            "Authorization":`Bearer ${localStorage.getItem("token")}`,
                        },
                        success: function (data) {
                            console.log(data)
                            let product = ShowProduct(data)
                            $(".product").html(product)
                            ShowButtonProduct()
                        },
                            
                        error: function (e1) {
                            alert("Error please check number of products")
                        }  
                    })
                    
                    
                    

                })
        },

        error: function (e) {
            alert("Error get home page")
}})
  






