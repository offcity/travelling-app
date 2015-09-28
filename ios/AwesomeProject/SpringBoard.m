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

@implementation SpringBoard

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(gotoIM:(RCTResponseSenderBlock)callback)
{
  UINavigationController *controller = (UINavigationController*)[[[UIApplication sharedApplication] keyWindow] rootViewController];
  CDLoginVC *loginVC = [[CDLoginVC alloc] init];
  [controller pushViewController:loginVC animated:true];
  callback(@[[NSNull null]]);
}



- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end