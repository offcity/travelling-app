//
//  PageContentViewController.m
//  offcity
//
//  Created by Guyi on 15/9/24.
//  Copyright © 2015年 limijiaoyin. All rights reserved.
//

#import "AppDelegate.h"
#import "PageContentViewController.h"
#import "RCTRootView.h"
#import "ReactViewWrapper.h"

@interface PageContentViewController ()

@end

@implementation PageContentViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.backgroundImageView.image = [UIImage imageNamed:self.imageFile];
    self.backgroundImageView.frame = CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height);
    self.titleLabel.text = self.titleText;
    self.stepinBtn.hidden = self.isBtnHidden;
    [self.stepinBtn.layer setMasksToBounds:YES];
    self.stepinBtn.layer.cornerRadius = 10.0;
    self.stepinBtn.layer.borderWidth = 1.0f;
    self.stepinBtn.layer.borderColor = [UIColor whiteColor].CGColor;
  [self.stepinBtn addTarget:self action:@selector(handleStepin:) forControlEvents:UIControlEventTouchUpInside];
  
    //动画效果
    CABasicAnimation *theAnimation;
    //theAnimation=[CABasicAnimation animationWithKeyPath:@"transform.translation.x"];
    theAnimation=[CABasicAnimation animationWithKeyPath:@"transform.scale"];
    
    theAnimation.fromValue = [NSNumber numberWithFloat:1];
    //移动的幅度
    theAnimation.toValue = [NSNumber numberWithFloat:1.4];
    //x，y轴缩小到0.1,Z 轴不变
    //theAnimation.toValue = [NSValue valueWithCATransform3D:CATransform3DMakeScale(320, 400, 1.0)];
    //持续时间
    theAnimation.duration = 10;
    //重复次数
    theAnimation.repeatCount = 1;
    //把imageviews这个视图加上theAnimation这个动画效果
    [self.backgroundImageView.layer addAnimation:theAnimation forKey:nil];
    //开始加载动画效果
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:1];
    [UIView setAnimationDelegate:self];
    //view 大小 位置
    //self.backgroundImageView.frame = CGRectMake(-320, 0, 320, 400);
    //当动画停止的时候，调用hideAnimationStopped事件
    //[UIView setAnimationDidStopSelector:@selector(hideAnimationStopped)];
    [UIView commitAnimations];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (IBAction)handleStepin:(id)sender {
  AppDelegate *delegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
  [delegate stepin];
}

@end
