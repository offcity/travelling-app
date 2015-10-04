'use strict';

var React = require('react-native');
var Hello = require('./Hello');
var Activity = require('./Activity');
var ModalExample = require('./ModalExample');
var NextPage = require('./NextPage');
var AddActivity = require('./AddActivity');
var MyPage = require('./MyPage');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  RefresherListView,
  LoadingBarIndicator
} = require('react-native-refresher');


var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  myIcon,
  CameraRoll,
  SliderIOS,
  SwitchIOS,
  AlertIOS,
  Modal,
  View,
  Component,
  LayoutAnimation,
  TouchableOpacity,
  ListView,
  TouchableHighlight,
  Navigator,
  TabBarIOS,
  NativeModules
} = React;

var SpringBoard = NativeModules.SpringBoard;
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var Button = React.createClass({
    handlePress: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <View style={style.container}>
                <TouchableHighlight onPress={this.handlePress} underlayColor="#a9d9d4">
                    <Text style={style.button}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';


var Home = React.createClass({
    render: function() {
      return (
          <Navigator
          ref="navigator"
        style={style.container}
        initialRoute={{
          index: 0,
          name: 'Root',
          component: Root,
        }}
        renderScene={this.renderScene}
        configureScene={(route) => Navigator.SceneConfigs.HorizontalSwipeJump}/>

      );
    },
    renderScene: function(route, navigator) {
      var Component = route.component;
      return <Component
          navigator={navigator}
          route={route}
          name={route.name} />
    },
});

var Root = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'blueTab',
      notifCount: 0,
      presses: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      tabIconSize: 34,
      modalVisible: true,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch("https://api.leancloud.cn/1.1/classes/Activity", {
            headers: {
                'Content-Type': 'application/json',
                'X-LC-Id': 'vGdoWipkgLukG49FCz6beS1D',
                'X-LC-Key': '5LubapRJJIphAkmklcQw8zx2',
            }
        }).then(function(response) {
            var data = JSON.parse(response._bodyInit);

            var dataSource = this.state.dataSource.cloneWithRows(data.results);
            //console.error(dataSource);
            this.setState({
                dataSource: dataSource,
                loaded: true,
            });
            //console.error("123");
        }.bind(this), function() {
            console.error("fail");
        });
  },

  renderLoadingView: function() {
    return (
      <View style={style.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  gotoIM: function() {
        console.log('goto IM');
        SpringBoard.gotoIM(function() {
            console.log('goto IM', 'done!');
        });
    },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[style.rootContainer, {backgroundColor: color}]}>
      {this.renderHeader(pageText)}
        <Text style={style.text}>{pageText}</Text>
        <Text style={style.text}>{num} re-renders of the {pageText}</Text>
        <Button onClick={this.gotoIM}>IM</Button>
      </View>
    );
  },

  onTouch:function(data){
    this.props.navigator.push({
      name: 'NextPage',
      index: 1,
      id: data.id,
      title: data.title,
      content: data.content,
      component: NextPage,
    });
  },

  doModal:function() {
    this.props.navigator.push({
      name: 'AddActivity',
      index: 1,
      id: 1,
      component: AddActivity,
    });
  },

  renderMovie: function(data) {
    return (
      <TouchableHighlight onPress={() => {this.onTouch(data)}} underlayColor="#efefef">
      <View style={styleListView.container}>
        <View style={styleListView.rightContainer}>
          <Text style={styleListView.title}>{data.title}</Text>
          <Text style={styleListView.content}>{data.content}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },

  onRefresh: function() {
    // You can either return a promise or a callback
    this.fetchData();
  },

  renderHeader: function(title) {
    return (
      <View style={style.headerContainer}>
        <Text style={style.header}>{title}</Text>
      </View>
    )
  },

  render: function() {
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // }
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return (
      <TabBarIOS
        tintColor="#0087fa"
        barTintColor="#efefef">
        <Icon.TabBarItem
          title="活动"
          iconName="ios-flag-outline"
          iconSize={this.state.tabIconSize}
          selectedIconName="ios-flag"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {
            // <View style={style.rootContainer}>
            // {this.renderHeader('活动')}
            // <RefresherListView
            //   dataSource={this.state.dataSource}
            //   renderRow={this.renderMovie}
            //   onRefresh={this.onRefresh}
            //   minTime={50}
            //   style={style.listView}/>
            // </View>
            <Activity navigator={this.props.navigator}/>
          }
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="游记"
          iconName="ios-bookmarks-outline"
          iconSize={this.state.tabIconSize}
          selectedIconName="ios-bookmarks"
          selected={this.state.selectedTab === 'friendTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'friendTab',
            });
          }}>
          {
            <Hello navigator={this.props.navigator}/>
          }
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="添加"
          iconName="ios-plus"
          iconSize={this.state.tabIconSize}
          selectedIconName="ios-plus"
          selected={this.state.selectedTab === 'PlusTab'}
          onPress={() => {
            this.doModal()
            // AlertIOS.alert(
            //   'Foo Title',
            //   null,
            //   [
            //     {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
            //     {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
            //     {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
            //   ]
            // )
          }} >
          {
            // <ModalExample navigator={this.props.navigator}/>
          }
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="朋友"
          iconName="ios-chatboxes-outline"
          iconSize={this.state.tabIconSize}
          selectedIconName="ios-chatboxes"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('white', 'Red Tab', this.state.notifCount)}
        </Icon.TabBarItem>
        
        <Icon.TabBarItem
          title="我的"
          iconName="ios-person-outline"
          iconSize={this.state.tabIconSize}
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'MyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'MyTab',
            });
          }}>
          {
            <MyPage navigator={this.props.navigator}/>
          }
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  },
});

var style = require("./style");

var styleListView = require("./styleListView");

var styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#3b5998',
  },

  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});


AppRegistry.registerComponent('AwesomeProject', () => Home);
