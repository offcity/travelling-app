'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        borderBottomWidth:0.5,
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
      },
      listView: {
        backgroundColor: '#white',
      },
});