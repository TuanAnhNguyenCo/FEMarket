
function ShowOrser(data)
{
    order_html=``
    if (data['productOrderds'])
    {
        let i = 0
        data['productOrderds'].forEach(pd => {
            order_html +=`<div class="row mt-1">
                            <div class="col titel-product" >${pd['name']}</div>
                            <div class="col"><img src="${api+pd['image']}" alt="" height="50px" width="50px"></div>
                            <div class="input-group mb-3 col">
                                <input type="number" class="form-control num-of-pd" value=${pd['num_of_pd']} required>
                                <div class="input-group-append">
                                    <button class="save-product btn btn-success" value = ${[pd['id'],i++]}>Lưu</button>
                                </div>
                            </div>
                            <div class="col">${parseInt(pd['prices']*pd['num_of_pd']*(100-pd['sale'])/100)}</div>
                            <div class="col"><button class="remove-product btn btn-danger" value = ${pd['id']}>X</button></div>
                        </div>`
        });
    }
    return order_html
}



    

$("#cart").click(function()
{
    $.ajax({
        url: api+'/api/v1/order/create',
        type: 'GET',
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
        },
        success: function (data) {
            let order = ShowOrser(data)
            $('#cart-content').css({display:'block'})
            $('#cart-body').html(order)
            $('#total_prices').html(data['total'])
            // Xoá sản phẩm
            $('.remove-product').click(function(){
                $.ajax({
                    url: api+'/api/v1/order/components/delete',
                    type: 'DELETE',
                    data:{
                        order_id:data['order_id'],
                        product_id:this.value
                    },
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    },
                    success: function (data1) {
                        num = parseInt(localStorage.getItem('num'))-1
                        localStorage.setItem('num',num)
                        $("#Num-of-pd-type").html(num)
                        $("#cart").click()
                    },
                        
                    error: function (e1) {
                        alert("Error! Delete order was denied")
                    }  
            })})

            //Update số lượng sản phẩm
            
            $(".save-product").click(function(){
                // arr chứa [id,idx của sản phẩm trên giỏ] 
                arr = this.value.split(',')
                // Lấy số lượng sản phẩm
                num_of_pd = $(".num-of-pd")[arr[1]].value
                
                $.ajax({
                    url: api+'/api/v1/order/update/product',
                    type: 'PUT',
                    data:{
                        product_id:arr[0],
                        num_of_products:num_of_pd
                    },
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    },
                    success: function (data) {
                        $("#cart").click()
                    },
                        
                    error: function (e) {
                        alert("Fail update number of products")
                    }  
                });
            })

            // minimize cart
            $("#minimize-cart").click(function(){
                $('#cart-content').css({display:'none'})
            })
           
            $("#buy-order").click(function(){
                $.ajax({
                    url: api+'/api/v1/order/update',
                    type: 'PUT',
                    data:{
                        payment_status:false,
                        address:$('#address').val()
                    },
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    },
                    success: function (data) {
                        localStorage.removeItem('num')
                        window.location.replace("http://127.0.0.1:8088/market/home.html");
                    },
                        
                    error: function (e) {
                        alert("Fail to order")
                    }  
                });
            })
        },
            
        error: function (e) {
            alert("please login or add your profile")
        }  
});
    
})





