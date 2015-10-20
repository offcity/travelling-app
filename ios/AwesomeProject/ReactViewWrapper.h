//
//  UIViewController_ReactViewWrapper.h
//  AwesomeProject
//
//  Created by 杨辰 on 15/9/24.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "RCTRootView.h"


@interface ReactViewWrapper : UIViewController

@property RCTRootView *rctView;

@end
