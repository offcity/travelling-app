angular.module('starter.controllers', [])

.controller('SlideCtrl', function($scope, $state) {
  $scope.startApp = function() {
    $state.go('tab.activities');
  };
})

.controller('ChatsCtrl', function($scope, $rootScope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $rootScope.isDetail = false;
  $scope.$on('$ionicView.beforeEnter', function() {
    $rootScope.isDetail = false;
  });
})

.controller('ChatDetailCtrl', function($scope, $rootScope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $rootScope.isDetail = true;
})

.controller('AppCtrl', function($scope, $ionicPopover) {
  // Create the addItem popover that we will use later
  $ionicPopover.fromTemplateUrl('templates/tool-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.showMenu = function($event) {
    console.log('showMenu Clicked!');
    $scope.popover.show($event);
  };

  $scope.closeMenu = function($event) {
    //alert($event);
    $scope.popover.hide();
  };

})

;

