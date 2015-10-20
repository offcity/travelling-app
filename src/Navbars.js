var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Navigator,
} = React;

var NormalRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}>
        <Image style={styles.navBarLeftButton} source={require('image!back-icon')}/>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  }
};

var styles = StyleSheet.create({
  navBarTrasnparent: {
    backgroundColor: 'transparent'
  },

  navBar: {
    backgroundColor: '#0087fa'
  },

  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#fff',
    height: 16,
    fontSize: 16,
    marginVertical: 14,
  },
  navBarLeftButton: {
    marginLeft: 10,
    marginVertical: 14,
    width: 17,
    height: 16
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#fff'
  }
});

var Normal = <Navigator.NavigationBar style={styles.navBar} routeMapper={NormalRouteMapper}/>;
var Transparent = <Navigator.NavigationBar style={styles.navBarTrasnparent} routeMapper={NormalRouteMapper}/>;
var None = null;


module.exports = {
	Normal,
	Transparent,
	None,
  NormalRouteMapper,
  styles
};
