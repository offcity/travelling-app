/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"
#import "ReactViewWrapper.h"

// leancloud code
#import "CDCommon.h"
#import "CDAppDelegate.h"
#import "CDCommon.h"
#import "CDLoginVC.h"
#import "CDBaseTabC.h"
#import "CDBaseNavC.h"
#import "CDConvsVC.h"
#import "CDFriendListVC.h"
#import "CDProfileVC.h"
#import "CDAbuseReport.h"
#import "CDCacheManager.h"

#import "CDUtils.h"
#import "CDAddRequest.h"
#import "CDIMService.h"
#import "LZPushManager.h"
#import <iRate/iRate.h>
#import <iVersion/iVersion.h>
#import <LeanCloudSocial/AVOSCloudSNS.h>
#import <OpenShare/OpenShareHeader.h>

@interface AppDelegate()

@property (nonatomic, strong) CDLoginVC *loginVC;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];

  [CDAddRequest registerSubclass];
  [CDAbuseReport registerSubclass];
#if USE_US
  [AVOSCloud useAVCloudUS];
#endif
  [AVOSCloud setApplicationId:AVOSAppID clientKey:AVOSAppKey];
  //    [AVOSCloud setApplicationId:CloudAppId clientKey:CloudAppKey];
  //    [AVOSCloud setApplicationId:PublicAppId clientKey:PublicAppKey];
    
  [AVOSCloud setLastModifyEnabled:YES];
  [AVAnalytics trackAppOpenedWithLaunchOptions:launchOptions];
    
  if (SYSTEM_VERSION >= 7.0) {
      [[UINavigationBar appearance] setBarTintColor:NAVIGATION_COLOR];
      [[UINavigationBar appearance] setTintColor:[UIColor whiteColor]];
  }
  else {
      [[UINavigationBar appearance] setTintColor:NAVIGATION_COLOR];
  }
  [[UINavigationBar appearance] setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:
                                                          [UIColor whiteColor], NSForegroundColorAttributeName, [UIFont boldSystemFontOfSize:17], NSFontAttributeName, nil]];

  UINavigationController *rootViewController = [[UINavigationController alloc] init];
  rootViewController.navigationBarHidden = true;
  self.window.rootViewController = rootViewController;

  NSURL *jsCodeLocation;
  
  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */
  
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
  
  /**
   * OPTION 2
   * Load from pre-bundled file on disk. To re-generate the static bundle
   * from the root of your project directory, run
   *
   * $ react-native bundle --minify
   *
   * see http://facebook.github.io/react-native/docs/runningondevice.html
   */
  
  // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  RCTRootView *rctView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AwesomeProject"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  
  ReactViewWrapper *reactViewWrapper = [[ReactViewWrapper alloc] init];
  reactViewWrapper.rctView = rctView;
  [rootViewController pushViewController:reactViewWrapper animated:true];
  [self.window makeKeyAndVisible];


  [[LZPushManager manager] registerForRemoteNotification];

  #ifdef DEBUG
    [AVPush setProductionMode:NO];  // 如果要测试申请好友是否有推送，请设置为 YES
    [AVAnalytics setAnalyticsEnabled:NO];
    [AVOSCloud setAllLogsEnabled:YES];
  #endif

  return YES;
}

- (void)addItemController:(UIViewController *)itemController toTabBarController:(CDBaseTabC *)tab {
  CDBaseNavC *nav = [[CDBaseNavC alloc] initWithRootViewController:itemController];
  [tab addChildViewController:nav];
}

- (void)toMain{
  [iRate sharedInstance].applicationBundleID = @"com.avoscloud.leanchat";
  [iRate sharedInstance].onlyPromptIfLatestVersion = NO;
  [iRate sharedInstance].previewMode = NO;
  [iVersion sharedInstance].applicationBundleID = @"com.avoscloud.leanchat";
  [iVersion sharedInstance].previewMode = NO;
  [[UIApplication sharedApplication] setStatusBarHidden:NO];
  [[CDCacheManager manager] registerUsers:@[[AVUser currentUser]]];
  WEAKSELF
  [CDChatManager manager].userDelegate = [CDIMService service];
  
#ifdef DEBUG
#warning 使用开发证书来推送，方便调试，具体可看这个变量的定义处
  [CDChatManager manager].useDevPushCerticate = YES;
#endif
  
  [[CDChatManager manager] openWithClientId:[AVUser currentUser].objectId callback: ^(BOOL succeeded, NSError *error) {
    DLog(@"%@", error);
    CDBaseTabC *tab = [[CDBaseTabC alloc] init];
    [weakSelf addItemController:[[CDConvsVC alloc] init] toTabBarController:tab];
    [weakSelf addItemController:[[CDFriendListVC alloc] init] toTabBarController:tab];
    [weakSelf addItemController:[[CDProfileVC alloc] init] toTabBarController:tab];
    
    tab.selectedIndex = 0;
    UINavigationController *controller = (UINavigationController*) weakSelf.window.rootViewController;
    [controller setViewControllers:@[tab]];
  }];
}

- (void)toLogin {
  self.loginVC = [[CDLoginVC alloc] init];
  self.window.rootViewController = self.loginVC;
}

- (void)stepin {

}

@end
