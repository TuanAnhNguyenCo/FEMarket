var api = "http://localhost:8080";


// kiểm tra nếu là admin sẽ chuyển hương
$.ajax({
    url: api+'/authenticate/check/admin',
    type: 'GET',
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
    },
    success: function (data) {
        window.location="http://127.0.0.1:8088/market/home.html";
    },
        
    
})



$.ajax({
    url: api+'/authenticate/check/login',
    type: 'GET',
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
    },
    success: function (data1) {
        // đăng nhập rồi thì hiển thị myorder , ẩn đăng nhập và login, hiển thị logout
        $('.login-register').css('display','none');
        $('.logout').css('display','block');
        // Show info of order
        $("#Refresh").click()

    },
        
    error: function (e1) {
        //chưa đăng nhập sẽ chuyển hướng người dùng
        window.location="http://127.0.0.1:8088/market/home.html";
        
    }  
})
// Ấn đăng xuất thì sẽ xoá token
$(".logout").click(function(e){
    e.preventDefault()
    localStorage.removeItem("token")
    location.reload();
})


function ShowOrderList(order)
{
    order_list = ``
    if(order)
    {
        order.forEach(ord => {
            let date = new Date(ord['delivery_date']);
            date = date.getHours() +'h'+ date.getMinutes()+' phút '+ 'ngày ' + date.getDate()+'-'+ (date.getMonth()+1)+ '-' +date.getFullYear()
            
            order_list+= `<div class="mt-3 order-history">
                                <div class="row" style="border: 1px solid #000;text-align: center;">
                                <div class="col"><img src="../icon/cart.png" alt="" style="width:70px;height: 70px;"></div>
                                <div class="col">
                                        <div class="row">Địa chỉ: ${ord['address']}</div>
                                        <div class="row">Trạng thái:${ord['orderStatus']} </div>
                                        <div class="row">Thời gian: ${date}</div>
                                        <div class="row">Tổng giá: ${ord['total_price']} VNĐ </div>
                                </div>
                                <div class="col"></div>
                                <div class="col">
                                    <div class="row"> <button class="btn btn-outline-danger cancel-order" value = ${ord['id']}>Huỷ đặt hàng</button></div>
                                    <div class="row"><button class="btn btn-outline-success mt-3 view-detail-order" value = ${ord['id']}>Xem chi tiết</button></div>
                                </div>
                                <div class="col"></div>
                                </div>
                            </div>`
        });
    }
    return order_list;
}


$("#Refresh").click(function(){
    $.ajax({
        url: api+'/api/v1/order/user/all',
        type: 'GET',
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
        },
        success: function (data) { 
            order_list = ShowOrderList(data)
            $('#order-list').html(order_list)
    
            $('.cancel-order').click(function(){
                $.ajax({
                    url: api+'/api/v1/order/delete',
                    type: 'DELETE',
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    },
                    data:{
                        id:this.value
                    },
                    success: function (data) { 
                        // Show info of order
                        $("#Refresh").click()
                    },
                        
                    error: function (e) {
                        alert("Permission Denied")
                    }  
                })
            })
        },
            
        error: function (e) {
            alert("Error get order history")
        }  
    })
})

