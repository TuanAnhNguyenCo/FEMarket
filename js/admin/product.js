var api = "http://localhost:8080";

function FormInsertProduct(Category)
{
    var insert_form = `<div class="container">
                            <form id="insert_product_form" enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="product_name">Name</label>
                                <input type="text" class="form-control" id="product_name" aria-describedby="emailHelp" name="name" placeholder="Enter product name" required>
                            </div>
                            <div class="form-group">
                                <label for="product_Origin">Origin</label>
                                <input type="text" class="form-control" id="product_Origin" name="origin" placeholder="Enter Origin" required>
                            </div>
                            <div class="form-group">
                                <label for="product_Description">Description</label>
                                <input type="text" class="form-control" id="product_Description" name="description" placeholder="Enter Description" required>
                            </div>
                            <div class="form-group">
                                <label for="product_Image">Image</label>
                                <input type="file" class="form-control" id="product_Image" name="image" placeholder="Select image" multiple required>
                            </div>
                            <div class="form-group">
                                <label for="Num_Of_products">Number of products</label>
                                <input type="number" class="form-control" id="Num_Of_products" name="num_Of_products" placeholder="Enter Number of products" required>
                            </div>
                            <div class="form-group">
                                <label for="product_DVT">DVT</label>
                                <input type="text" class="form-control" id="product_DVT" name="dvt" placeholder="Enter DVT(Đơn vị tính)" required>
                            </div>
                            <div class="form-group">
                                <label for="product_sale">Sale</label>
                                <input type="number" class="form-control" id="product_sale" name="sale" placeholder="Enter Sale" required>
                            </div>
                            <div class="form-group">
                                <label for="product_prices">Prices</label>
                                <input type="number" class="form-control" id="product_prices" name="prices" placeholder="Enter Prices" required>
                            </div>
                            <div class="form-group">
                                <label for="category_id">Select Category</label>
                                <select class="custom-select" name = "category_id">
                                
                            `
                       
    Category.forEach(category => {
        insert_form+= `<option value="${category['id']}">${category['name']}</option>`
    });
    insert_form +=` </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    </div>`

    return insert_form
}


//Show insert form

$( "#Add_Product" ).click(function(){
        $.ajax({
            url: api+'/api/v1/category',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                form = FormInsertProduct(data)
                $(".body_content").html(form)
                
                // Insert data
               
                $("#insert_product_form").submit(function(e){
                    e.preventDefault(e);
                    
                    var form = $('#insert_product_form')[0];
                    var data = new FormData(form);
                    
                    $.ajax({
                        url: api+'/api/v1/product/insert',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        headers:{
                            "Authorization":`Bearer ${localStorage.getItem("token")}`,
                        },
                       
                        data:data,
                        
                        
                        success: function (data) {
                          alert(data)
                      },
                      error: function (e) {
                        alert("Permission denied")
                      }})  
                });
          },
          error: function (e) {
              console.log("Permission denied")
          }})
    });





  