//
//  SpringBoard.m
//  AwesomeProject
//
//  Created by 杨辰 on 15/9/24.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

#import "CDLoginVC.h"
#import "SpringBoard.h"
#import "CDProfileVC.h"
#import "CDFriendListVC.h"
#import "CDChatManager.h"
#import "CDBaseTabC.h"
#import "CDConvsVC.h"
#import "CDBaseNavC.h"
#import "CDCacheManager.h"
#import "CDIMService.h"

@implementation SpringBoard

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(gotoIM:(RCTResponseSenderBlock)callback)
{
//  UINavigationController *controller = (UINavigationController*)[[[UIApplication sharedApplication] keyWindow] rootViewController];
//  CDFriendListVC *nativeVC = [[CDFriendListVC alloc] init];
//  CDBaseNavC *nav = [[CDBaseNavC alloc] initWithRootViewController:nativeVC];
//  [controller pushViewController:nav animated:true];
//  callback(@[[NSNull null]]);
  
  UIWindow *window = [[UIApplication sharedApplication] keyWindow];
  [[CDCacheManager manager] registerUsers:@[[AVUser currentUser]]];
  [CDChatManager manager].userDelegate = [CDIMService service];
  WEAKSELF
  [[CDChatManager manager] openWithClientId:[AVUser currentUser].objectId callback: ^(BOOL succeeded, NSError *error) {
    DLog(@"%@", error);
    CDBaseTabC *tab = [[CDBaseTabC alloc] init];
    [weakSelf addItemController:[[CDConvsVC alloc] init] toTabBarController:tab];
    [weakSelf addItemController:[[CDFriendListVC alloc] init] toTabBarController:tab];
    [weakSelf addItemController:[[CDProfileVC alloc] init] toTabBarController:tab];
    
    tab.selectedIndex = 0;
    window.rootViewController = tab;
  }];
  callback(@[[NSNull null]]);
}

- (void)addItemController:(UIViewController *)itemController toTabBarController:(CDBaseTabC *)tab {
  CDBaseNavC *nav = [[CDBaseNavC alloc] initWithRootViewController:itemController];
  [tab addChildViewController:nav];
}

//- (void)toMain{
//  [[UIApplication sharedApplication] setStatusBarHidden:NO];
//  [[CDCacheManager manager] registerUsers:@[[AVUser currentUser]]];
//  WEAKSELF
//  [CDChatManager manager].userDelegate = [CDIMService service];
//  
//#ifdef DEBUG
//#warning 使用开发证书来推送，方便调试，具体可看这个变量的定义处
//  [CDChatManager manager].useDevPushCerticate = YES;
//#endif
//  
//  [[CDChatManager manager] openWithClientId:[AVUser currentUser].objectId callback: ^(BOOL succeeded, NSError *error) {
//    DLog(@"%@", error);
//    CDBaseTabC *tab = [[CDBaseTabC alloc] init];
//    [weakSelf addItemController:[[CDConvsVC alloc] init] toTabBarController:tab];
//    [weakSelf addItemController:[[CDFriendListVC alloc] init] toTabBarController:tab];
//    [weakSelf addItemController:[[CDProfileVC alloc] init] toTabBarController:tab];
//    
//    tab.selectedIndex = 0;
//    weakSelf.window.rootViewController = tab;
//  }];
//}


- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end