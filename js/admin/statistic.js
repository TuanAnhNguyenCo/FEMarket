
var date = new Date()
$.ajax({
  url: api+'/api/v1/order/statistic/product/top5',
  type: 'GET',
  dataType: 'json',
  headers:{
    "Authorization":`Bearer ${localStorage.getItem("token")}`,
  },
  data:{
      day:date.getDate(),
      month:date.getMonth()+1,
      year:date.getFullYear(),
      status:'day'
  },
  success: function (data) {
        
        var xValues = [];
        var yValues = [];
        data.forEach(element => {
            xValues.push(element['name'])
            yValues.push(element['total'])
        });
        var layout = {title:"Top 5 sản phẩm bán chạy nhất trong ngày"};

        var data = [{labels:xValues, values:yValues, type:"pie"}];

        Plotly.newPlot("top-5-product", data, layout);

  },
  error: function (e) {
      alert("Permission denied")
}})
$.ajax({
  url: api+'/api/v1/order/statistic/product/profit/day',
  type: 'GET',
  dataType: 'json',
  headers:{
    "Authorization":`Bearer ${localStorage.getItem("token")}`,
  },
  data:{
      day:date.getDate(),
      month:date.getMonth()+1,
      year:date.getFullYear(),
  },
  success: function (data) {
        
        var xValues = [];
        var yValues = [];
        data.forEach(element => {
            xValues.push(element['day'])
            yValues.push(element['profit'])
        });
        var data = [{
          x: xValues,
          y: yValues,
          mode: "lines",
          type: "scatter"
        }];
        
      
        var layout = {
          xaxis: {range: [1, 31], title: "Ngày"},
          yaxis: {range: [0,parseInt(Math.max(yValues)*1.3)], title: "Lợi nhuận"},
          title: "Lợi nhuận theo ngày"
        };

        Plotly.newPlot("profit-by-day", data, layout);

  },
  error: function (e) {
      alert("Permission denied")
}})


function showProfitAndTop5SellingProducts()
{
  dateTime = `<h3 style="text-align:center ;">Tính lợi nhuận</h3>`
  dateTime += `<div style="text-align:center ;" class="mt-3">
                <form class='get-profit-form'>
                  <label for="date-time">Thời gian:</label>
                  <input type="date" id="date-time" name="date_time" required>
                  <button type="submit" id="by-day" class="btn btn-outline-primary" >Tính theo ngày</button>
                  <button type="submit" id="by-month" class="btn btn-outline-primary" >Tính theo tháng</button>
                  <button type="submit" id="by-year" class="btn btn-outline-primary" >Tính theo năm</button>
                </form>
                <h4 class = 'profit-results'></h4>
                <button id="selling-product-button" class="btn btn-outline-primary" >Top 5 sản phẩm bán chạy</button>
                <button id="top-user-button" class="btn btn-outline-primary" >Top 5 người mua nhiều nhất</button>
              </div>`

  dateTime += `<div class = 'statistic-body'></div>`       
  return dateTime;
}

function SellingProduct(status)
{
  let date = new Date($('#date-time').val());
  $.ajax({
    url: api+'/api/v1/order/statistic/product/top5',
    type: 'GET',
    dataType: 'json',
    headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`,
    },
    data:{
        day:date.getDate(),
        month:date.getMonth()+1,
        year:date.getFullYear(),
        status:status
    },
      success: function (data) {
            // Hiển thị biểu đồ cột theo top 5 selling product
            var xValues = [];
            var yValues = [];
            data.forEach(element => {
                xValues.push(element['name'])
                yValues.push(element['total'])
            });
            var barColors = ["red", "green","blue","orange","brown"];
            $(".statistic-body").html(`<canvas id="selling-product-top-user" style="width:100%;"></canvas>`)
            new Chart("selling-product-top-user", {
              type: "bar",
              data: {
                labels: xValues,
                datasets: [{
                  backgroundColor: barColors,
                  data: yValues
                }]
              },
              options: {
                legend: {display: false},
                scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]},
                title: {
                  display: true,
                  text: `Top 5 selling product by ${status}`
                }
              }
            });
    
      }})
}



function Top5Customer(status)
{
  
  let date = new Date($('#date-time').val());
  $.ajax({
    url: api+'/api/v1/order/statistic/customer/top5',
    type: 'GET',
    dataType: 'json',
    headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`,
    },
    data:{
        day:date.getDate(),
        month:date.getMonth()+1,
        year:date.getFullYear(),
        status:status
    },
      success: function (data) {
            
            // Hiển thị biểu đồ cột theo top 5 selling product
            var xValues = [];
            var yValues = [];
            data.forEach(element => {
                xValues.push(element['fullname'])
                yValues.push(element['total'])
            });
            var barColors = ["red", "green","blue","orange","brown"];
            $(".statistic-body").html(`<canvas id="selling-product-top-user" style="width:100%;"></canvas>`)
            new Chart("selling-product-top-user", {
              type: "bar",
              data: {
                labels: xValues,
                datasets: [{
                  backgroundColor: barColors,
                  data: yValues
                }]
              },
              options: {
                legend: {display: false},
                scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]},
                title: {
                  display: true,
                  text: `Top 5 customer by ${status}`
                }
              }
            });
    
      }})
}

function CountProfitAjax(status)
{
    // Lây date
    let date = new Date($('#date-time').val());
    $.ajax({
        url: api+'/api/v1/order/statistic/product/profit',
        type: 'GET',
        dataType: 'json',
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
        },
        data:{
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear(),
            status:status
        },
        success: function (data) {
        
          
          // Có data thì sẽ hiển thị lợi  nhuận
          $(".profit-results").html(`Lợi nhuận: ${data}`)
          // Hiển thị button sau khi chưa ấn vào tính theo ngày tháng năm
          $("#selling-product-button").css('display','inline-block')
          $("#top-user-button").css('display','inline-block')
          

        },
        error: function (e) {
            alert("Permission denied or Please check your time")
      }})
}


$("#get-profit").click(function(){
  
      $(".body_content").html(showProfitAndTop5SellingProducts())
      // Ẩn button khi chưa ấn vào tính theo ngày tháng năm
      $("#selling-product-button").css('display','none')
      $("#top-user-button").css('display','none')
      // Khi ấn vào tính theo ngày
      var status = 'day'
      $('#by-day').click(function(e){
        e.preventDefault()
        $("#selling-product-button").html(`Top 5 sản phẩm bán chạy theo ngày`)
        $("#top-user-button").html(`Top 5 người mua nhiều nhất theo ngày`)
        CountProfitAjax('day')
        status = 'day'
        
        
      })
      // Khi ấn vào tính theo tháng
      $('#by-month').click(function(e){
        
        e.preventDefault()
        $("#selling-product-button").html(`Top 5 sản phẩm bán chạy theo tháng`)
        $("#top-user-button").html(`Top 5 người mua nhiều nhất theo tháng`)
        CountProfitAjax('month')
        status = 'month'
      })
      //Khi ấn vào tính theo năm
      $('#by-year').click(function(e){
      
        e.preventDefault()
        $("#selling-product-button").html(`Top 5 sản phẩm bán chạy theo năm`)
        $("#top-user-button").html(`Top 5 người mua nhiều nhất theo năm`)
        CountProfitAjax('year')
        status = 'year'
      })
      // Hiển thị top 5 sản phẩm bán chạy nhất
      $("#selling-product-button").click(function(){
        SellingProduct(status)
      })
     
      // Hiển thị top 5 người mua nhiều nhất
      $("#top-user-button").click(function(){
        Top5Customer(status)
    })

})




