# travelling-app

## 环境搭建

根据 [React Native Getting Started 文档](https://facebook.github.io/react-native/docs/getting-started.html) 安装 Node.js, Homebrew, watchman 等开发工具。

另外，安装 [cocoapods](https://cocoapods.org/)。安装 cocoapods 之前要更换 gem 源，改成 [淘宝的源](https://ruby.taobao.org/):

```sh
$ gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
$ gem sources -l
*** CURRENT SOURCES ***

https://ruby.taobao.org

$ sudo gem install cocoapods
```


安装 npm 依赖：

```sh
$ npm install
```

安装 Pods（iOS 原生组件依赖）：

```sh
$ cd ios && pods install --verbose
```

使用 xcode 打开 `ios/AwesomeProject.xcworkspace`，编译运行。
