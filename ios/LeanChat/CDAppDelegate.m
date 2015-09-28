//
//  CDAppDelegate.m
//  LeanChat
//
//  Created by Qihe Bian on 7/23/14.
//  Copyright (c) 2014 LeanCloud. All rights reserved.
//

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

@interface CDAppDelegate()

@property (nonatomic, strong) CDLoginVC *loginVC;

@end

@implementation CDAppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
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
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
    
    if ([AVUser currentUser]) {
        // Applications are expected to have a root view controller at the end of application launch
        self.window.rootViewController = [[UIViewController alloc] init];
        [self toMain];
    }
    else {
        [self toLogin];
    }
    
    [[LZPushManager manager] registerForRemoteNotification];
    
#ifdef DEBUG
    [AVPush setProductionMode:NO];  // 如果要测试申请好友是否有推送，请设置为 YES
    [AVAnalytics setAnalyticsEnabled:NO];
    [AVOSCloud setAllLogsEnabled:YES];
#endif
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    [[LZPushManager manager] syncBadge];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    //[[LZPushManager manager] cleanBadge];
    [application cancelAllLocalNotifications];
}

- (void)applicationWillTerminate:(UIApplication *)application {
    [[LZPushManager manager] syncBadge];
}

- (void)application:(UIApplication *)app didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[LZPushManager manager] saveInstallationWithDeviceToken:deviceToken userId:[AVUser currentUser].objectId];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    DLog(@"%@", error);
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    if (application.applicationState == UIApplicationStateActive) {
        // 应用在前台时收到推送，只能来自于普通的推送，而非离线消息推送
    }
    else {
//  当使用 https://github.com/leancloud/leanchat-cloudcode 云代码更改推送内容的时候
//        {
//            aps =     {
//                alert = "lzwios : sdfsdf";
//                badge = 4;
//                sound = default;
//            };
//            convid = 55bae86300b0efdcbe3e742e;
//        }
        [[CDChatManager manager] didReceiveRemoteNotification:userInfo];
        [AVAnalytics trackAppOpenedWithRemoteNotificationPayload:userInfo];
    }
    DLog(@"receiveRemoteNotification");
}

- (void)toLogin {
    self.loginVC = [[CDLoginVC alloc] init];
    self.window.rootViewController = self.loginVC;
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
        weakSelf.window.rootViewController = tab;
    }];
}

#pragma mark - 

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    [AVOSCloudSNS handleOpenURL:url];
    [OpenShare handleOpenURL:url];
    return YES;
}

@end
