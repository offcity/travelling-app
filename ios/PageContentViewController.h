//
//  PageContentViewController.h
//  offcity
//
//  Created by Guyi on 15/9/24.
//  Copyright © 2015年 limijiaoyin. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PageContentViewController : UIViewController

@property NSUInteger pageIndex;
@property NSString *titleText;
@property NSString *imageFile;
@property BOOL isBtnHidden;

@property (weak, nonatomic) IBOutlet UIImageView *backgroundImageView;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UIButton *stepinBtn;

@end
