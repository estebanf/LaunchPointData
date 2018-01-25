(function () {
  // angular.module("LaunchpointData", ['lbServices','datatables'])
  angular.module("LaunchpointData", [])
    // .service('introService', introService)
    // .controller('LpCasesController', ['Launchpointcase','DTOptionsBuilder', 'DTColumnBuilder','$scope', function (Launchpointcase,DTOptionsBuilder, DTColumnBuilder,$scope) {
    .controller('LpCasesController', ['$scope', function ($scope) {
      // var vm = this;
      // vm.search = {};
      // vm.find = function(){
      //   console.log(vm.search);
      // }
      // Launchpointcase.find({active:true},function(data){
      //   vm.lpcases = data;
      // })
      $scope.search = {
        caseid:''
      };
      console.log($scope)
      $scope.find = function(){
        console.log($scope)
        console.log($scope.search.caseid);
      }
  }]);
})();
