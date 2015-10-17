'use strict';

var moment = require('moment');

var React = require('react-native');
var {
  RefresherListView,
  Navigator,
  LoadingBarIndicator
} = require('react-native-refresher');

var {BlurView} = require('react-native-blur');

var RefreshableListView = require('react-native-refreshable-listview');

var su = require('./styleUtils');
var Navbars = require('./Navbars');

var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} = React;

var api = require('./api');
var activity = api.activity;

var REGIONS = [{
        id: 0,
        tag: 'all',
        name: '全部',
        icon: require('image!icon-region-shanxi')
      }, {
        id: 1,
        tag: 'beijing',
        name: '北京',
        icon: require('image!icon-region-beijing'),
      }, {
        id: 2,
        tag: 'hebei',
        name: '河北',
        icon: require('image!icon-region-hebei'),
      }, {
        id: 3,
        tag: 'shandong',
        name: '山东',
        icon: require('image!icon-region-shandong'),
      }, {
        id: 4,
        tag: 'tianjin',
        name: '天津',
        icon: require('image!icon-region-tianjin'),
      }, {
        id: 5,
        tag: 'neimenggu',
        name: '内蒙古',
        icon: require('image!icon-region-neimenggu'),
      }];

var ActivityList = React.createClass({
  getInitialState: function() {
    return {
      filterShown: false,
      region: REGIONS[0],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this._fetchData();
  },

  _showRegions: function() {
    this.props.setNavigationBar(this._navbarForRegions());
    this.setState({
      filterShown: true
    });
  },

  onBlur: function() {
    this._hideRegions();
  },

  _navbarForRegions: function() {
    var routeMapper = Object.assign({}, Navbars.NormalRouteMapper);
    var _Title = routeMapper.Title;
    var region = this.state.region;
    routeMapper.Title = function(route, navigator, index, navState) {
      var _route = Object.assign({}, route);
      _route.title = region.name;
      return _Title(_route, navigator, index, navState);
    };
    var self = this;
    routeMapper.LeftButton = function(route, navigator, index, navState) {
      var styles = StyleSheet.create({
        regionFilter: {
          position: 'absolute',
          backgroundColor: 'transparent',
          marginVertical: 15,
          marginLeft: 10,
        },
        cancel: {
          backgroundColor: 'transparent',
          color: '#fff',
          height: 14,
          fontSize: 14
        }
      });

      return (
          <TouchableOpacity activeOpacity={0.8} style={styles.regionFilter} onPress={self._hideRegions}>
            <Text style={styles.cancel}>取消</Text>
          </TouchableOpacity>
      );
    }

    return React.cloneElement(Navbars.Normal, {
      routeMapper
    });
  },

  _hideRegions: function() {
      this.props.setNavigationBar(this._navbar());
      this.setState({
        filterShown: false
      });
  },

  _navbar: function() {
    var routeMapper = Object.assign({}, Navbars.NormalRouteMapper);
    var _Title = routeMapper.Title;
    routeMapper.Title = function(route, navigator, index, navState) {
      var _route = Object.assign({}, route);
      _route.title = '活动';
      return _Title(_route, navigator, index, navState);
    }
    var self = this;
    var region = this.state.region;
    routeMapper.LeftButton = function(route, navigator, index, navState) {
      var styles = StyleSheet.create({
        regionFilter: {
          marginVertical: 12,
          marginLeft: 10,
        },
        regionFilterInner: {
          position: 'absolute',
          backgroundColor: 'transparent',
          left: 0,
          top: 0,
          alignItems: 'center',
          flexDirection: 'row'
        },
        filterIcon: {
          ...su.size(15, 20),
          marginRight: 5
        },
        region: {
          color: '#fff',
          fontSize: 14
        }
      });

      return (
        <TouchableOpacity activeOpacity={0.8} style={styles.regionFilter} onPress={self._showRegions}>
          <View style={styles.regionFilterInner}>
            <Image style={styles.filterIcon} source={require('image!icon-annotation')}/>
            <Text style={styles.region}>{region.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    var navbar = React.cloneElement(Navbars.Normal, {
      routeMapper
    });
    return navbar;
  },

  onSelect: function() {
      this.props.setNavigationBar(this._navbar());
  },

  _fetchData: function() {
    console.log('fetch data');
    return activity.fetch().then(function(data) {
      var dataSource = this.state.dataSource.cloneWithRows(data.results);
      this.setState({
        dataSource: dataSource
      });
    }.bind(this), function(e) {
      console.trace(e);
    });
  },

  _renderHeaderWrapper: function(refreshingIndicator) {
    return refreshingIndicator;
  },

  _renderSeparator: function(sectionID, rowID, adjacentRowHighlighted) {
    if (rowID == this.state.dataSource.getRowCount() - 1) {
      return null;
    } else {
      return <View style={{height: 20, backgroundColor: 'transparent'}}/>;
    }
  },

  _loadMore: function() {
    console.log('load more data');
  },

  _onRegionSelect: function(region) {
    this.state.region = region;
    this.setState({
      filterShown: false
    }, function() {
      this.props.setNavigationBar(this._navbar());
    }.bind(this));
  },

  _renderRegionCell: function(item) {
    return (
      <TouchableOpacity style={regions.cell} 
        activeOpacity={0.8}
        onPress={this._onRegionSelect.bind(this, item)} key={item.tag}> 
        <View style={regions.region}>
          <Image style={regions.image} source={item.icon}/>
          <Text style={regions.regionName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  render: function() {
      return (
          <View style={[styles.container, this.props.style]}>
            <RefreshableListView
              renderSeparator={this._renderSeparator}
              renderHeaderWrapper={this._renderHeaderWrapper}
              dataSource={this.state.dataSource}
              onEndReached={this._loadMore}
              renderRow={this._renderRow}
              loadData={this._onRefresh}/>

            {this.state.filterShown &&
            <TouchableOpacity activeOpacity={1} style={regions.popup} onPress={this._hideRegions}>
              <BlurView style={{flex: 1}} blurType="light">
                <View style={regions.grid}>
                  <View style={regions.row}>
                    {REGIONS.slice(0, 3).map(this._renderRegionCell)}
                  </View>
                  <View style={regions.row}>
                    {REGIONS.slice(3).map(this._renderRegionCell)}
                  </View>
                </View>
              </BlurView>
            </TouchableOpacity>}

          </View>
      );
  },

  _onRefresh: function() {
    return this._fetchData();
  },

  _renderRow: function(data) {
    return (
        <Activity key={data.id} data={data}/>
    );
  },
});

var Activity = React.createClass({
  getInitialState: function() {
    return {}
  },

  _renderTags: function() {
    var data = this.props.data;

    var tags = data.tags.map(function(tag) {
      return (<Text key={tag} style={styles.tag}>{tag}</Text>);
    });

    if (data.status === activity.PREPARING) {
      tags = [<Text key={activity.PREPARING} style={[styles.tag, styles.tagHot]}>火热报名中</Text>].concat(tags);
    } else {
      tags = [<Text key={activity.TRAVELLING} style={[styles.tag, styles.tagDue]}>报名已截止</Text>].concat(tags);
    }

    return (
      <View style={styles.tags}>{tags}</View>
    );
  },

  _onTouch: function() {},

  _formatDate: function(date) {
    date = moment(date);
    if (date.year() === moment().year()) {
      return date.format('MM-DD');
    } else {
      return date.format('YYYY-MM-DD');
    }
  },

  _renderDate: function() {
    var data = this.props.data;
    var days = Math.floor((data.endDate.getTime() - data.startDate.getTime()) / (3600 * 1000 * 24)) + 1;
    if (days > 1) {
      var duration = "（" + days + "天" + (days-1) + "晚）";
    } else {
      var duration = "（" + days + "天）";
    }

    return (
      <View style={styles.date}>
        <Image style={[styles.icon, {marginRight: 10}]} source={require('image!icon-calendar')}/>
        <Text style={styles.baseText}>
          {this._formatDate(data.startDate)} ~ {this._formatDate(data.endDate)}
        </Text>
        <Text style={[styles.baseText, styles.duration]}>{duration}</Text>
      </View>
    );
  },

  render: function() {
    var data = this.props.data;
    var user = data.user;
    var avatar = user.avatar ? {url: user.avatar} : require('image!avatar-placeholder');

    return (
      <TouchableHighlight underlayColor='#f3f5f6'>
        <View style={styles.row}>
          <View style={styles.brief}>
            <Image style={styles.bg} source={{uri: data.header}}>
              <View style={styles.info}>
                <Text style={styles.title}>{data.title}</Text>
                {this._renderTags(data)}
              </View>
            </Image>
          </View>

          <View style={styles.route}>
            <Image style={[styles.icon, {marginRight: 10}]} source={require('image!icon-mark')}/>
            <Text style={styles.baseText}>{data.route}</Text>
          </View>

          {this._renderDate()}
          
          <View style={styles.user}>
            <Image style={styles.avatar} source={avatar}/>
            <Text style={[styles.username, styles.baseText]}>{data.user.username}</Text>
            <Text style={[styles.publishDate]}>发布于 {moment(data.publishDate).format('YYYY-MM-DD HH:mm')}</Text>

            <View style={styles.star}>
              <Image style={styles.iconStar} source={data.starred ? require('image!icon-starred') : require('image!icon-star')}/>
              <Text style={[styles.baseText, styles.stars]}>{data.stars}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
      icon: {
        ...su.size(11)
      },

      baseText: {
        color: '#303030',
        fontWeight: '200'
      },

      container: {
        flex: 1,
        backgroundColor: '#f3f5f6'
      },

      row: {
        backgroundColor: '#fff'
      },

      brief: {
        height: 180,
        marginBottom: 10
      },

      bg: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },

      info: {
        backgroundColor: 'transparent',
        paddingLeft: 16,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      },

      route: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        marginBottom: 10
      },

      title: {
        textAlign: 'left',
        fontSize: 20,
        color: '#fff',
        marginBottom: 10
      },

      tags: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
      },

      tag: {
        fontSize: 10,
        marginRight: 5,
        color: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#fff',
        overflow: 'hidden',
        // FIXME: hack tag height!
        lineHeight: 12,
        ...su.padding(2, 4)
      },

      tagHot: {
        borderColor: '#f03a47',
        backgroundColor: '#f03a47'
      },

      tagDue: {
        borderColor: '#34be9a',
        backgroundColor: '#34be9a'
      },

      date: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        marginBottom: 10
      },

      duration: {
        color: '#96969b'
      },

      user: {
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16
      },

      avatar: {
        ...su.size(25),
        borderRadius: 12.5,
        marginRight: 10
      },

      username: {
        fontSize: 12,
        // FIXME: hack 
        lineHeight: 15,
        marginRight: 10
      },

      publishDate: {
        fontSize: 10,
        lineHeight: 15,
        marginRight: 10,
        fontWeight: '100',
        color: '#96969b'
      },

      toolbar: {
        backgroundColor: '#F5FCFF',
        height: 50
      },

      listView: {
        flex: 1,
        marginTop: 44,
        backgroundColor: '#f3f5f6',
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

var regions = StyleSheet.create({
  popup: {
     position: 'absolute',
     backgroundColor: 'transparent',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
  },

  grid: {
    backgroundColor: '#0087fa',
    padding: 20,
    paddingBottom: 10
  },

  row: {
    flexDirection: 'row',
    paddingBottom: 25 
  },

  cell: {
    flex: 1
  },

  region: {
    alignItems: 'center'
  },

  image: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    ...su.size(60),
    marginBottom: 10
  },

  regionName: {
    color: '#fff'
  }
});

module.exports = ActivityList;
