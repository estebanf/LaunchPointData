(function () {
  angular.module("LaunchpointData", ['lbServices','datatables'])
    // .service('introService', introService)
    .controller('LpCasesController', ['Launchpointcase','DTOptionsBuilder', 'DTColumnBuilder', function (Launchpointcase,DTOptionsBuilder, DTColumnBuilder) {
      var vm = this;
      Launchpointcase.find({active:true},function(data){
        vm.lpcases = data;
      })
  }]);
})();
