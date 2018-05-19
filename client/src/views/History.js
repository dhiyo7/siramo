import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { inject, observer } from 'mobx-react'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Graph from '../components/farm/Graph'
import FarmStore from '../store/FarmStore'
import TabBarLogo from '../components/logo/TabBarLogo'
import Loader from '../components/customs/Loader'
import LandscapeView from 'react-native-landscape-view'
import { Ionicons } from '@expo/vector-icons'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => <Graph sensorData={FarmStore.farmData.historyHumidity} humidityDetail={'humid'}/>
const SecondRoute = () => <Graph sensorData={FarmStore.farmData.historyTemperature} temperatureDetail={'panas'} color="blue"/>
const ThirdRoute = () => <Graph sensorData={FarmStore.farmData.historyWaterLevel} waterLevelDetail={'level'} color="red"/>
const FourthRoute = () => <Graph  sensorData={FarmStore.farmData.historyWaterRatio} waterRatioDetail={'water ratio'} color="green"/>

@inject('FarmStore')
@observer class History extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      index: 0,
      routes: [
        { key: 'first', icon: 'md-cloudy'  },
        { key: 'second', icon: 'md-thermometer' },
        { key: 'third', icon: 'md-trending-up' },
        { key: 'fourth', icon: 'md-water' },
      ],
    };
  }

  static navigationOptions = {
    drawerLabel: 'History',
    drawerIcon: () => (
      <Ionicons name="md-analytics" size={24} color="green" />
    )
  }

  componentDidMount() {
    FarmStore.getHistory()
  }

  _handleIndexChange = index => this.setState({ index });

_renderHeader = props => <TabBar  {...props} renderIcon={this._renderIcon} tabStyle={{backgroundColor: '#AED581'}}/>;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
  })

  _renderIcon = ({ route }: any) => {
    return <Ionicons name={route.icon} size={24}  />;
  };

  render() {
    const loading = FarmStore.farmData.historyLoading
    if (!loading) {
      return (
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      );
    } else {
      return <Loader loading={loading}/>
    }
    
  }
}

export default History