'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  MapView
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
  map: {
    marginTop: 65,
    height: 600
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  },
});

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
    }
  }
  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
        />
      </View>
    )
  }
};

module.exports = Map;
