
angular.module("MyApp", [])
  .controller("MyController", function($scope) {
    $scope.myName = 10;
    $scope.age = 20;
    $scope.changeAge = function() {
      $scope.age = 0;
    };
    //$scope.$watch('age',function(value) {
      //alert($scope.age);
    //});
  })
  .directive("myDirective", function() {
    return {
      restrict: "AE",
      scope: {
        myName: '@',
        age: '=',
        changeAge: '&changeMyAge'
      },
      link: function(scope, elem, attrs) {
        scope.message = "Hi,leifeng";
        scope.$watch('age',function(value) {
          alert(scope.age);
        });
      },
      replace: true,
      template: "<div class='my-directive'>" +
        "<h3>下面部分是我们创建的指令生成的</h3>" +
        "我的名字是：<span ng-bind='myName'></span><br/>" +
        "我的年龄是：<span ng-bind='age'></span><br/>" +
        "在这里修改名字：<input type='text' ng-model='myName'><br/>" +
        "<button ng-click='changeAge()'>修改年龄</button><br/>" +
      "消息：<input type='text' ng-model='message'><br/>" +
      "<span>{{message}}</span>" +
        " </div>"
      
    }      
  });
