var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  AlertIOS,
  View,
  Component,
  TouchableOpacity,
  ListView,
  TouchableHighlight,
  Navigator,
  TabBarIOS,
  StatusBarIOS,
  NativeModules
} = React;

var Icon = require('react-native-vector-icons/Ionicons');
var Navbars = require('./Navbars');
var SpringBoard = NativeModules.SpringBoard;
var ActivityList = require('./Activity');
var Space = require('./Space');
var JourneyTab = require('./JourneyTab');

var MainTabPage = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'MainTabPage',

  getInitialState: function() {
    return {
      selectedTab: 'activities',
      notifCount: 0,
      presses: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },

  componentDidMount: function() {
  	this.refs.activity.onSelect();
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

  renderHeader: function(title) {
    return (
      <View style={style.headerContainer}>
        <Text style={style.header}>{title}</Text>
      </View>
    )
  },

  _getPreviousTab: function() {
  	if(this.state.selectedTab === 'activities') {
  		return this.refs.activity;
  	} else if (this.state.selectedTab === 'journeys') {
  		return this.refs.journey;
  	} else {
  		return this.refs.space;
  	}
  },

  _onActivitiesSelect: function() {
  	var previousTab = this._getPreviousTab();
  	this.setState({
        selectedTab: 'activities'
    }, function() {
    	previousTab.onBlur && previousTab.onBlur();
    	this.refs.activity.onSelect();
    }.bind(this));
  },

  _onJourneySelect: function() {
  	var previousTab = this._getPreviousTab();
  	this.setState({
        selectedTab: 'journeys'
    }, function() {
    	previousTab.onBlur && previousTab.onBlur();
    	this.refs.journey.onSelect();
    }.bind(this));
  },

  _onSpaceSelect: function() {
  	var previousTab = this._getPreviousTab();
    this.setState({
      selectedTab: 'space'
    }, function() {
    	previousTab.onBlur && previousTab.onBlur();
    	this.props.setNavigationBar(Navbars.None);
    }.bind(this));
  },

  render: function() {
  	var containerStyles = [styles.container, this.props.style];
  	if (this.state.selectedTab === 'space') {
  		containerStyles.push({
  			paddingTop: 0
  		});
  	}

    return (
      <View style={containerStyles}>
	      <TabBarIOS barTintColor="#fff">
	        <TabBarIOS.Item
	          title="活动"
	          icon={{uri: 'icon-tab-activity', scale: 2}}
	          selectedIcon={{uri: 'icon-tab-activity-active', scale: 2}}
	          selected={this.state.selectedTab === 'activities'}
	          onPress={this._onActivitiesSelect}>

	          <ActivityList ref="activity" 
	          	navigator={this.props.navigator} 
	          	setNavigationBar={this.props.setNavigationBar}/>

	        </TabBarIOS.Item>

	        <TabBarIOS.Item
	          title="游记"
	          icon={{uri: 'icon-tab-journey', scale: 2}}
	          selectedIcon={{uri: 'icon-tab-journey-active', scale: 2}}
	          selected={this.state.selectedTab === 'journeys'}
	          onPress={this._onJourneySelect}>

	            <JourneyTab 
	            	ref="journey" 
	            	navigator={this.props.navigator}
	            	setNavigationBar={this.props.setNavigationBar}/>
	            	
	        </TabBarIOS.Item>

	        <TabBarIOS.Item
	          title=""
	          icon={{uri: 'icon-tab-plus', scale: 2}}>
	          <View></View>
	        </TabBarIOS.Item>

	        <TabBarIOS.Item
	          title="朋友"
	          icon={{uri: 'icon-tab-friends', scale: 2}}
	          selectedIcon={{uri: 'icon-tab-friends-active', scale: 2}}>
	        </TabBarIOS.Item>
	        
	        <TabBarIOS.Item
	          title="我的"
	          icon={{uri: 'icon-tab-space', scale: 2}}
	          selectedIcon={{uri: 'icon-tab-space-active', scale: 2}}
	          selected={this.state.selectedTab === 'space'}
	          onPress={this._onSpaceSelect}>

	          <Space 
	          	ref="space" 
	          	navigator={this.props.navigator}
	          	setNavigationBar={this.props.setNavigationBar}/>

	        </TabBarIOS.Item>
	      </TabBarIOS>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
  	flex: 1
  }
});

module.exports = MainTabPage;