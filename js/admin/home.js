$.ajax({
    url: api+'/authenticate/check/admin',
    type: 'GET',
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
    },
    error: function (e) {
        window.location="http://127.0.0.1:8088/market/home.html";
    },
        
    
})