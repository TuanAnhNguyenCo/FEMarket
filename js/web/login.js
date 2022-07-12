var api = "http://localhost:8080";


$(document).ready(function() {
  $("#login_form").submit(function(e){
      e.preventDefault(e);
      
      $.ajax({
        url: api+'/authenticate',
        type: 'POST',
        dataType: 'json',
        data: {
            username: $("#username").val(),
            password: $("#password").val()
        },
        success: function (data) {
          window.localStorage.setItem('token', data['jwt'])
          window.location.replace("http://127.0.0.1:8088/web/home.html");
      },
      error: function (e) {
         alert("Error")
         

      }})
      
  
  });
});

