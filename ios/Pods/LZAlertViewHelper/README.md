# LZAlertViewHelper
Use Block instead of UIAlertViewDelegate

# Install

```
    pod 'LZAlertViewHelper'
```

# Usage
```objc
[self.alertViewHelper showInputAlertViewWithMessage:@"请输入您的手机号码进行注册" block:^(BOOL confirm, NSString *text) {
   if (confirm) {
       /....
   } else {
       /...
   }
}
```

[More Example](https://github.com/leancloud/LeanStorage-Demo/blob/master/LeanStorageDemo/AVSMSBasic.m)

