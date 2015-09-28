'use strict';

var React = require('react-native');
var Hello = require('./Hello');
var nextPage = require('./nextPage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  myIcon,
  CameraRoll,
  SliderIOS,
  SwitchIOS,
  View,
  LayoutAnimation,
  TouchableOpacity,
  NavigatorIOS,
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
                <TouchableHighlight onPress={this.handlePress}>
                    <Text style={style.button}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var LaunchView = React.createClass({
    gotoOther: function() {
        var index = 1;
        this.props.navigator.push({name: "Scene#" + index, index: index});
    },

    gotoIM: function() {
        console.log('goto IM');
        SpringBoard.gotoIM(function() {
            console.log('goto IM', 'done!');
        });
    },

    render: function() {
        return (
            <View style={style.container}>
                <View style={style.row}>
                    <Button onClick={this.gotoOther}>Other</Button>
                    <Button onClick={this.gotoIM}>IM</Button>
                </View>
            </View>
        );   
    }
});

var IMView = React.createClass({
    render: function() {
        return (
            <View style={style.container}>
                <Text style={style.welcome}>IM View</Text>
            </View>
        );   
    }
});

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';


var Home = React.createClass({
    render: function() {
      return (
          <NavigatorIOS
        style={style.container}
        initialRoute={{
          component: Root,
          title: '城外'
        }}/>
      );
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
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
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

  renderImages: function() {
    return (
      <View>
        <Image
          style={style.logo}
          source={{uri: "http:///facebook.github.io/react/img/logo_og.png"}}
        />
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
        <Text style={style.text}>{pageText}</Text>
        <Text style={style.text}>{num} re-renders of the {pageText}</Text>
        <Button onClick={this.gotoIM}>IM</Button>
      </View>
    );
  },

  onTouch:function(data){
    this.props.navigator.push({
      title: data,
      component: nextPage,
      passProps: {title: 'data',
              content: data,}
    });
  },

  renderMovie: function(movie) {
    return (
      <TouchableHighlight onPress={() => {this.onTouch(movie.title)}}>
      <View style={styleListView.container}>
      <View style={styleListView.rightContainer}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styleListView.thumbnail}
        />
        </View>
        <View style={styleListView.rightContainer}>
          <Text style={styleListView.title}>{movie.title}</Text>
          <Text style={styleListView.year}>{movie.year}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },

  renderFriendList: function(movie) {
    return (
      <TouchableHighlight onPress={this.onTouch(movie.year)}>
      <View style={style.container}>
      <View style={style.rightContainer}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={style.thumbnail}
        />
        </View>
        <View style={style.rightContainer}>
          <Text style={style.title}>{movie.title}</Text>
          <Text style={style.year}>{movie.year}</Text>
          <Button onClick={this.renderImages}>ImageYo</Button>
        </View>
      </View>
      </TouchableHighlight>
    );
  },

  renderHeader: function(title) {
    return (
      <View style={style.headerContainer}>
        <Text style={style.header}>{title}</Text>
      </View>
    )
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="活动"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {
            <View style={style.rootContainer}>
            {this.renderHeader('活动')}
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderMovie}
              style={style.listView}
            />
            </View>
          }
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="游记"
          icon={{uri: base64Icon, scale: 3}}
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="朋友"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'friendTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'friendTab',
            });
          }}>
          {
            <Hello />
            
            // <NavigatorIOS
            // style={style.container}
            // initialRoute={{
            //   component: Hello,
            //   title: '朋友'
            // }}/>
          }
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={{uri: base64Icon, scale: 3}}
          title="我的"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#cccccc', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

var style = require("./style");

var styleListView = require("./styleListView");


AppRegistry.registerComponent('AwesomeProject', () => Home);
