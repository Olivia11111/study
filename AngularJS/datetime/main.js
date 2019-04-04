(function () {
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {  
    function datetimeToString(datetime)
    {
      var y= datetime.getFullYear();
      var m= datetime.getMonth() + 1;
      var d=datetime.getDate();
      var h= datetime.getHours();
      var min= datetime.getMinutes();
      var s= datetime.getSeconds();
      //把日期2017-1-6 格式化为标准的 2017-01-06
      //判断数字的长度是否是1，如果是1那么前面加上字符0
      if(m.toString().length == 1) m= "0" + m;
      if(d.toString().length == 1) d= "0" + d;
      if(h.toString().length == 1) h= "0" + h;
      if(min.toString().length == 1) min= "0" + min;
      if(s.toString().length == 1) s= "0" + s;
      return y+"-"+m+"-"+d+"T"+h+":"+min+":"+s;
    }  
    var endDate = new Date();
    //返回日期的原始值，也就是自xxx年xx月xx日 到今天的日期相差的毫秒数
    var startDate = new Date(endDate.valueOf() - 24*60*60*1000);
    
    $scope.datetimeStart = {
      value: startDate,
      max: datetimeToString(endDate)
      };
    $scope.datetimeEnd = {
      value: endDate,
      min: datetimeToString(startDate)
    };
    $scope.name = "Oli";
    $scope.OnStartTmChange = function (){
      $scope.datetimeEnd.min = datetimeToString($scope.datetimeStart.value);
    }
    $scope.OnEndTmChange = function (){
      $scope.datetimeStart.max = datetimeToString($scope.datetimeEnd.value);
    }
});
document.getElementById("date1").value = "2015-09-25";
}());