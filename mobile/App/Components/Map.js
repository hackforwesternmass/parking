'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0079c2'
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  },
});

class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MapView</Text>
      </View>
    )
  }
};

module.exports = Map;
