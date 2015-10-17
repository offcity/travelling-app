//
//  UserApi.m
//  AwesomeProject
//
//  Created by jarvys on 15/10/13.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVOSCloud/AVOSCloud.h>

#import "RCTUtils.h"
#import "UserApi.h"


@implementation UserApi

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(currentUser:(RCTResponseSenderBlock)callback)
{
  AVUser *currentUser = [AVUser currentUser];
  if (currentUser != nil) {
    NSDictionary *userResult = [NSDictionary dictionaryWithObjectsAndKeys:
                  [[NSString alloc] initWithString:currentUser.sessionToken], @"sessionToken",
                  [[NSString alloc] initWithString:currentUser.username], @"username",
                  [[NSString alloc] initWithString:currentUser.mobilePhoneNumber], @"phone",
                  nil];
    callback(@[[NSNull null], userResult]);
  } else {
    callback(@[[NSNull null], [NSNull null]]);
  }
}

RCT_EXPORT_METHOD(signup:(NSString *)phone password:(NSString *)password callback:(RCTResponseSenderBlock)callback)
{
  AVUser *user = [AVUser user];
  user.username = [NSString stringWithFormat:@"%@_%@", @"user", phone];
  user.password = password;
  user.mobilePhoneNumber = phone;
  
  [user signUpInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
    if (succeeded) {
      callback(@[[NSNull null]]);
    } else {
      NSDictionary *extraData = [NSDictionary dictionaryWithObjectsAndKeys:
                                 [[NSString alloc] initWithString:error.localizedDescription], @"reason",
                                 [[NSString alloc] initWithFormat:@"%ld", (long)error.code], @"code",
                                 nil];
      callback(@[RCTMakeError(@"signup error", nil, extraData)]);
    }
  }];
}

RCT_EXPORT_METHOD(signin:(NSString *)phone password:(NSString *)password callback:(RCTResponseSenderBlock)callback)
{
  [AVUser logInWithMobilePhoneNumberInBackground:phone password:password block:^(AVUser *user, NSError *error) {
    if (error) {
      NSDictionary *extraData = [NSDictionary dictionaryWithObjectsAndKeys:
                                 [[NSString alloc] initWithString:error.localizedDescription], @"reason",
                                 [[NSString alloc] initWithFormat:@"%ld", (long)error.code], @"code",
                                 nil];
      callback(@[RCTMakeError(@"signin error", nil, extraData)]);
    } else {
     NSDictionary *userResult = [NSDictionary dictionaryWithObjectsAndKeys:
                  [[NSString alloc] initWithString:user.sessionToken], @"sessionToken",
                  [[NSString alloc] initWithString:user.username], @"username",
                  [[NSString alloc] initWithString:user.mobilePhoneNumber], @"phone",
                  nil];
      callback(@[[NSNull null], userResult]);
    }
  }];
}

RCT_EXPORT_METHOD(logout:(RCTResponseSenderBlock)callback)
{
  [AVUser logOut];
  callback(@[[NSNull null]]);
}

@end