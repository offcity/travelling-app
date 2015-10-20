'use strict';

var moment = require('moment');
var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  ScrollView,
  TouchableHighlight,
  ListView,
  Dimensions,
} = React;

var GridView = require('react-native-grid-view');
var Navbars = require('./Navbars');

var su = require('./styleUtils');
var api = require('./api');
var activity = api.activity;

// FIXME: hack image width
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var JourneyTab = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this._fetchData();
  },

  _navbar: function(title) {
    var routeMapper = Object.assign({}, Navbars.NormalRouteMapper);
    var _Title = routeMapper.Title;
    routeMapper.Title = function(route, navigator, index, navState) {
      var _route = Object.assign({}, route);
      _route.title = title;
      return _Title(_route, navigator, index, navState);
    }
    var navbar = React.cloneElement(Navbars.Normal, {
      routeMapper
    });
    return navbar;
  },

  onSelect: function() {
      this.props.setNavigationBar(this._navbar('游记'));
  },

  _fetchData: function() {
    return activity.fetch().then(function(data) {
      var dataSource = this.state.dataSource.cloneWithRows(data.results);
      this.setState({
        dataSource: dataSource
      });
    }.bind(this), function(e) {
      console.trace(e);
    });
  },

  render: function() {
      var journeys = [{
            id: 1,
            header: 'http://f.hiphotos.baidu.com/image/pic/item/b64543a98226cffc9b70f24dba014a90f703eaf3.jpg',
            title: '最美的时光在路上',
            views: 1321,
            stars: 21,
            publishDate: Date.now(),
            user: {
              username: 'Steven'
            }
          }, {
            id: 2,
            header: 'http://f.hiphotos.baidu.com/image/pic/item/b64543a98226cffc9b70f24dba014a90f703eaf3.jpg',
            title: '最美的时光在路上',
            views: 1321,
            stars: 21,
            publishDate: Date.now(),
            user: {
              username: 'Steven'
            }
          }, {
            id: 3,
            header: 'http://f.hiphotos.baidu.com/image/pic/item/b64543a98226cffc9b70f24dba014a90f703eaf3.jpg',
            title: '最美的时光在路上',
            views: 1321,
            stars: 21,
            publishDate: Date.now(),
            user: {
              username: 'Steven'
            }
          }];
      if (journeys.length % 2 === 1) {
        journeys = journeys.concat({
            type: 'placeholder'
        });
      }
      return (
          <GridView 
            style={[styles.grid, this.props.style]}
            items={journeys}
            renderItem={this._renderItem}
            itemsPerRow={2}/>
      );
  },

  _onRefresh: function() {
    return this._fetchData();
  },

  _renderItem: function(data) {
    if (data.type === 'placeholder') {
      return <View style={styles.cell}/>
    } else {
      return (
          <Journey key={data.id} data={data}/>
      );
    }
  },
});

var Journey = React.createClass({
  getInitialState: function() {
    return {}
  },

  _onTouch: function() {},

  render: function() {
    var data = this.props.data;
    var user = data.user;
    var avatar = user.avatar ? {url: user.avatar} : require('image!avatar-placeholder');

    return (
      <View style={styles.cell}>
      <TouchableHighlight underlayColor='#f3f5f6'>
        <View style={{alignItems: 'stretch'}}>
          <View style={styles.header}>
            <Image style={styles.image} source={{uri: data.header}}>
              <View style={styles.info}>
                <Image source={avatar} style={styles.avatar}/>
                <View style={styles.user}>
                  <Text style={styles.username}>{data.user.username}</Text>
                  <Text style={styles.publishDate}>{moment(data.publishDate).format('YYYY-MM-DD HH:mm')}</Text>
                </View>
              </View>
            </Image>
          </View>
          

          <View style={styles.extra}>
              <Text style={[styles.title, styles.baseText]}>{data.title}</Text>

              <View style={styles.data}>
                <Image source={require('image!icon-views')} style={[styles.icon, {marginRight: 4}]}/>
                <Text style={[styles.small, {marginRight: 12}]}>{data.views}</Text>
                <Image source={require('image!icon-stars')} style={[styles.icon, {marginRight: 4}]}/>
                <Text style={styles.small}>{data.stars}</Text>
              </View>
          </View>
        </View>
      </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
      icon: {
        ...su.size(12),
        resizeMode: 'contain'
      },

      baseText: {
        color: '#303030',
        fontWeight: '200'
      },

      grid: {
        backgroundColor: '#f3f5f6',
        paddingHorizontal: 5,
        flex: 1,
        overflow: 'hidden'
      },

      cell: {
        flex: 1,
        padding: 5,
        overflow: 'hidden'
      },

      header: {
        flex: 1,
        height: 120,
      },

      image: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },

      info: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 10,
        right: 0,
        bottom: 10
      },

      title: {
        textAlign: 'left',
        fontSize: 14,
        marginBottom: 10
      },

      user: {
        flexDirection: 'column'
      },

      avatar: {
        ...su.size(25),
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 12.5,
        marginRight: 10 
      },

      username: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 12,
        marginBottom: 3
      },

      publishDate: {
        color: '#fff',
        fontSize: 9,
        lineHeight: 9,
        marginRight: 10,
        fontWeight: '100'
      },

      extra: {
        padding: 10,
        backgroundColor: '#fff'
      },

      data: {
        alignItems: 'center',
        flexDirection: 'row'
      },

      small: {
        color: '#96969b',
        fontSize: 10
      },

      star: {
        position: 'absolute',
        top: 5,
        right: 15,
        flexDirection: 'row',
      },

      iconStar: {
        ...su.size(15, 14),
        marginRight: 5,
      },

      stars: {
        lineHeight: 14,
        fontSize: 10,
        color: '#96969b'
      }
});

module.exports = JourneyTab;
