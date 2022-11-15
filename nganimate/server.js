var app = angular.module("coursesApp", ["ngRoute", "ngAnimate"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/web", {
      templateUrl: "a.html",
      controller: "webCtrl",
    })
    .when("/DM", {
      templateUrl: "a.html",
      controller: "dmCtrl",
    });
});

app.controller("webCtrl", function ($scope, $route) {
  $scope.course = {
    name: "Web Technologies",
    code: "18IT511",
    sem: "5",
    year: "III year",
  };
});

app.controller("dmCtrl", function ($scope, $route) {
  $scope.course = {
    name: "Data Mining",
    code: "18IT530",
    sem: "5",
    year: "III Year",
  };
});
