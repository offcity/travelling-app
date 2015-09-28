//
//  CDCacheService.h
//  LeanChat
//
//  Created by lzw on 14/12/3.
//  Copyright (c) 2014年 LeanCloud. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CDCommon.h"
#import <LeanChatLib/AVIMConversation+Custom.h>

@interface CDCacheManager : NSObject

+ (instancetype)manager;

- (AVUser *)lookupUser:(NSString *)userId;
- (void)registerUsers:(NSArray *)users;
- (void)cacheUsersWithIds:(NSSet *)userIds callback:(AVBooleanResultBlock)callback;

- (void)setCurConv:(AVIMConversation *)conv;
- (AVIMConversation *)getCurConv;
- (void)refreshCurConv:(AVBooleanResultBlock)callback;

@end
