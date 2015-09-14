angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Activities', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var activities = [{
    id: 0,
    title: '最美的时光在路上',
    status: '火热报名中',
    username: '叶子'
  }, {
    id: 1,
    title: '最美的时光在路上',
    status: '火热报名中',
    username: '叶子'
  }, {
    id: 2,
    title: '最美的时光在路上',
    status: '报名已截止',
    username: '叶子'
  }, {
    id: 3,
    title: '最美的时光在路上',
    status: '报名已截止',
    username: '叶子'
  }, {
    id: 4,
    title: '最美的时光在路上',
    status: '报名已截止',
    username: '叶子'
  }, {
    id: 5,
    title: '最美的时光在路上',
    status: '报名已截止',
    username: '叶子'
  }, {
    id: 6,
    title: '最美的时光在路上',
    status: '报名已截止',
    username: '叶子'
  }, {
    id: 7,
    title: '最美的时光在路上',
    status: '报名已截止',
    username: '叶子'
  }, {
    id: 8,
    title: '最美的时光在路上',
    status: '报名已截止',
    username: '叶子'
  }];

  return {
    all: function() {
      return activities;
    },
    get: function(activityId) {
      for (var i = 0; i < activities.length; i++) {
        if (activities[i].id === parseInt(activityId)) {
          return activities[i];
        }
      }
      return null;
    },
    load: function() {
      var more = [{
        id: 100,
        title: '最新消息',
        status: '火热报名中',
        username: '新用户'
      }];
      return more[0];
    }
  };
})

.factory('Memos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var memos = [{
    id: 0,
    title: '最美的时光在路上',
    username: '叶子'
  }, {
    id: 1,
    title: '最美的时光在路上',
    username: '叶子'
  }, {
    id: 2,
    title: '最美的时光在路上',
    username: '叶子'
  }];

  return {
    all: function() {
      return memos;
    },
    get: function(memoId) {
      for (var i = 0; i < memos.length; i++) {
        if (memos[i].id === parseInt(memoId)) {
          return memos[i];
        }
      }
      return null;
    }
  };
})

.factory('UserService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var isLogin = false;

  return {
    login: function() {
      isLogin = true;
      return isLogin;
    },
    logout: function(){
      isLogin = false;
      return isLogin;
    },
    status: function() {
      return isLogin;
    }
  };
})

;
