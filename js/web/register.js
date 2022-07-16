var api = "http://localhost:8080";

$(".register").submit(function(e){
    e.preventDefault(e);
    
   
    $.ajax({
        url: api+'/api/v1/user/create',
        type: 'POST',
        data:{
            username: $("#username").val(),
            password: $("#password").val(),
            fullname: $("#fullname").val(),
            email: $("#email").val(),
            CCCD: $("#cccd").val(),
            PhoneNumber: $("#phone-number").val()
        },
        success: function (data) {
            window.location.replace("http://127.0.0.1:8088/market/home.html");
        },
            
        error: function (e1) {
            alert("Email or Username exist")
        }  
    })
    
    

});