//
//  TabsViewController.h
//  tabsapp
//
//  Created by Guyi on 15/9/15.
//
//

#import <UIKit/UIKit.h>
#import <Cordova/CDVViewController.h>
#import <Cordova/CDVCommandDelegateImpl.h>
#import <Cordova/CDVCommandQueue.h>

@interface MemoViewController : CDVViewController

@property NSInteger index;

@end

@interface MemoCommandDelegate : CDVCommandDelegateImpl
@end

@interface MemoCommandQueue : CDVCommandQueue
@end
