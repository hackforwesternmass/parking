'use strict';

var React = require('react-native');
var api = require('../Utils/api');
var Separator = require('./Helpers/Separator');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TabBarIOS,
  MapView,
  ScrollView
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0079c2'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  map: {
    marginTop: 65,
    height: 600
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 50
  },
  tabText: {
    marginTop: 65,
    padding: 30,
    fontSize: 15,
    fontWeight: 'bold',
  }
});

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'mapTab',
      mapRegionInput: null,
      annotations: [
        { latitude: 42.103007, longitude: -72.587997, title: "41 Harrison Avenue", subtitle: "$95" },
        { latitude: 42.106671, longitude: -72.589411, title: "451 Worthington Street", subtitle: "$60" },
        { latitude: 42.102997, longitude: -72.594833, title: "I-91 North", subtitle: "$85" },

        { latitude: 42.104793, longitude: -72.591821, title: "I-91 South", subtitle: "$85" },
        { latitude: 42.104607, longitude: -72.592836, title: "Taylor", subtitle: "$60" },
        { latitude: 42.106007, longitude: -72.593217, title: "Morgan", subtitle: "$60" },

        { latitude: 42.102793, longitude: -72.587871, title: "Apremont", subtitle: "$85" },
        { latitude: 42.105715, longitude: -72.593233, title: "Columbus", subtitle: "$60" },
        { latitude: 42.105715, longitude: -72.590553, title: "Dwight", subtitle: "$60" }
      ],
      mapRegion: {
        latitude: 42.10627358240762, longitude: -72.591905666854421, latitudeDelta: .01, longitudeDelta: .01
      },
      showsUserLocation: true,
      isFirstLoad: true,
    }
  }
  handleChange(e){
    this.setState({
      username: e.nativeEvent.text
    })
  }
  handleResponse(res){
    if(res.err){
      this.setState({
        error: 'User not found',
        isLoading: false
      })
    } else {
      this.props.navigator.push({
        title: 'Map View',
        component: Map,
        passProps: {markers: res}
      });
      this.setState({
        isLoading: false,
        error: false,
        username: ''
      });
    }
  }

  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    var streetNames = ['Gridiron', 'Lynman', 'Taylor', 
                       'Dwight', 'Hampden', 'Barnes',
                       'Worthington', 'Bridge', 'Chestnut',
                       'Kaynor', 'Liberty', 'Pearl', 'Hillman',
                       'Dwight', 'Maple', 'State', 'Bliss',
                       'Cross', 'Stockbridge', 'Harrison',
                       'Court', 'West Columbus'];
    var numberOfSpots = [15, 63, 28, 37, 14, 4, 46, 59, 6, 8, 38, 15, 20, 37, 6, 13, 13, 11, 6, 15, 42, 8]

    var list = streetNames.map((name, index) => {
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{streetNames[index]}</Text>
            <Text style={styles.rowContent}> {numberOfSpots[index]} available</Text>
          </View>
          <Separator />
        </View>
      )
    });
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="On Street Parking"
          systemIcon="featured"
          selected={this.state.selectedTab === 'street'}
          onPress={() => {
            this.setState({
              selectedTab: 'street',
            });
          }}>
          <ScrollView style={styles.scrollViewContainer}>
            {list}
          </ScrollView>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Map"
          systemIcon="search"
          selected={this.state.selectedTab === 'mapTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'mapTab',
            });
          }}>
            <View>
              <MapView
                style={styles.map}
                onRegionChange={this._onRegionChange}
                onRegionChangeComplete={this._onRegionChangeComplete}
                region={this.state.mapRegion}
                annotations={this.state.annotations}
              />
            </View> 
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="App Information"
          systemIcon="more"
          selected={this.state.selectedTab === 'infoTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'infoTab'
            });
          }}>
          <Text style={styles.tabText}>
             The Springfield Parking Authority is responsible for the management of a comprehensive off-street parking system.
             We also manage the city’s on-street parking and towing operations. This mobile application is an up-to-date collection
             of parking locations in downtown Springfield. The information retrieved by this application is updated daily so you know
             if there's a change in availability.
           </Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
};

module.exports = Main;
