'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerContainer: {
    paddingTop: 20,
    height: 64,
    backgroundColor: '#0087fa',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  header: {
    color: 'white',
    fontSize: 20,
  },

  text: {
        color: 'black',
        fontSize: 30,
  },
  button: {
    borderColor: '#696969',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  }
});