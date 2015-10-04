'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

  headerContainer: {
    paddingTop: 20,
    height: 64,
    backgroundColor: '#0087fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  
  toolbar: {
    backgroundColor: '#F5FCFF',
    height: 50
  },

  container: {
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
  },

  button: {
    flex: 2,
    margin: 10,
    flexDirection: 'row',
    color: 'white',
  },
});