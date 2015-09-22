angular.module('starter.memo-controllers', [])

.controller('MemosCtrl', function($scope, $rootScope, Memos) {
  $scope.memos = Memos.all();
  $rootScope.isDetail = false;
  $scope.$on('$ionicView.beforeEnter', function() {
    $rootScope.isDetail = false;
  });
})

.controller('MemoDetailCtrl', function($scope, $rootScope, $stateParams, Memos) {
  $scope.memo = Memos.get($stateParams.memoId);
  $rootScope.isDetail = true;
})
;

