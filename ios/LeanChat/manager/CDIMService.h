//
//  CDIMService.h
//  LeanChat
//
//  Created by lzw on 15/4/3.
//  Copyright (c) 2015年 LeanCloud. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <LeanChatLib/CDChatManager.h>

#import "CDCommon.h"
#import "CDBaseVC.h"

@interface CDIMService : NSObject <CDUserDelegate>

+ (instancetype)service;

- (void)goWithUserId:(NSString *)userId fromVC:(CDBaseVC *)vc;
- (void)goWithConv:(AVIMConversation *)conv fromNav:(UINavigationController *)nav;

@end
