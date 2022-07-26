
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


