
function ShowOrser(data)
{
    order_html=``
    if (data['productOrderds'])
    {
        data['productOrderds'].forEach(pd => {
            order_html +=`<div class="row mt-1">
                            <div class="col">${pd['name']}</div>
                            <div class="col"><img src="${api+pd['image']}" alt="" height="50px" width="50px"></div>
                            <div class="col">${pd['num_of_pd']}</div>
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
                        $("#cart").click()
                    },
                        
                    error: function (e1) {
                        alert("Error! Delete order was denied")
                    }  
                });
            




            })

            
        },
            
        error: function (e) {
            alert("please login or add your profile")
        }  
});
    
})





