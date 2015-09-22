angular.module('starter.account-controllers', [])

.controller('AccountCtrl', function($scope, $rootScope, $ionicModal, $ionicPopup, $timeout, $ionicPopup, UserService) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.resetpwdData = {};
  $scope.isLogin = UserService.status();
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/resetpwd.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.resetPwdModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  $scope.logout = function() {
    var logoutPopup = $ionicPopup.confirm({
      title: '登出',
      template: '确认注销吗？'
    });
    logoutPopup.then(function(res) {
      if(res) {
        UserService.logout();
        $scope.isLogin = UserService.status();
      }
    });
  };

  $scope.register = function() {
    $scope.loginModal.hide();
    $scope.registerModal.show();
  };

  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  $scope.getCaptcha = function() {
    var user = new AV.User();
    user.set("username", $scope.registerData.username);
    user.set("password", $scope.registerData.password);
    user.setMobilePhoneNumber($scope.registerData.username);
    user.set("phone", $scope.registerData.username);

    user.signUp(null, {
      success: function(user) {
        $ionicPopup.alert({
          title: '获取验证码',
          content: '验证码发送成功'
        });
      },
      error: function(user, error) {
        // 失败了
        alert("Error: " + error.code + " " + error.message);
        if(error.code == -1){
        //alert("Error: " + error.code + " " + error.message);
          $ionicPopup.alert({
            title: '获取验证码错误',
            content: '请输入手机号和密码'
          });
        }else if(error.code == 214){
          $ionicPopup.alert({
            title: '获取验证码错误',
            content: '手机号已经被注册'
          });
        }
      }
    });
  }

  $scope.doRegister = function() {
    var user = new AV.User.current();
    AV.User.verifyMobilePhone($scope.registerData.captcha).then(function(){
      // 注册成功，可以使用了.
        $ionicPopup.alert({
          title: '注册信息',
          content: '注册成功，登录系统！'
        });
        UserService.login();
        $scope.isLogin = UserService.status();
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeRegister();
        }, 300);
    }, function(err){
      // 失败了
      alert("Error: " + error.code + " " + error.message);
    });
  };

  $scope.resetpwd = function() {
    $scope.loginModal.hide();
    $scope.resetPwdModal.show();
  };

  $scope.closeResetPwd = function() {
    $scope.resetPwdModal.hide();
  };

  $scope.getSmsCode = function() {
    AV.User.requestPasswordResetBySmsCode($scope.resetpwdData.username, {
      success: function() {
        // Password reset request was sent successfully
        $ionicPopup.alert({
          title: '获取验证码',
          content: '验证码发送成功'
        });
      },
      error: function(error) {
        // Show the error message somewhere
        //alert("Error: " + error.code + " " + error.message);
        alert("Error: " + error.code + " " + error.message);
        if(error.code == 212 || error.code == 213){
          $ionicPopup.alert({
            title: '获取验证码错误',
            content: '请输入正确的手机号'
          });
        }else if(error.code == 1){
          $ionicPopup.alert({
            title: '获取验证码错误',
            content: '相同手机号获取次数太多，请稍后再试'
          });
        }
      }
    });
  };

  $scope.doResetPwd = function() {
    AV.User.resetPasswordBySmsCode($scope.resetpwdData.captcha, $scope.resetpwdData.password, {
      success: function() {
        //
        $ionicPopup.alert({
            title: '重置密码',
            content: '重置成功！'
          });
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    AV.User.logIn($scope.loginData.username, $scope.loginData.password, {
      success: function(user) {
        // 成功了，现在可以做其他事情了.
        console.log('Doing login', $scope.loginData);
        UserService.login();
        $scope.isLogin = UserService.status();
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 300);
      },
      error: function(user, error) {
        // 失败了.
        alert("Error: " + error.code + " " + error.message);
        $ionicPopup.alert({
          title: '登录失败',
          content: '用户名或密码错误！'
        });
      }
    });
  };
  $rootScope.isDetail = false;
  $scope.$on('$ionicView.beforeEnter', function() {
    $rootScope.isDetail = false;
  });

})
;

