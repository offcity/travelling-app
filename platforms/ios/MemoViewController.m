//
//  MemoViewController.m
//  tabsapp
//
//  Created by Guyi on 15/9/15.
//
//

#import "MemoViewController.h"

@interface MemoViewController ()

@property (nonatomic, strong) UILabel *logoLabel;

@end

@implementation MemoViewController

- (instancetype)init {
    if ((self = [super init])) {
        self.title = @"游记";
        self.tabBarItem.image = [UIImage imageNamed:@"tabbar_chat_active"];
        //self.tableViewStyle = UITableViewStyleGrouped;
    }
    return self;
}

- (void)loadView {
    [super loadView];
    self.logoLabel = [[UILabel alloc] init];
    self.logoLabel.text = @"V2EX";
    self.logoLabel.frame = (CGRect){50, 50, 44, 44};
    [self.view addSubview:self.logoLabel];
    [self.view setBackgroundColor: [UIColor whiteColor]];
}

- (void)viewDidLoad {
    self.wwwFolderName = @"www";
    self.startPage = [NSString stringWithFormat:@"%@%ld",@"index.html#/tab/memos/",(long)self.index];
    [super viewDidLoad];
    // Do any additional setup after loading the view.
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

@end
