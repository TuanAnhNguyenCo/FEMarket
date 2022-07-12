function FormInsertCategory()
{
    var insert_form = `<div class="container">
                            <form id="insert_category_form" >
                            <div class="form-group">
                                <label for="category_name">Name</label>
                                <input type="text" class="form-control" id="category_name" aria-describedby="emailHelp" name="name" placeholder="Enter category name" required>
                            </div>
                            <div class="form-group">
                                <label for="category_location">Location</label>
                                <input type="text" class="form-control" id="category_location" name="location" placeholder="Enter location" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                            </div>`
           
    return insert_form
}

$( "#Add_Category" ).click(function(){
    form = FormInsertCategory()
    $(".body_content").html(form)
    
    // Insert data
    
    $("#insert_category_form").submit(function(e){
        e.preventDefault(e);
        
      
        
        $.ajax({
            url: api+'/api/v1/category/insert',
            type: 'POST',
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            
            data:{
                name:$("#category_name").val(),
                location:$("#category_location").val(),
            },
            success: function (data) {
                alert(data)
            },
            error: function (e) {
                alert("Permission Denied")
            }})  
    });
     
});

