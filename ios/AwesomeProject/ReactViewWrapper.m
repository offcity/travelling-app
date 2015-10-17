//
//  ReactViewWrapper.m
//  AwesomeProject
//
//  Created by 杨辰 on 15/9/24.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "RCTRootView.h"
#import "ReactViewWrapper.h"

@implementation ReactViewWrapper

- (void)viewDidLoad {
  [super viewDidLoad];
  
  
  [self.view addSubview:self.rctView];
  self.rctView.frame = self.view.bounds;
  self.navigationController.navigationBarHidden = true;
}

- (void)viewDidAppear :(BOOL)animated {
  [super viewDidAppear:animated];
  self.navigationController.navigationBarHidden = true;
}

@end