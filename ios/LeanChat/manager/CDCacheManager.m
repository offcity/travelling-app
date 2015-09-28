//
//  CDCacheService.m
//  LeanChat
//
//  Created by lzw on 14/12/3.
//  Copyright (c) 2014年 LeanCloud. All rights reserved.
//

#import "CDCacheManager.h"
#import "CDUtils.h"
#import "CDUserManager.h"
#import <LeanChatLib/CDChatManager.h>
#import <LeanChatLib/CDChatListVC.h>

static CDCacheManager *cacheManager;

@interface CDCacheManager ()<NSCacheDelegate>

@property (nonatomic, strong) NSCache *userCache;
@property (nonatomic, strong) NSString *currentConversationId;

@end

@implementation CDCacheManager

+ (instancetype)manager {
    static dispatch_once_t token;
    dispatch_once(&token, ^{
        cacheManager = [[CDCacheManager alloc] init];
    });
    return cacheManager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _userCache = [[NSCache alloc] init];
        _userCache.delegate = self;
        _userCache.evictsObjectsWithDiscardedContent = NO;
    }
    return self;
}

#pragma mark - cache delegate
- (void)cache:(NSCache *)cache willEvictObject:(id)obj {
//    DLog(@"will evict object");
}

#pragma mark - user cache

- (void)registerUsers:(NSArray *)users {
    for (AVUser *user in users) {
        [self.userCache setObject:user forKey:user.objectId];
    }
}

- (AVUser *)lookupUser:(NSString *)userId {
    return [self.userCache objectForKey:userId];
}

- (void)cacheUsersWithIds:(NSSet *)userIds callback:(AVBooleanResultBlock)callback {
    NSMutableSet *uncachedUserIds = [[NSMutableSet alloc] init];
    for (NSString *userId in userIds) {
        if ([[CDCacheManager manager] lookupUser:userId] == nil) {
            [uncachedUserIds addObject:userId];
        }
    }
    if ([uncachedUserIds count] > 0) {
        [[CDUserManager manager] findUsersByIds:[[NSMutableArray alloc] initWithArray:[uncachedUserIds allObjects]] callback: ^(NSArray *objects, NSError *error) {
            if (objects) {
                [[CDCacheManager manager] registerUsers:objects];
            }
            callback(YES, error);
        }];
    }
    else {
        callback(YES, nil);
    }
}

#pragma mark - current conversation

- (void)setCurConv:(AVIMConversation *)conv {
    self.currentConversationId = conv.conversationId;
}

- (AVIMConversation *)getCurConv {
    return [[CDChatManager manager] lookupConvById:self.currentConversationId];
}

- (void)refreshCurConv:(AVBooleanResultBlock)callback {
    if ([self getCurConv] != nil) {
        [[CDChatManager manager] fecthConvWithConvid:[self getCurConv].conversationId callback: ^(AVIMConversation *conversation, NSError *error) {
            if (error) {
                callback(NO, error);
            }
            else {
                [[NSNotificationCenter defaultCenter] postNotificationName:kCDNotificationConversationUpdated object:nil];
                callback(YES, nil);
            }
        }];
    }
    else {
        callback(NO, [NSError errorWithDomain:nil code:0 userInfo:@{ NSLocalizedDescriptionKey:@"current conv is nil" }]);
    }
}

@end
