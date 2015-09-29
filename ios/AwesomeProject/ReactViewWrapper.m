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
  
//     jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  RCTRootView *rctView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AwesomeProject"
                                               initialProperties:nil
                                                   launchOptions:nil];
  [self.view addSubview:rctView];
  rctView.frame = self.view.bounds;
  self.navigationController.navigationBarHidden = true;
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  self.navigationController.navigationBarHidden = true;
}

@end