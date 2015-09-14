angular.module('starter.activity-controllers', [])

.controller('ActivitiesCtrl', function($scope, $rootScope, $timeout, Activities) {
  $scope.activities = Activities.all();
  $scope.doRefresh = function() {
    $scope.$broadcast("scroll.refreshComplete");
  };

  $scope.doLoadMore = function() {
    $timeout(function() {
      var newItem = Activities.load();
      $scope.activities.push(newItem);
      $scope.$broadcast("scroll.infiniteScrollComplete");
    }, 500);
  };
  $rootScope.isDetail = false;
  $scope.$on('$ionicView.beforeEnter', function() {
    $rootScope.isDetail = false;
  });
})

.controller('ActivityDetailCtrl', function($scope, $rootScope, $stateParams, Activities) {
  $scope.activity = Activities.get($stateParams.activityId);
  $rootScope.isDetail = true;
})


.controller('ActivityCtrl', function($scope) {
})


.controller('ActivityAddCtrl', function($scope, $ionicPopup, $ionicActionSheet) {
  $scope.showPopup = function() {
    $ionicPopup.alert({
      title: 'Popup',
      content: 'This is ionic popup alert!'
    });
  };

  $scope.showActionSheet = function() {
    $ionicActionSheet.show({
      titleText: 'Ionic ActionSheet',
      buttons: [
      {
        text: 'Facebook'

      },{
        text: 'Twitter'
      }
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED',index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };
})
;

