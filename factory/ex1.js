(function () {
  "use strict";

  angular
    .module("myApp", [])
    .controller("showCtrl", showCtrl)
    .factory("showFact", showFact);

  showCtrl.$inject = ["showFact"];
  function showCtrl(showFact) {
    var list1 = this;

    var showFactor = showFact();
    list1.items = showFactor.getItems();
  }

  function shopser() {
    var service = this;
    var items = [{ name: "dhanvan" }, { name: "ram" }];

    service.getItems = function () {
      return items;
    };
  }

  function showFact() {
    var factory = function () {
      return new shopser();
    };
    return factory;
  }
})();
