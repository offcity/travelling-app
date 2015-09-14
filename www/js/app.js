// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.activity-controllers', 'starter.account-controllers', 'starter.memo-controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    //leancloud
    AV.initialize('vGdoWipkgLukG49FCz6beS1D', '5LubapRJJIphAkmklcQw8zx2');
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('slide', {
      url: '/',
      templateUrl: 'templates/slide.html',
      controller: 'SlideCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.activities', {
    url: '/activities',
    views: {
      'tab-activities': {
        templateUrl: 'templates/tab-activities.html',
        controller: 'ActivitiesCtrl'
      }
    }
  })
  .state('tab.activities-detail', {
      url: '/activities/:activityId',
      views: {
        'tab-activities': {
          templateUrl: 'templates/activity-detail.html',
          controller: 'ActivityDetailCtrl'
        }
      }
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.memos', {
    url: '/memos',
    views: {
      'tab-memos': {
        templateUrl: 'templates/tab-memos.html',
        controller: 'MemosCtrl'
      }
    }
  })
  .state('tab.memo-detail', {
      url: '/memos/:memoId',
      views: {
        'tab-memos': {
          templateUrl: 'templates/memo-detail.html',
          controller: 'MemoDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('activity', {
      url: '/activity',
      abstract: true,
      templateUrl: 'templates/activity.html',
      controller: 'ActivityCtrl'
    })

  .state('activity.add', {
      url: '/add',
      views: {
        'add-activity': {
          templateUrl: 'templates/activity-add.html',
          controller: 'ActivityAddCtrl'
        }
      }
    })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
